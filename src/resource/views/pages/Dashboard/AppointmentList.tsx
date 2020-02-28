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
import { RouteComponentProps } from "react-router-dom";

const AppointmentList: FunctionComponent<RouteComponentProps> = (props: any) => {
  const { appointmentListLoading } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {" "}
          {languageTranslation("NEW_APPOINTMENTS")}
        </CardTitle>
      </CardHeader>
      {appointmentListLoading ? (
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
                  {" "}
                  {languageTranslation("BOOKING_DATE")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>28.02.2020</td>
                <td>John Doe</td>
                <td>02.03.2020</td>
              </tr>
              <tr>
                <td>28.02.2020</td>
                <td>Anna Strong</td>
                <td>02.03.2020</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};
export default AppointmentList;
