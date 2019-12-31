import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Card,
  CardHeader,
  Label,
  CardBody,
  CardGroup,
  Container,
  Input,
  Col,
  Row,
  Form,
  Table
} from "reactstrap";
import { AppRoutes } from "../../config";
import { RouteComponentProps } from "react-router";
class Department extends Component<RouteComponentProps, any> {
  render() {
    return (
      <Row>
        <Col xs={"12"} lg={"12"}>
          <Card>
            <CardHeader>
              <h4>
                <i className="fa fa-address-book" />
                <span className="ml-1">Department</span>
              </h4>
              <Button
                color={"primary"}
                className={"pull-right"}
                id={"add-new-pm-tooltip"}
                onClick={() =>
                  this.props.history.push(AppRoutes.ADD_DEPARTMENT)
                }
              >
                <i className={"fa fa-plus"} />
                &nbsp; Add New Department
              </Button>
            </CardHeader>
            <CardBody>
              <div className="filter-form form-section">
                <Row>
                  <Col lg={"2"}>
                    <FormGroup>
                      <Label for="search">Search:</Label>
                      <Input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search.."
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={"2"}>
                    <FormGroup>
                      <Label for="Selectregion">Region:</Label>
                      <Input type="select" name="region" id="Selectregion">
                        <option>Western India</option>
                        <option>East India</option>
                        <option>South India</option>
                        <option>Northeast India</option>
                        <option>Central India</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg={"2"}>
                    <FormGroup>
                      <Label for="Selectregion">Sort By:</Label>
                      <Input type="select" name="region" id="Selectregion">
                        <option>Popularity</option>
                        <option>A-Z</option>
                        <option>Z-A</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg={"2"}>
                    <FormGroup>
                      <Label for="Selectregion">Department:</Label>
                      <Input type="select" name="region" id="Selectregion">
                        <option>Sales</option>
                        <option>Marketing</option>
                        <option>HR</option>
                        <option>Development</option>
                        <option>Designing</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg={"2"}>
                    <div className="label-height"></div>
                    <div className="filter-btn-wrap">
                      <span className="btn-filter mr-2">
                        <i className="fa fa-search"></i>
                      </span>
                      <span className="btn-filter mr-2">
                        <i className="fa fa-refresh "></i>
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
              <Table bordered hover responsive>
                <thead className="thead-bg"></thead>
                <tbody></tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Department;
