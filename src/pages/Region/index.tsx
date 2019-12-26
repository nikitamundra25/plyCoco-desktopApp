import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Card,
  CardHeader,
  Label,
  CardBody,
  Input,
  Col,
  Row,
  Table
} from "reactstrap";
import { AppRoutes } from "../../config";
import { RouteComponentProps } from "react-router";
class Region extends Component<RouteComponentProps, any> {
  render() {
    return (
      <Row>
        <Col xs={"12"} lg={"12"}>
          <Card>
            <CardHeader>
              <h4>
                <i className="icon-users" /> Region
              </h4>
              <Button
                color={"primary"}
                className={"pull-right"}
                id={"add-new-pm-tooltip"}
                onClick={() => this.props.history.push(AppRoutes.ADD_REGION)}
              >
                <i className={"fa fa-plus"} />
                &nbsp; Add New Region
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
                </Row>
              </div>
              <Table striped bordered hover responsive>
                <thead className="thead-bg">
                  <tr>
                    <th>S.No</th>
                    <th>Region Name</th>
                    <th className="text-center">Number of Canstitution</th>
                    <th className="text-center">Number of Care Givers</th>
                    <th className="text-center">
                      Current ongoing appointments counter
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td className="text-center">Northeast</td>
                    <td className="text-center">5</td>
                    <td className="text-center">20</td>
                    <td className="text-center">2</td>
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

export default Region;
