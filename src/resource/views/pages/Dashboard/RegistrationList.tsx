import React, { FunctionComponent } from "react";
import { Card, CardHeader, CardBody, CardTitle, Table } from "reactstrap";
import { languageTranslation } from "../../../../helpers";
import Loader from "../../containers/Loader/Loader";
import { RouteComponentProps, useHistory } from "react-router-dom";
import {
  defaultDateTimeFormatForDashboard,
  AppRoutes
} from "../../../../config";
import moment from "moment";
import users from "../../../assets/img/users.svg";
const RegistrationList: FunctionComponent<RouteComponentProps> = (
  props: any
) => {
  let history = useHistory();
  const { registrationListLoading, registrationList } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {" "}
          <span className="align-middle mr-2">
            <img src={users} alt="" width="20px" />
          </span>
          <span className="align-middle">
            {languageTranslation("NEW_REGISTRATION")}
          </span>
        </CardTitle>
      </CardHeader>
      {/* {registrationListLoading ? (
        <div>
          <Loader />
        </div>
      ) : null} */}
      <CardBody className="custom-scrollbar">
        <div>
          <Table hover className="mb-0">
            <thead className="thead-bg">
              <tr>
                <th className="thead-sticky date-column">
                  {languageTranslation("DATE")}
                </th>
                <th className="thead-sticky name-column">
                  {languageTranslation("NAME")}
                </th>
                <th className="thead-sticky username-column">
                  {languageTranslation("USERNAME")}
                </th>
                <th className="thead-sticky type-column">
                  {languageTranslation("TYPE")}
                </th>
              </tr>
            </thead>
            <tbody>
              {registrationListLoading ? (
                <tr>
                  <td className={"table-loader"} colSpan={7}>
                    <Loader />
                  </td>
                </tr>
              ) : registrationList &&
                registrationList.getDashboardRegistrations.length ? (
                registrationList.getDashboardRegistrations.map(
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
                          <div
                            className="text-capitalize view-more-link word-wrap one-line-text"
                            onClick={() =>
                              history.push(
                                item.userRole === "caregiver"
                                  ? AppRoutes.CARE_GIVER_VIEW.replace(
                                      /:id/gi,
                                      item.id
                                    )
                                  : AppRoutes.CARE_INSTITUION_VIEW.replace(
                                      /:id/gi,
                                      item.id
                                    )
                              )
                            }
                          >
                            {item.firstName} {item.lastName}
                          </div>
                        </td>
                        <td className="username-column word-wrap one-line-text">
                          {item.userName}
                        </td>
                        <td className="type-column">{item.userRole}</td>
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
                        Currently there are no user added.
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
export default RegistrationList;
