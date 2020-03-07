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
import incorrect from "../../../assets/img/incorrect.svg";
const IncorrectLoginList: FunctionComponent<RouteComponentProps> = (
  props: any
) => {
  let history = useHistory();
  const { incorrectLoginListLoading, incorrectLoginList } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {" "}
          <span className="align-middle mr-2">
            <img src={incorrect} alt="" width="20px" />
          </span>
          <span className="align-middle">
            {languageTranslation("INCORRECT_LOGIN")}
          </span>{" "}
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
                  {languageTranslation("NAME")}
                </th>
                <th className="thead-sticky uesrname-column">
                  {languageTranslation("USERNAME")}
                </th>
                <th className="thead-sticky ipaddress-column">
                  {languageTranslation("IP_ADDRESS")}
                </th>
              </tr>
            </thead>
            <tbody>
              {incorrectLoginListLoading ? (
                <tr>
                  <td className={"table-loader"} colSpan={7}>
                    <Loader />
                  </td>
                </tr>
              ) : incorrectLoginList &&
                incorrectLoginList.getDashboardLoginHistory.length ? (
                incorrectLoginList.getDashboardLoginHistory.map(
                  (item: any, index: number) => {
                    return (
                      <tr className="table-danger" key={index}>
                        <td className="date-column">
                          {" "}
                          {moment(item.createdAt).format(
                            defaultDateTimeFormatForDashboard
                          )}
                        </td>
                        <td>
                          <div
                            className="text-capitalize view-more-link word-wrap one-line-text"
                            onClick={() =>
                              history.push(
                                item.user.userRole === "caregiver"
                                  ? AppRoutes.CARE_GIVER_VIEW.replace(
                                      /:id/gi,
                                      item.user.id + "?tab=login"
                                    )
                                  : AppRoutes.CARE_INSTITUION_VIEW.replace(
                                      /:id/gi,
                                      item.user.id + "?tab=login"
                                    )
                              )
                            }
                          >
                            {item.user.firstName} {item.user.lastName}
                          </div>
                        </td>
                        <td className="username-column word-wrap one-line-text  ">
                          {item.user.userName}
                        </td>
                        <td className="ipaddress-column">
                          {item.loggedInIP
                            ? item.loggedInIP.replace("::ffff:", "")
                            : "-"}
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
                        Currently there are no logs available.
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
export default IncorrectLoginList;
