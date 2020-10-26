import { useLazyQuery } from "@apollo/react-hooks";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import BaseTable, { Column } from "react-base-table";
import "react-base-table/styles.css";
import { Link } from "react-router-dom";
import {
  APPOINTMENT_PAGE_LIMIT,
  AppRoutes,
  dbAcceptableFormat,
} from "../../../../config";
import { AppointmentsQueries } from "../../../../graphql/queries";
import { getDaysArrayByMonth } from "../../../../helpers";
const [GET_USERS_BY_QUALIFICATION_ID] = AppointmentsQueries;
const staticHeader = ["careinstitution", "H", "S", "U", "V"];
let allCaregivers: any[] = [];
export const CareInstitutionList = () => {
  const [daysData, setDaysData] = useState(
    getDaysArrayByMonth(moment().month(), moment().year())
  );
  const [caregivers, setCaregiverData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
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
  useEffect(() => {
    fetchCaregiverList({
      variables: {
        qualificationId: [],
        userRole: "canstitution",
        negativeAttributeId: [],
        limit: APPOINTMENT_PAGE_LIMIT,
        page: 1,
        showAppointments: "showWithAppointments",
        positiveAttributeId: [],
        caregiverId: null,
        gte,
        lte,
      },
    });
  }, []);
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
          ...(i === 0
            ? value
            : {
                id: value.id,
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
      firstName: "",
      lastName: "",
      key: allCaregivers[index].key + allCaregivers.length,
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
    fetchMoreCareGiverList({
      variables: {
        qualificationId: [],
        userRole: "caregiver",
        negativeAttributeId: [],
        limit: 30,
        page,
        showAppointments: "showWithAppointments",
        positiveAttributeId: [],
        gte,
        lte,
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) {
          return prev;
        }
        if (prev && prev.getUserByQualifications) {
          console.log(
            prev.getUserByQualifications.result,
            fetchMoreResult.getUserByQualifications.result
          );
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
    if ((!loadingCaregiver && isLoading) || !hasMore) {
      return;
    }
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    getMoreCaregivers(nextPage);
  };
  return (
    <>
      <BaseTable
        fixed
        data={caregivers}
        width={800}
        height={300}
        rowKey='key'
        overlayRenderer={() =>
          loadingCaregiver || isLoading ? (
            <>
              <div
                style={{
                  pointerEvents: "none",
                  background: "rgba(32, 60, 94, 0.3)",
                  position: "absolute",
                  bottom: "30px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "5px 15px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                }}>
                <span
                  style={{
                    color: "#fff",
                    marginRight: "5px",
                  }}>
                  Loading...
                </span>
              </div>
            </>
          ) : null
        }
        headerRenderer={() =>
          columns.map((d: any, index: number) =>
            staticHeader.indexOf(d) > -1 ? (
              <React.Fragment key={`${d.id}-${index}`}>
                <span
                  className={`custom-appointment-col  ${
                    d === "careinstitution" ? "name-col" : ""
                  }`}>
                  {d}
                  {d === "careinstitution" ? (
                    <>
                      <span>
                        <i className='icon-options-vertical' />
                      </span>
                    </>
                  ) : null}
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
        rowClassName='custom-appointment-row'>
        {columns.map((d: any, index: number) => (
          <Column
            key={`col0-${index}-${typeof d === "string" ? d : d.dateString}`}
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
                      className='custom-appointment-col name-col appointment-color1 text-capitalize view-more-link one-line-text'
                      title={[rowData.lastName, rowData.firstName].join(" ")}
                      id={`caregiver-${rowData.id}-${index}-${rowData.row}`}>
                      <Link
                        to={AppRoutes.CARE_GIVER_VIEW.replace(
                          ":id",
                          rowData.id
                        )}
                        target='_blank'
                        className='text-body'>
                        {[rowData.lastName, rowData.firstName].join(" ")}
                      </Link>
                    </div>
                  );
                case "H":
                  return <span key={rowIndex}>H</span>;
                case "S":
                  return (
                    <span
                      key={rowIndex}
                      className='custom-appointment-col s-col text-center cursor-pointer'>
                      <i className='fa fa-star-o' />
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
                  return (
                    <React.Fragment key={rowIndex}>
                      {rowData.firstName}
                    </React.Fragment>
                  );
              }
            }}
          />
        ))}
      </BaseTable>
    </>
  );
};