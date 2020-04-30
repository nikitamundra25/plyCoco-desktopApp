import React, { FunctionComponent } from "react";
import { Card, CardHeader, CardBody, CardTitle, Table } from "reactstrap";
import { languageTranslation } from "../../../../helpers";
import Loader from "../../containers/Loader/Loader";
import { RouteComponentProps, useHistory } from "react-router-dom";
import {
  defaultDateTimeFormatForDashboard,
  AppRoutes,
} from "../../../../config";
import moment from "moment";
import new_appointment from "../../../assets/img/new_booking.svg";

const AppointmentList: FunctionComponent<RouteComponentProps> = ( props: any) => {
  let history = useHistory();
  const { appointmentListLoading, appointmentList } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="align-middle mr-2">
            <img src={new_appointment} alt="" width="20px" />
          </span>
          <span className="align-middle">
            {languageTranslation("NEW_APPOINTMENTS")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardBody className="custom-scrollbar">
        <div>
          <Table hover className="mb-0">
            <thead className="thead-bg">
              <tr>
                <th className="thead-sticky date-column">
                  {" "}
                  {languageTranslation("DATE")}
                </th>
                <th className="thead-sticky name-column">
                  {languageTranslation("MENU_CAREGIVER")}
                </th>
                <th className="thead-sticky name-column">
                  {languageTranslation("MENU_INSTITUTION")}
                </th>
                <th className="thead-sticky date-column">
                  {" "}
                  {languageTranslation("BOOKING_DATE")}
                </th>
              </tr>
            </thead>
            <tbody>
              {appointmentListLoading ? (
                <tr>
                  <td className={"table-loader"} colSpan={7}>
                    <Loader />
                  </td>
                </tr>
              ) : appointmentList && appointmentList.getDashboardAppointments.length > 0 ? (
                appointmentList.getDashboardAppointments.map(
                  (item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="date-column">
                          {" "}
                          {moment(item.createdAt).format(
                            defaultDateTimeFormatForDashboard
                          )}
                        </td>
                        <td className="name-column">
                         { item.ca &&   item.ca.user ? 
                          <div
                            className="text-capitalize view-more-link  one-line-text"
                            onClick={() =>
                              history.push(
                                 AppRoutes.CARE_GIVER_VIEW.replace(
                                      /:id/gi,
                                      item.ca.user.id
                                    )   
                              )
                            }
                          >
                            {item.ca.user.userName}
                          </div> : null}
                        </td>
                        
                        <td className="name-column">
                        { item.cr && item.cr.user ? 
                          <div
                            className="text-capitalize view-more-link  one-line-text"
                            onClick={() =>
                              history.push(
                                  AppRoutes.CARE_INSTITUION_VIEW.replace(
                                      /:id/gi,
                                      item.cr.user.id
                                    )
                              )
                            }
                          >
                            {item.cr.user.userName}
                          </div> : null }
                        </td>

                        <td className="doctype-column">
                        {moment(item.date).format(
                            defaultDateTimeFormatForDashboard
                          )}
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr className={"text-center no-hover-row"}>
                  <td colSpan={5} className={"pt-5 pb-5"}>
                    <div className="no-data-section">
                      <div className="no-data-icon">
                        <i className="icon-ban" />
                      </div>
                      <h4 className="mb-1">
                        {languageTranslation("NO_DATA_IN_APPOINTMENTS")}
                      </h4>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};
export default AppointmentList;
