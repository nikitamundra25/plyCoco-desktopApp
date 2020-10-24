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
const staticHeader = ["caregiver", "H", "S", "U", "V"];

export const TempPage = () => {
  const [daysData, setDaysData] = useState(
    getDaysArrayByMonth(moment().month(), moment().year())
  );
  const [caregivers, setCaregiverData] = useState<any[]>([]);
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

  useEffect(() => {
    // Default value is start & end of month
    let gte: string = moment().startOf("month").format(dbAcceptableFormat);
    let lte: string = moment().endOf("month").format(dbAcceptableFormat);
    fetchCaregiverList({
      variables: {
        qualificationId: [],
        userRole: "caregiver",
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
  const setCaregivers = () => {
    const data =
      ((careGiversList || {}).getUserByQualifications || {}).result || [];
    const newData: any[] = [];
    console.time("test");
    _.forEach(data, (value) => {
      const availibility = _.mapValues(
        _.groupBy(value.caregiver_avabilities, "date")
      );
      delete value.caregiver_avabilities;
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
    setCaregiverData(newData);
  };
  useEffect(() => {
    if (!loadingCaregiver) {
      setCaregivers();
    }
  }, [loadingCaregiver]);

  const columns = [...staticHeader, ...daysData.daysArr];
  const onAddNewRow = (index: number) => {
    console.log(caregivers);
    const newCaregivers = Object.assign([], caregivers);
    newCaregivers.splice(index, 0, newCaregivers[index]);
    console.log(newCaregivers);
    // setCaregiverData(newCaregivers);
  };
  console.log(caregivers);
  return (
    <>
      <BaseTable
        fixed
        data={caregivers}
        width={800}
        height={300}
        rowKey='key'
        headerRenderer={() =>
          columns.map((d: any, index: number) =>
            staticHeader.indexOf(d) > -1 ? (
              <React.Fragment key={`${d.id}-${index}`}>
                <span
                  className={`custom-appointment-col  ${
                    d === "caregiver" ? "name-col" : ""
                  }`}>
                  {d}
                  {d === "caregiver" ? (
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
                      className='custom-appointment-col s-col text-center'>
                      <i className='fa fa-star-o' />
                    </span>
                  );
                case "U":
                  return (
                    <span
                      key={rowIndex}
                      className='custom-appointment-col u-col text-center'>
                      <i className='fa fa-star-o' />
                    </span>
                  );
                case "V":
                  return (
                    <span
                      key={rowIndex}
                      className='custom-appointment-col v-col text-center'
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
