import { useLazyQuery } from "@apollo/react-hooks";
import classnames from "classnames";
import _, { filter } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import BaseTable, { Column } from "react-base-table";
import "react-base-table/styles.css";
import { Link } from "react-router-dom";
import { createSelectable, SelectableGroup } from "react-selectable-fast";
import { Button } from "reactstrap";
import {
  APPOINTMENT_PAGE_LIMIT,
  AppRoutes,
  dbAcceptableFormat,
} from "../../../../config";
import {
  AppointmentsQueries,
  CareInstitutionQueries,
} from "../../../../graphql/queries";
import { getDaysArrayByMonth } from "../../../../helpers";
import CareinstitutionRightClickOptions from "./CareinstitutionRightClickOptions";
import Spinner, { MoreSpinner } from "../../components/Spinner";
const [GET_USERS_BY_QUALIFICATION_ID] = AppointmentsQueries;
const [, , GET_DEPARTMENT_LIST, , , ,] = CareInstitutionQueries;

const staticHeader = ["careinstitution", "H", "S", "U", "V"];
let allCaregivers: any[] = [];

const SelectableCell = React.memo(
  createSelectable(
    ({ selectableRef, isSelected, isSelecting, item, key, isWeekend,showSelectedCaregiver,canstitution }: any) => {
      let isRequirment: boolean = false,
        isMatching: boolean = false,
        isContract: boolean = false,
        isConfirm: boolean = false,
        isOffered: boolean = false,
        isOfferedFutureDate: boolean = false,
        showAppointedCareGiver: boolean = false;
      let caregiverId: string = "";
      if (item && item.appointments) {
        const { appointments = [] } = item;
        const { ca = {} } =
          appointments && appointments.length ? appointments[0] : {};
        caregiverId = ca ? ca.userId : "";
      }
      
      if (caregiverId) {
        if (caregiverId === showSelectedCaregiver.id) {
          showAppointedCareGiver = true;
        }
      }

      let careinstitutionCell: any =
        item && item.appointments && item.appointments[0]
          ? item.appointments[0].id
          : "";

      let isFutureDate: boolean = false;
      if (item && item.date) {
        let dateStr = moment(item.date).add(1, "days").format("YYYY/MM/DD");
        isFutureDate = moment(dateStr, "YYYY/MM/DD").isAfter();
      }

      // Date condition to not display fsn if date is before today
      let isBeforedate = false;
      if (item && item.date) {
        isBeforedate = moment(item.date).isBefore(moment(), "day");
      }

      if (item) {
        if (item.status === "default") {
          isRequirment = true;
        } else if (item.status === "linked") {
          isMatching = true;
        } else if (item.status === "contract") {
          isContract = true;
        } else if (item.status === "confirmed") {
          isConfirm = true;
        } else if (item.status === "offered" && isFutureDate === false) {
          isOffered = true;
          // isOfferedFutureDate = false;
        } else if (item.status === "offered" && isFutureDate === true) {
          isOfferedFutureDate = true;
        }
      }

      return (
        <div
          key={key}
          className={classnames({
            "calender-col": true,
            "text-center": true,
            // weekend: daysArr,
            "selecting-cell-bg": isSelecting || isSelected,
            weekend: isWeekend,
            "availability-bg":
              isOffered && !isSelected && !isOfferedFutureDate
                ? isOffered
                : false,
            "availability-dark-bg":
              isOfferedFutureDate && !isSelected ? isOfferedFutureDate : false,
            "custom-appointment-col": true,
            "cursor-pointer": true,
            "requirement-bg":
              isRequirment && !isSelected ? isRequirment : false,
              'matching-bg':
              isMatching &&
              !isSelected &&
              !showAppointedCareGiver &&
              caregiverId !== showSelectedCaregiver.id
                ? isMatching
                : false,
            "contract-bg":
              isConfirm &&
              !isSelected &&
              !showAppointedCareGiver &&
              caregiverId !== showSelectedCaregiver.id
                ? isConfirm
                : false,
          })}
          ref={selectableRef}
          // onClick={() => handleSelectedUser(list, day, 'caregiver')}
        >
          {item ? (
            isBeforedate ? null : (
              <>
                {item.f ? item.f : null}
                {item.s ? item.s : null}
                {item.n ? item.n : null}
              </>
            )
          ) : null}
        </div>
      );
    }
  )
);

export const CareInstitutionList = React.memo(
  ({
    careinstitutionSelected,
    filters = {},
    setCareInstDeptList,
    updatedCareinstItem = [],
    qualificationList,
    selected,
    setMultipleRequirement,
    handleupdateData,
    selectedCaregiverData,
    caregiverSelected,
    updateCaregiverDataLeasing
  }: any) => {
    const [daysData, setDaysData] = useState(
      getDaysArrayByMonth(moment().month(), moment().year())
    );
    const [caregivers, setCaregiverData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
  const [showRightClickOptions, setShowRightClickOptions] = useState(false);
  const [showSelectedCaregiver, setShowSelectedCaregiver] = useState<any>({
    id: '',
    isShow: false,
  });
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

    // To get department list
    const [
      getDepartmentList,
      { data: departmentList, loading: deptLoading },
    ] = useLazyQuery<any>(GET_DEPARTMENT_LIST);

    // Default value is start & end of month
    let gte: string = moment().startOf("month").format(dbAcceptableFormat);
    let lte: string = moment().endOf("month").format(dbAcceptableFormat);
    const getCareinstitutionList = () => {
      delete filters.caregiverId;
      allCaregivers = [];
      setCaregiverData(allCaregivers);
      setCurrentPage(1);
      setIsLoading(true);
      const filterObject = {
        qualificationId: [],
        userRole: "canstitution",
        negativeAttributeId: [],
        limit: APPOINTMENT_PAGE_LIMIT,
        page: 1,
        showAppointments: null,
        positiveAttributeId: [],
        gte,
        lte,
        ...filters,
      };
      delete filterObject.caregiverId;
      fetchCaregiverList({
        variables: filterObject,
      });
      setDaysData(
        getDaysArrayByMonth(
          moment(filters.gte || gte).month(),
          moment(filters.gte || gte).year()
        )
      );
    };
    useEffect(() => {
      if (
        !filters.effects ||
        ["both", "careinstitution"].indexOf(filters.effects) > -1
      ) {
        getCareinstitutionList();
      }
    }, [filters]);

    // Set department list according to careInstitution selected
    useEffect(() => {
      setCareInstDeptList(departmentList);
    }, [departmentList]);

    const handleUnlinkedList = (requirement: any, temp: any) => {
      const { unlinkedBy = "", deleteAll = "", id = "", cr = {} } = requirement
        ? requirement
        : {};
      let index: number = temp.findIndex(
        (caregiver: any) => caregiver.id === cr.userId
      );
      const checkId: any = (obj: any) => obj.id === cr.id;
      let existId = temp[index].careinstitution_requirements.findIndex(checkId);
      if (deleteAll) {
        if (unlinkedBy !== "caregiver") {
          temp[index].careinstitution_requirements[existId] = [];
        } else {
          temp[index].careinstitution_requirements[existId].appointments = [];
          temp[index].careinstitution_requirements[existId].status = "default";
        }
      } else {
        temp[index].careinstitution_requirements[existId].appointments = [];
        temp[index].careinstitution_requirements[existId].status = "default";
      }
      return temp;
    };

    // Update status and appointment data onComplete
    const handleLinkDataUpdate = (availability: any, temp: any) => {
      const {
        avabilityId = "",
        ca = {},
        cr = {},
        createdBy = "",
        date = "",
        id = "",
        requirementId = "",
      } = availability ? availability : {};
      let index: number = temp.findIndex(
        (caregiver: any) => caregiver.id === cr.userId
      );
      const checkId = (obj: any) => obj.id === requirementId;
      let existId = temp[index].careinstitution_requirements.findIndex(checkId);
      const careinsti: any = [
        {
          avabilityId,
          ca,
          createdBy,
          date,
          id,
          requirementId,
        },
      ];

      temp[index].careinstitution_requirements[
        existId
      ].appointments = careinsti;
      temp[index].careinstitution_requirements[existId].status = "linked";
      return temp;
    };

    // Update data in list after add/update/delete operation
    useEffect(() => {
      let temp: any = [...caregivers];
      updatedCareinstItem.forEach((requirement: any) => {
        if (requirement.unlinkedBy) {
          temp = handleUnlinkedList(requirement, temp);
        } else if (requirement.status === "appointment") {
          temp = handleLinkDataUpdate(requirement, temp);
        } else {
          let index: number = temp.findIndex(
            (careInst: any) =>
              parseInt(careInst.id) === parseInt(requirement.userId)
          );

          if (temp[index]) {
            const checkId = (obj: any) => obj.id === requirement.id;
            let existId = temp[index].careinstitution_requirements.findIndex(
              checkId
            );

            if (existId > -1) {
              if (requirement.date) {
                // id exist so update data at particular index
                temp[index].careinstitution_requirements[existId] = requirement;
              } else {
                // delete if response doen't return date
                temp[index].careinstitution_requirements[existId] = [];
              }
            } else {
              // id doen't exist so add data in array
              temp[index].careinstitution_requirements.push(requirement);
            }
          }
        }
      });

      setCaregiverData(temp);
    }, [updatedCareinstItem]);

    /**
     *
     * @param data
     */
    const formatCaregivers = (data: any[]) => {
      console.time("test");
      const newData: any[] = [];
      _.forEach(data, (value) => {
        const availibility = _.mapValues(
          _.groupBy(value.careinstitution_requirements, "date")
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
            ...(i === 0
              ? value
              : {
                  ...value,
                  firstName: "",
                  lastName: "",
                }),
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
        careinstitution_requirements: [],
        row: allCaregivers[index].row + 1,
      });
      allCaregivers = newCaregivers;
      setCaregiverData(newCaregivers);
    };
    /**
     *
     * @param page
     */
    const getMoreCaregivers = (page: number = 1) => {
      setIsLoading(true);
      const filterObject = {
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
      };
      delete filterObject.caregiverId;
      fetchMoreCareGiverList({
        variables: filterObject,
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
            setHasMore(
              result.length <= prev.getUserByQualifications.totalCount
            );
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
      if ((!loadingCaregiver && isLoading) || !hasMore) {
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
        careinstitutionSelected(data);

        let userId: string =
          selected &&
          selected.length &&
          selected[0].props.canstitution &&
          selected[0].props.canstitution.id
            ? selected[0].props.canstitution.id
            : "";

        if (userId) {
          getDepartmentList({
            variables: {
              userId: parseInt(userId),
              locked: false,
            },
          });
        }
      }
    };

    const handleToggleMenuItem = () => {
      setShowRightClickOptions((prev) => !prev);
    };
    /**
     *
     */
    const element = document.getElementById("appointment_list_section");
    
    return (
      <>
       <div
        className={classnames({
          "right-manu-close": true,
          "d-none": !showRightClickOptions,
        })}
        onClick={handleToggleMenuItem}
      ></div>
      <CareinstitutionRightClickOptions
       isOpen={showRightClickOptions}
       hide={() => setShowRightClickOptions(false)}
       onNewRequirement={() => setMultipleRequirement(true)}
       selectedCellsCareinstitution={selected}
       careinstitutionList={caregivers}
       careinstitutionSelected={careinstitutionSelected}
       handleupdateData={handleupdateData}
       qualificationList={qualificationList}
       filters={filters}
       selectedCells={selectedCaregiverData}
       caregiverSelected={caregiverSelected}
       setShowSelectedCaregiver={(data:any)=> {
         setShowSelectedCaregiver(data)
      }}
      updateCaregiverDataLeasing={updateCaregiverDataLeasing}
      />
        <div className="custom-appointment-calendar overflow-hidden">
          <SelectableGroup
            allowClickWithoutSelected
            className="custom-row-selector new-base-table"
            clickClassName="tick"
            resetOnStart={true}
            allowCtrlClick={false}
            onSelectionFinish={onSelectFinish}
            ignoreList={[".name-col", ".h-col", ".s-col", ".u-col", ".v-col"]}
          >
            <BaseTable
              fixed
              data={caregivers}
              width={element ? element.clientWidth - 40 : 800}
              height={element ? window.innerHeight / 2 - 80 : 300}
              rowKey="key"
              rowHeight={30}
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
                          d === "careinstitution" ? "name-col" : ""
                        }`}
                      >
                        {/* {d}
                      {d === "careinstitution" ? (
                        <>
                          <span>
                            <i className="icon-options-vertical" />
                          </span>
                        </>
                      ) : null} */}
                        <div className="position-relative  username-col align-self-center">
                          {d}
                          {d === "careinstitution" ? (
                            <Button className="btn-more d-flex align-items-center justify-content-center"
                            onClick={() => setShowRightClickOptions(true)}
                            >
                              <i className="icon-options-vertical" />
                            </Button>
                          ) : null}
                        </div>
                      </span>
                    </React.Fragment>
                  ) : (
                    <span key={d.date} className="custom-appointment-col  ">
                      {d.day}
                      <br />
                      {d.date}
                    </span>
                  )
                )
              }
              rowRenderer={({ cells, rowData }) => (
                <div
                  className="d-flex frozen-row"
                  title={
                    rowData.canstitution && rowData.canstitution.shortName
                      ? rowData.canstitution.shortName
                      : [rowData.lastName, rowData.firstName].join(" ")
                  }
                >
                  {cells}
                </div>
              )}
              onEndReachedThreshold={300}
              onEndReached={handleEndReached}
              headerClassName="custom-appointment-row"
              rowClassName="custom-appointment-row"
            >
              {columns.map((d: any, index: number) => (
                <Column
                  key={`col0-${index}-${
                    typeof d === "string" ? d : d.dateString
                  }`}
                  width={index === 0 ? 140 : 28}
                  className={`custom-appointment-col   ${
                    d === "careinstitution" ? "name-col" : ""
                  }`}
                  frozen={typeof d === "string"}
                  cellRenderer={({ rowData, rowIndex }: any) => {
                    switch (d) {
                      case "careinstitution":
                        return (
                          <div
                            key={rowIndex}
                            className="custom-appointment-col name-col appointment-color1 text-capitalize p-1 view-more-link one-line-text"
                            title={
                              rowData.canstitution &&
                              rowData.canstitution.shortName
                                ? rowData.canstitution.shortName
                                : [rowData.lastName, rowData.firstName].join(
                                    " "
                                  )
                            }
                            id={`caregiver-${rowData.id}-${index}-${rowData.row}`}
                          >
                            <Link
                              to={AppRoutes.CARE_GIVER_VIEW.replace(
                                ":id",
                                rowData.id
                              )}
                              target="_blank"
                              className="text-body"
                            >
                              {rowData.row === 0
                                ? rowData.canstitution &&
                                  rowData.canstitution.shortName
                                  ? rowData.canstitution.shortName
                                  : [rowData.lastName, rowData.firstName].join(
                                      " "
                                    )
                                : null}
                            </Link>
                          </div>
                        );
                      case "H":
                        return <span key={rowIndex}>H</span>;
                      case "S":
                        return (
                          <span
                            key={rowIndex}
                            className="custom-appointment-col s-col text-center cursor-pointer"
                          >
                            <i className="fa fa-star-o" />
                          </span>
                        );
                      case "U":
                        return (
                          <span
                            key={rowIndex}
                            className="custom-appointment-col u-col text-center cursor-pointer"
                          >
                            <i className="fa fa-star-o" />
                          </span>
                        );
                      case "V":
                        return (
                          <span
                            key={rowIndex}
                            className="custom-appointment-col v-col text-center cursor-pointer"
                            onClick={() => onAddNewRow(rowIndex)}
                          >
                            <i className="fa fa-arrow-down" />
                          </span>
                        );
                      default:
                        const currentAvail = _.filter(
                          rowData.careinstitution_requirements,
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
                              canstitution={rowData}
                              showSelectedCaregiver={showSelectedCaregiver}
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
  }
);
