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

const DocumentList: FunctionComponent<RouteComponentProps> = (props: any) => {
  let history = useHistory();
  const { documentListLoading, documentList } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle> {languageTranslation("NEW_DOCUMENT")}</CardTitle>
      </CardHeader>
      {documentListLoading ? (
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
                  {" "}
                  {languageTranslation("DATE")}
                </th>
                <th className="thead-sticky">
                  {languageTranslation("NAME")}
                </th>
                <th className="thead-sticky">
                  {languageTranslation("TYPE")}
                </th>
              </tr>
            </thead>
            <tbody>
              {documentList && documentList.getDashboardNewDocuments.length
                ? documentList.getDashboardNewDocuments.map(
                  (item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td> {moment(item.createdAt).format(defaultDateTimeFormatForDashboard)}</td>
                        <td>
                          <div className="text-capitalize view-more-link" onClick={() =>
                            history.push(
                              item.user.userRole === 'caregiver' ?
                                AppRoutes.CARE_GIVER_VIEW.replace(
                                  /:id/gi,
                                  item.user.id + "?tab=documents"
                                )
                                :
                                AppRoutes.CARE_INSTITUION_VIEW.replace(
                                  /:id/gi,
                                  item.user.id + "?tab=documents"
                                )
                            )
                          }>{item.user.firstName}{" "}{item.user.lastName}
                          </div>
                        </td>
                        <td>{item.document_type ? item.document_type.type : null}</td>
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
export default DocumentList;
