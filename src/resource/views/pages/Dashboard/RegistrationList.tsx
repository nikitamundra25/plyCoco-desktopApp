import React, { FunctionComponent } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table
} from "reactstrap";
import { languageTranslation } from "../../../../helpers";
import Loader from "../../containers/Loader/Loader";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { defaultDateTimeFormatForDashboard, AppRoutes } from "../../../../config";
import moment from 'moment';

const RegistrationList: FunctionComponent<RouteComponentProps> = (props: any) => {
  let history = useHistory();
  const { registrationListLoading, registrationList } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {" "}
          {languageTranslation("NEW_REGISTRATION")}
        </CardTitle>
      </CardHeader>
      {registrationListLoading ? (
        <div>
          <Loader />
        </div>
      ) : null}
      <CardBody className="custom-scrollbar">
        <div>
          <Table hover>
            <thead className="thead-bg">
              <tr>
                <th className="thead-sticky">
                  {languageTranslation("DATE")}
                </th>
                <th className="thead-sticky">
                  {languageTranslation("NAME")}
                </th>
                <th className="thead-sticky">
                  {languageTranslation("USERNAME")}
                </th>
                <th className="thead-sticky">
                  {languageTranslation("TYPE")}
                </th>
              </tr>
            </thead>
            <tbody>
              {registrationList && registrationList.getDashboardRegistrations.length
                ? registrationList.getDashboardRegistrations.map(
                  (item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td> {moment(item.createdAt).format(defaultDateTimeFormatForDashboard)}</td>
                        <td>
                          <div className="text-capitalize view-more-link"onClick={() =>
                            history.push(
                              item.userRole==='caregiver'?
                              AppRoutes.CARE_GIVER_VIEW.replace(
                                /:id/gi,
                                item.id
                              )
                              :
                              AppRoutes.CARE_INSTITUION_VIEW.replace(
                                /:id/gi,
                                item.id
                              )
                            )
                          }>{item.firstName}{" "}{item.lastName}
                          </div>
                        </td>
                        <td>{item.userName}</td>
                        <td>{item.userRole}</td>
                      </tr>
                    )
                  }
                ) : null}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};
export default RegistrationList;
