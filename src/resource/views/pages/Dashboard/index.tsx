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
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../../../routes/routes";
import "./index.scss";

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
        <AppBreadcrumb appRoutes={routes} />
      </CardHeader>
      <CardBody>
        <div className="dashboard-section">
          <Row>
            <Col lg="4">
              <Card>
                <CardHeader>
                  <CardTitle>New Registration</CardTitle>
                </CardHeader>
                <CardBody>
                  <div>
                    <Table hover responsive>
                      <thead className="thead-bg">
                        <tr>
                          <th>Date</th>
                          <th>Name</th>
                          <th>Username</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>12.02.2018</td>
                          <td>John Doe</td>
                          <td>John+_c247</td>
                          <td>Caregiver</td>
                        </tr>
                        <tr>
                          <td>12.02.2018</td>
                          <td>John Doe</td>
                          <td>John+_c247</td>
                          <td>Care Institution</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>New Documents</CardTitle>
                </CardHeader>
                <CardBody>
                  <div>
                    <Table hover responsive>
                      <thead className="thead-bg">
                        <tr>
                          <th>Date</th>
                          <th>Name</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>12.02.2018</td>
                          <td>John Doe</td>
                          <td>Diverse Documnent</td>
                        </tr>
                        <tr>
                          <td>12.02.2018</td>
                          <td>John Doe</td>
                          <td>Diverse Documnent</td>
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
                  <CardTitle>New Appointments</CardTitle>
                </CardHeader>
                <CardBody>
                  <div>
                    <Table hover responsive>
                      <thead className="thead-bg">
                        <tr>
                          <th>Date</th>
                          <th>Name</th>
                          <th>Booking Date</th>
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
                          <td>John Doe</td>
                          <td>02.03.2020</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Confirmed Booking</CardTitle>
                </CardHeader>
                <CardBody>
                  <div>
                    <Table hover responsive>
                      <thead className="thead-bg">
                        <tr>
                          <th>Date</th>
                          <th>Name</th>
                          <th>Booking Date</th>
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
                          <td>John Doe</td>
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
                  <CardTitle>Incorrect Login</CardTitle>
                </CardHeader>
                <CardBody>
                  <div>
                    <Table hover responsive>
                      <thead className="thead-bg">
                        <tr>
                          <th>Date</th>
                          <th>Name</th>
                          <th>Login</th>
                          <th>Computer</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table-danger">
                          <td>28.02.2020</td>
                          <td>John Doe</td>
                          <td>Username</td>
                          <td>94.138.88.227</td>
                        </tr>
                        <tr className="table-danger">
                          <td>28.02.2020</td>
                          <td>John Doe</td>
                          <td>Username</td>
                          <td>94.138.88.227</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Successful Login</CardTitle>
                </CardHeader>
                <CardBody>
                  <div>
                    <Table hover responsive>
                      <thead className="thead-bg">
                        <tr>
                          <th>Date</th>
                          <th>Name</th>

                          <th>Computer</th>
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
                          <td>John Doe</td>
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
