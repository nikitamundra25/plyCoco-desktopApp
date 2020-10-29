import { useLazyQuery } from "@apollo/react-hooks";
import classnames from "classnames";
import _, { filter } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import BaseTable, { Column } from "react-base-table";
import "react-base-table/styles.css";
import { Link } from "react-router-dom";
import { createSelectable, SelectableGroup } from "react-selectable-fast";
import {
  APPOINTMENT_PAGE_LIMIT,
  AppRoutes,
  dbAcceptableFormat,
} from "../../../../config";
import { AppointmentsQueries } from "../../../../graphql/queries";
import { getDaysArrayByMonth } from "../../../../helpers";
import { Button } from "reactstrap";
import Spinner, { MoreSpinner } from "../../components/Spinner";
import { CaregiverRightClickOptions } from "./CaregiverRightClickOptions";

const [GET_USERS_BY_QUALIFICATION_ID] = AppointmentsQueries;
const staticHeader = ["caregiver", "H", "S", "U", "V"];
let allCaregivers: any[] = [];
/**
 *
 */
const SelectableCell = React.memo(
  createSelectable(
    ({ selectableRef, isSelecting, isSelected, isWeekend, item }: any) => {
      let isMatching: boolean = false,
        isConfirm: boolean = false,
        isContractCancel: boolean = false,
        isContractInitiated: boolean = false,
        isSingleButtonAccepted: boolean = false,
        isTimeSheetPending: boolean = false,
        isInvoiceInitiated: boolean = false;
      if (item.status === "linked") {
        isMatching = true;
      } else if (item.status === "confirmed") {
        isConfirm = true;
      } else if (item.status === "contractCancelled") {
        isContractCancel = true;
      } else if (item.status === "contractInitiated") {
        isContractInitiated = true;
      } else if (item.status === "invoiceInitiated") {
        isInvoiceInitiated = true;
      } else if (item.status === "accepted") {
        isSingleButtonAccepted = true;
      } else if (
        item.status === "timeSheetPending" ||
        item.status === "timeSheetUpdated"
      ) {
        isTimeSheetPending = true;
      }

      let isBlocked: boolean = false;
      if (item) {
        isBlocked =
          item.f === "block" || item.s === "block" || item.n === "block";
      }

      // Date condition to not display fsn if date is before today
      let isBeforedate = false;
      if (item && item.date) {
        isBeforedate = moment(item.date).isBefore(moment(), "day");
      }
      return (
        <>
          <span
            className={classnames({
              "calender-col": true,
              "text-center": true,
              "custom-appointment-col": true,
              "cursor-pointer": true,
              "selecting-cell-bg": isSelecting || isSelected,
              weekend: isWeekend,
              "contact-initiate-bg":
                isContractInitiated && !isSelected
                  ? isContractInitiated
                  : false,

              "invoice-bg":
                isInvoiceInitiated && !isSelected ? isInvoiceInitiated : false,
              "cancel-contract-bg":
                isContractCancel && !isSelected ? isContractCancel : false,
              "block-bg": item ? (isBlocked ? true : false) : false,
              "matching-bg": isMatching && !isSelected ? isMatching : false,
              "confirmation-bg":
                isTimeSheetPending && !isSelected ? isTimeSheetPending : false,
              "contract-bg": isConfirm && !isSelected ? isConfirm : false,
              "accepted-bg":
                isSingleButtonAccepted && !isSelected
                  ? isSingleButtonAccepted
                  : false,
              "availability-dark-bg": !isSelected
                ? item
                  ? item.f === "available" ||
                    item.s === "available" ||
                    item.n === "available"
                    ? item && item.status === "default" && isBeforedate
                      ? false
                      : true
                    : false
                  : false
                : false,
              "availability-bg":
                !isSelected && item && item.status === "default" && isBeforedate
                  ? true
                  : false,
            })}
            ref={selectableRef}>
            {item.status === "timeSheetPending" ? (
              <i className='fa fa-circle-o'></i>
            ) : item.status === "timeSheetUpdated" ? (
              <i className='fa fa-check'></i>
            ) : item.status === "invoiceInitiated" ? (
              <i className='fa fa-euro'></i>
            ) : item.f === "block" ||
              item.s === "block" ||
              item.n === "block" ? (
              <i className='fa fa-ban'></i>
            ) : item.status === "default" &&
              new Date(item.date).toTimeString() <
                new Date().toTimeString() ? null : (
              <>
                {item.f === "available" ? "f" : null}
                {item.s === "available" ? "s" : null}
                {item.n === "available" ? "n" : null}
              </>
            )}
          </span>
        </>
      );
    }
  )
);
/**
 *
 */
export const CaregiverList = ({ caregiverSelected, filters,updatedCaregiverItem }: any) => {
  const [daysData, setDaysData] = useState(
    getDaysArrayByMonth(moment().month(), moment().year())
  );
  const [caregivers, setCaregiverData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [starredCaregiver, setStarredCaregiver] = useState(0);
  const [showRightClickOptions, setShowRightClickOptions] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]);
  // To fetch caregivers by id filter
  const [
    fetchCaregiverList,
    {
      data: careGiversList,
      refetch: fetchingCareGiverData,
      fetchMore: fetchMoreCareGiverList,
      loading: loadingCaregiver,
    },
  ] = useLazyQuery<any, any>(GET_USERS_BY_QUALIFICATION_ID, {
    fetchPolicy: "no-cache",
  });

  // Default value is start & end of month
  let gte: string = moment().startOf("month").format(dbAcceptableFormat);
  let lte: string = moment().endOf("month").format(dbAcceptableFormat);
  const getCaregiverData = () => {
    allCaregivers = [];
    setCaregiverData(allCaregivers);
    setCurrentPage(1);
    const filterData = {
      qualificationId: [],
      userRole: "caregiver",
      negativeAttributeId: [],
      limit: APPOINTMENT_PAGE_LIMIT,
      page: 1,
      showAppointments: null,
      positiveAttributeId: [],
      caregiverId: null,
      gte,
      lte,
      ...filters,
    };
    delete filterData.careInstitutionId;
    setDaysData(
      getDaysArrayByMonth(
        moment(filters.gte || gte).month(),
        moment(filters.gte || gte).year()
      )
    );
    fetchCaregiverList({
      variables: filterData,
    });
  };
  useEffect(() => {
    if (
      !filters.effects ||
      ["both", "caregiver"].indexOf(filters.effects) > -1
    ) {
      getCaregiverData();
    }
  }, [filters]);
  /**
   *
   * @param data
   */
  const formatCaregivers = (data: any[]) => {
    console.time("test");
    const newData: any[] = [];
    _.forEach(data, (value) => {
      const availibility = _.mapValues(
        _.groupBy(value.caregiver_avabilities, "date")
      );
      let max = 1;
      _.forEach(daysData.daysArr, (date) => {
        const arr = availibility[date.dateString || ""] || [];
        if (arr.length > max) {
          max = arr.length;
        }
      });
      for (let i = 0; i < max; i++) {
        newData.push({
          ...value,
          row: i,
          key: `${value.id}-${i}`,
        });
      }
    });
    console.timeEnd("test");
    return newData;
  };
  /**
   *
   */
  const setCaregivers = () => {
    const data =
      ((careGiversList || {}).getUserByQualifications || {}).result || [];
    const count =
      ((careGiversList || {}).getUserByQualifications || {}).totalCount || 0;
    const newData = formatCaregivers(data);
    allCaregivers = Object.assign([], newData);
    setHasMore(data.length <= count);
    setCaregiverData(newData);
    setIsLoading(false);
  };
  useEffect(() => {
    if (!loadingCaregiver) {
      setCaregivers();
    }
  }, [loadingCaregiver]);

  const columns = [...staticHeader, ...daysData.daysArr];
  /**
   *
   * @param index
   */
  const onAddNewRow = (index: number) => {
    const newCaregivers = Object.assign([], allCaregivers);
    newCaregivers.splice(index + 1, 0, {
      ...allCaregivers[index],
      key: allCaregivers[index].key + allCaregivers.length,
      caregiver_avabilities: [],
      row: allCaregivers[index].row + 1,
    });

    allCaregivers = newCaregivers;
    setCaregiverData(newCaregivers);
  };

   // Update data in list after add/update/delete operation
   useEffect(() => {
    let temp: any = [...caregivers];
    updatedCaregiverItem.forEach((availability: any) => {
      let index: number = temp.findIndex(
        (caregiver: any) => caregiver.id === availability.userId
      );

      if (temp[index]) {
        const checkId = (obj: any) => obj.id === availability.id;
        let existId = temp[index].caregiver_avabilities.findIndex(
          checkId
        );
        if (existId > -1) {
          if(availability.date){
            // id exist so update data at particular index
            temp[index].caregiver_avabilities[existId] = availability;
          }else{
            // delete if response doen't return date
            temp[index].caregiver_avabilities[existId] = []
          }
         
        } else {
          temp[index].caregiver_avabilities.push(availability);
        }
      }
    });

    setCaregiverData(temp);
  }, [updatedCaregiverItem]);
  /**
   *
   * @param page
   */
  const getMoreCaregivers = (page: number = 1) => {
    setIsLoading(true);
    fetchMoreCareGiverList({
      variables: {
        qualificationId: [],
        userRole: "caregiver",
        negativeAttributeId: [],
        limit: 30,
        page,
        showAppointments: null,
        positiveAttributeId: [],
        gte,
        lte,
        ...filters,
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) {
          return prev;
        }
        if (prev && prev.getUserByQualifications) {
          const newData = formatCaregivers(
            fetchMoreResult.getUserByQualifications.result
          );
          allCaregivers = [...allCaregivers, ...newData];
          setCaregiverData(allCaregivers);
          setIsLoading(false);
          const result = [
            ...prev.getUserByQualifications.result,
            ...fetchMoreResult.getUserByQualifications.result,
          ];
          setHasMore(result.length <= prev.getUserByQualifications.totalCount);
          return {
            getUserByQualifications: {
              ...prev.getUserByQualifications,
              result,
            },
          };
        }
      },
    });
  };
  /**
   *
   * @param arg
   */
  const handleEndReached = (arg: any) => {
    if ((!loadingCaregiver && isLoading) || !hasMore || starredCaregiver) {
      return;
    }
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    getMoreCaregivers(nextPage);
  };
  /**
   *
   * @param selected
   */
  const onSelectFinish = (selected: any) => {
    if (selected && selected.length) {
      let data: any = [];
      selected.map((key: any) => {
        data.push(key.props);
      });
      caregiverSelected(data);
      setSelectedCells(data);
    } else {
      setSelectedCells([]);
    }
  };
  /**
   *
   * @param caregiverId
   */
  const filterCaregiverWithStar = (caregiverId: number) => {
    console.log(starredCaregiver);
    if (caregiverId === starredCaregiver) {
      setCaregiverData(allCaregivers);
      // setStarredCaregiver(0);
    } else {
      const caregiverItems = allCaregivers.filter(
        (caregiver: any) => caregiverId === caregiver.id
      );
      setStarredCaregiver(() => caregiverId);
      setCaregiverData(caregiverItems);
    }
  };
  const handleToggleMenuItem = () => {
    setShowRightClickOptions((prev) => !prev);
  };
  /**
   *
   */
  const element = document.getElementById("appointment_list_section");
  /**
   *
   */

  return (
    <>
      <div
        className={classnames({
          "right-manu-close": true,
          "d-none": !showRightClickOptions,
        })}
        onClick={handleToggleMenuItem}></div>
      <CaregiverRightClickOptions
        isOpen={showRightClickOptions}
        hide={() => setShowRightClickOptions(false)}
        selectedCells={selectedCells}
      />
      <div className='custom-appointment-calendar overflow-hidden mb-3'>
        <SelectableGroup
          allowClickWithoutSelected
          className='custom-row-selector new-base-table'
          clickClassName='tick'
          resetOnStart={true}
          allowCtrlClick={false}
          onSelectionFinish={onSelectFinish}
          ignoreList={[".name-col", ".h-col", ".s-col", ".u-col", ".v-col"]}>
          <BaseTable
            fixed
            data={caregivers}
            width={element ? element.clientWidth - 40 : 800}
            height={element ? window.innerHeight / 2 - 80 : 300}
            rowKey='key'
            overlayRenderer={() =>
              loadingCaregiver || isLoading ? (
                currentPage > 1 ? (
                  <>
                    <MoreSpinner />
                  </>
                ) : (
                  <Spinner />
                )
              ) : null
            }
            headerRenderer={() =>
              columns.map((d: any, index: number) =>
                staticHeader.indexOf(d) > -1 ? (
                  <React.Fragment key={`${d.id}-${index}`}>
                    <span
                      className={`custom-appointment-col  ${
                        d === "caregiver" ? "name-col" : ""
                      }`}>
                      <div className='position-relative  username-col align-self-center'>
                        {d}
                        {d === "caregiver" ? (
                          <Button
                            className='btn-more d-flex align-items-center justify-content-center'
                            onClick={() => setShowRightClickOptions(true)}>
                            <i className='icon-options-vertical' />
                          </Button>
                        ) : null}
                      </div>
                    </span>
                  </React.Fragment>
                ) : (
                  <span key={d.date} className='custom-appointment-col  '>
                    {d.day}
                    <br />
                    {d.date}
                  </span>
                )
              )
            }
            rowRenderer={({ cells, rowData }) => (
              <div
                className='d-flex frozen-row'
                title={[rowData.lastName, rowData.firstName].join(" ")}>
                {cells}
              </div>
            )}
            onEndReachedThreshold={300}
            onEndReached={handleEndReached}
            headerClassName='custom-appointment-row'
            rowClassName='custom-appointment-row'
            rowHeight={30}>
            {columns.map((d: any, index: number) => (
              <Column
                key={`col0-${index}-${
                  typeof d === "string" ? d : d.dateString
                }`}
                width={index === 0 ? 140 : 28}
                className={`custom-appointment-col   ${
                  d === "caregiver" ? "name-col" : ""
                }`}
                frozen={typeof d === "string"}
                cellRenderer={({ rowData, rowIndex }: any) => {
                  switch (d) {
                    case "caregiver":
                      return (
                        <div
                          key={rowIndex}
                          className='custom-appointment-col name-col appointment-color1 p-1 text-capitalize view-more-link one-line-text'
                          title={[rowData.lastName, rowData.firstName].join(
                            " "
                          )}
                          id={`caregiver-${rowData.id}-${index}-${rowData.row}`}>
                          <Link
                            to={AppRoutes.CARE_GIVER_VIEW.replace(
                              ":id",
                              rowData.id
                            )}
                            target='_blank'
                            className='text-body'>
                            {rowData.row === 0
                              ? [rowData.lastName, rowData.firstName]
                                  .filter(Boolean)
                                  .join(" ")
                                  .trim()
                              : null}
                          </Link>
                        </div>
                      );
                    case "H":
                      return <span key={rowIndex}>H</span>;
                    case "S":
                      console.log(starredCaregiver);
                      return (
                        <span
                          key={rowIndex}
                          className='custom-appointment-col s-col text-center cursor-pointer'
                          onClick={() => filterCaregiverWithStar(rowData.id)}>
                          {starredCaregiver === rowData.id ? (
                            <i className='fa fa-star theme-text' />
                          ) : (
                            <i className='fa fa-star-o' />
                          )}
                        </span>
                      );
                    case "U":
                      return (
                        <span
                          key={rowIndex}
                          className='custom-appointment-col u-col text-center cursor-pointer'>
                          <i className='fa fa-star-o' />
                        </span>
                      );
                    case "V":
                      return (
                        <span
                          key={rowIndex}
                          className='custom-appointment-col v-col text-center cursor-pointer'
                          onClick={() => onAddNewRow(rowIndex)}>
                          <i className='fa fa-arrow-down' />
                        </span>
                      );
                    default:
                      const currentAvail = _.filter(
                        rowData.caregiver_avabilities,
                        (avail: any) => d.dateString === avail.date
                      );
                      return (
                        <React.Fragment key={rowIndex}>
                          <SelectableCell
                            isWeekend={d.isWeekend}
                            item={
                              currentAvail[rowData.row] || {
                                date: d.dateString,
                              }
                            }
                            caregiver={rowData}
                          />
                        </React.Fragment>
                      );
                  }
                }}
              />
            ))}
          </BaseTable>
        </SelectableGroup>
      </div>
    </>
  );
};
