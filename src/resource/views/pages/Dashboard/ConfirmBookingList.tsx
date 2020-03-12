import React, { FunctionComponent } from "react";
import { Card, CardHeader, CardBody, CardTitle, Table } from "reactstrap";
import { languageTranslation } from "../../../../helpers";
import Loader from "../../containers/Loader/Loader";
import { RouteComponentProps } from "react-router-dom";
import confirm_booking from "../../../assets/img/confirm_booking.svg";

const ConfirmBookingList: FunctionComponent<RouteComponentProps> = (
  props: any
) => {
  const { confirmBookingListLoading } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="align-middle mr-2">
            <img src={confirm_booking} alt="" width="20px" />
          </span>
          <span className="align-middle">
            {languageTranslation("CONFIRM_APPOINTMENTS")}
          </span>
        </CardTitle>
      </CardHeader>
      {confirmBookingListLoading ? (
        <div>
          <Loader />
        </div>
      ) : null}
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
                <th className="thead-sticky date-column">
                  {" "}
                  {languageTranslation("BOOKING_DATE")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="date-column">28.02.2020</td>
                <td className="name-column">John Doe</td>
                <td className="date-column">02.03.2020</td>
              </tr>
              <tr>
                <td className="date-column">28.02.2020</td>
                <td className="name-column">Anna Strong</td>
                <td className="date-column">02.03.2020</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};
export default ConfirmBookingList;