import React, { FunctionComponent } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table
} from "reactstrap";
import Select from "react-select";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../../../routes/routes";
import "./index.scss";
import { languageTranslation } from "../../../../helpers";

const Dashboard: FunctionComponent = () => {
  return (
    // <div className="animated fadeIn">
    //   <Card>
    //     <CardBody>
    //       <h4 className={"text-center"}>Coming Soon</h4>
    //     </CardBody>
    //   </Card>
    // </div>
    <Card>
      <CardHeader>
        <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
        <div className="d-flex align-items-center">
          <div className="common-label one-line-text mr-3">
            {languageTranslation("SHOW_DAY")}
          </div>
          <div className="day-select">
            <Select
              classNamePrefix="custom-inner-reactselect"
              className={"custom-reactselect "}
              placeholder="1"
            />
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="dashboard-section">
          <Row>
            <Col lg="4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {" "}
                    {languageTranslation("NEW_REGISTRATION")}
                  </CardTitle>
                </CardHeader>
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
                        <tr>
                          <td>12.02.2018</td>
                          <td>John Doe</td>
                          <td>John_c247</td>
                          <td>Caregiver</td>
                        </tr>
                        <tr>
                          <td>12.02.2018</td>
                          <td>Michale clark</td>
                          <td>michale_c247</td>
                          <td>Care Institution</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle> {languageTranslation("NEW_DOCUMENT")}</CardTitle>
                </CardHeader>
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
                        <tr>
                          <td>12.02.2018</td>
                          <td>John Doe</td>
                          <td>Diverse Document</td>
                        </tr>
                        <tr>
                          <td>12.02.2018</td>
                          <td>Nick Stone</td>
                          <td>Licence Document</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {" "}
                    {languageTranslation("NEW_APPOINTMENTS")}
                  </CardTitle>
                </CardHeader>
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

              <Card>
                <CardHeader>
                  <CardTitle>
                    {" "}
                    {languageTranslation("CONFIRM_APPOINTMENTS")}
                  </CardTitle>
                </CardHeader>
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
                          <td>Justin Nicole</td>
                          <td>02.03.2020</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {" "}
                    {languageTranslation("INCORRECT_LOGIN")}
                  </CardTitle>
                </CardHeader>
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
                            {languageTranslation("LOGIN")}
                          </th>
                          <th className="thead-sticky">
                            {languageTranslation("IP_ADDRESS")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table-danger">
                          <td>28.02.2020</td>
                          <td>John Doe</td>
                          <td>john_c345</td>
                          <td>94.138.88.227</td>
                        </tr>
                        <tr className="table-danger">
                          <td>28.02.2020</td>
                          <td>Milano Esco</td>
                          <td>milano_987</td>
                          <td>94.138.88.227</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {" "}
                    {languageTranslation("SUCCESSFUL_LOGIN")}
                  </CardTitle>
                </CardHeader>
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
                            {languageTranslation("IP_ADDRESS")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>28.02.2020</td>
                          <td>John Doe</td>

                          <td>94.138.88.227</td>
                        </tr>
                        <tr>
                          <td>28.02.2020</td>
                          <td>Wilter Delton</td>
                          <td>94.138.88.227</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

export default Dashboard;
