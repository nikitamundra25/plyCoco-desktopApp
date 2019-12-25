import React, { Component } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  UncontrolledTooltip
} from "reactstrap";

class Employee extends Component {
  render() {
    return (
      <Row>
        <Col xs={"12"} lg={"12"}>
          <Card>
            <CardHeader>
              <h4>
                <i className="fa fa-users" /> Users
              </h4>
              <Button
                color={"primary"}
                className={"pull-right"}
                id={"add-new-pm-tooltip"}
              >
                <i className={"fa fa-plus"} />
                &nbsp; Add New User
              </Button>
              <UncontrolledTooltip target={"add-new-pm-tooltip"}>
                Add New User
              </UncontrolledTooltip>
            </CardHeader>
            <CardBody>
              <Table striped bordered hover responsive>
                <thead className="thead-dark">
                  <tr className="text-center">
                    <th>S No.</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Employee;
