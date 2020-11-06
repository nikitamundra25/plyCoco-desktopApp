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
import correct from "../../../assets/img/correct.svg";
const SuccessfulLoginList: FunctionComponent<RouteComponentProps> = (
  props: any
) => {
  let history = useHistory();
  const { successfulLoginListLoading, successfulLoginList } = props;

  return (
    <Card>
      <CardHeader className="d-block">
        <CardTitle>
          {" "}
          <span className="align-middle mr-2">
            <img src={correct} alt="" width="20px" />
          </span>
          <span className="align-middle">
            {languageTranslation("SUCCESSFUL_LOGIN")}
          </span>
        </CardTitle>
      </CardHeader>

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
                <th className="thead-sticky ipaddress-column">
                  {languageTranslation("IP_ADDRESS")}
                </th>
              </tr>
            </thead>
            <tbody>
              {successfulLoginListLoading ? (
                <tr>
                  <td className={"table-loader"} colSpan={7}>
                    <Loader />
                  </td>
                </tr>
              ) : successfulLoginList &&
                successfulLoginList.getDashboardLoginHistory.length ? (
                successfulLoginList.getDashboardLoginHistory.map(
                  (item: any, index: number) => {
                    return (
                      <tr className="table-success cursor-pointer" key={index} onClick={() =>
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
                      } >
                        <td className="date-column">
                          {" "}
                          {moment(item.createdAt).format(
                            defaultDateTimeFormatForDashboard
                          )}
                        </td>
                        <td className="name-column">
                          <div
                            className="text-capitalize view-more-link  one-line-text "
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
                            {item.user.lastName} {item.user.firstName}
                          </div>
                        </td>
                        <td className="username-column one-line-text  ">
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
                        {languageTranslation("CURRENTLY_NO_LOGS_ADDED")}
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
export default SuccessfulLoginList;
