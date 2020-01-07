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
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip
} from "reactstrap";
import { AppRoutes } from "../../config";
import { RouteComponentProps } from "react-router";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../routes/routes";
import { userData } from "./CareGiverData";
import { string } from "prop-types";
import Search from "../../common/SearchFilter";
class CareGiver extends Component<RouteComponentProps, any> {
  render() {
    const tableData: any[] = [];
    userData.map((user, index): any => {
      console.log("userData", userData);
      return tableData.push(
        <tr>
          <td>
            <div className="table-checkbox-wrap">
              <div className="btn-group btn-check-action-wrap">
                <span className="btn">
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </span>
                <span className="checkbox-no">{index + 1}</span>
              </div>
            </div>
          </td>

          <td>
            <div className="info-column">
              <div className="img-column">
                <img
                  src="https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
                  className="img-fluid"
                />
              </div>
              <div className="description-column">
                <div className="info-title">{user.name}</div>
                <p className="description-text">
                  <i className="fa fa-envelope mr-2"></i>
                  <span className="align-middle">{user.email}</span>
                </p>
                <p className="description-text">
                  <i className="fa fa-phone mr-2"></i>
                  <span className="align-middle">{user.phone}</span>
                </p>
              </div>
            </div>
          </td>
          <td>
            <div className="description-column  ml-0">
              {user.qualification
                ? user.qualification.map(qualification => (
                    <>
                      <p className="description-text ">
                        <span className="text-label mr-1">
                          <i className="fa fa-angle-right"></i>
                        </span>
                        <span className="align-middle">{qualification}</span>
                      </p>
                    </>
                  ))
                : null}
            </div>
          </td>
          <td>
            <div className="description-column  ml-0">
              {user.region
                ? user.region.map(region => (
                    <p className="description-text ">
                      <span className="text-label mr-1">
                        <i className="fa fa-angle-right"></i>
                      </span>
                      <span className="align-middle">{region}</span>
                    </p>
                  ))
                : null}
            </div>
          </td>

          {/* <td>
            <div className="description-column">
              <p className="description-text">
                <span className="text-bold mr-2">Fee Per Hour</span>
                <span className="align-middle">100 EUR</span>
              </p>
              <p className="description-text">
                <span className="text-bold mr-2">
                  Night allowance per hour:
                </span>
                <span className="align-middle">120 EUR</span>
              </p>
              <p className="description-text">
                <span className="text-bold mr-2">
                  Weekend allowance per hour:
                </span>
                <span className="align-middle">150 EUR</span>
              </p>
              <p className="description-text">
                <span className="text-bold mr-2">
                  Holiday allowance per hour:
                </span>
                <span className="align-middle">200 EUR</span>
              </p>
            </div>
          </td> */}

          <td>
            <div>
              <p className="description-text">
                <span className="align-middle">{user.applyingAs}</span>
              </p>
            </div>
          </td>

          <td className="text-center">
            <span
              className={`status-btn ${
                index % 2 === 0 ? "active" : "inactive"
              }`}
            >
              {index % 2 === 0 ? "Active" : "Disable"}
            </span>
          </td>
          <td>
            <div className="action-btn">
              <span
                className="btn-icon mr-2"
                id={`view${index}`}
                onClick={() =>
                  this.props.history.push(AppRoutes.PERSONAL_INFORMATION)
                }
              >
                <UncontrolledTooltip placement="top" target={`view${index}`}>
                  Click here to view caretaker
                </UncontrolledTooltip>
                <i className="fa fa-eye"></i>
              </span>
              <span
                className="btn-icon "
                id={`delete${index}`}
                onClick={() => this.props.history.push("")}
              >
                <UncontrolledTooltip placement="top" target={`delete${index}`}>
                  Click here to delete caretaker
                </UncontrolledTooltip>
                <i className="fa fa-trash"></i>
              </span>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <Row>
        <Col xs={"12"} lg={"12"}>
          <Card>
            <CardHeader>
              <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
              <Button
                color={"primary"}
                className={"btn-add"}
                id={"add-new-pm-tooltip"}
                onClick={() =>
                  this.props.history.push(AppRoutes.ADD_CARE_GIVER)
                }
              >
                <i className={"fa fa-plus"} />
                &nbsp; Add New Care Giver
              </Button>
            </CardHeader>

            <CardBody>
              <div>
                <Search />
              </div>
              {/* <div className="filter-form form-section">
                <Row>
                  <Col lg={"2"}>
                    <FormGroup>
                      <Label for="search" className="col-form-label">
                        Search:
                      </Label>
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
                      <Label for="Selectregion" className="col-form-label">
                        Region:
                      </Label>
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
                      <Label for="Selectregion" className="col-form-label">
                        Sort By:
                      </Label>
                      <Input type="select" name="region" id="Selectregion">
                        <option>Popularity</option>
                        <option>A-Z</option>
                        <option>Z-A</option>
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col lg={"2"}>
                    <div className="label-height"></div>
                    <div className="filter-btn-wrap">
                      <span className="btn-filter mr-2" id="search1">
                        <UncontrolledTooltip placement="top" target="search1">
                          Search
                        </UncontrolledTooltip>
                        <i className="fa fa-search"></i>
                      </span>
                      <span className="btn-filter mr-2" id="reset">
                        <UncontrolledTooltip placement="top" target="reset">
                          Reset
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh "></i>
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
               */}
              <Table bordered hover responsive>
                <thead className="thead-bg">
                  <tr>
                    <th>
                      <div className="table-checkbox-wrap">
                        <div className="btn-group btn-check-action-wrap">
                          <span className="btn">
                            <span className="checkboxli checkbox-custom checkbox-default">
                              <input
                                type="checkbox"
                                id="checkAll"
                                className=""
                              />
                              <label className=""></label>
                            </span>
                          </span>
                          <UncontrolledDropdown className="custom-dropdown">
                            <DropdownToggle caret color="link" />
                            <DropdownMenu>
                              <DropdownItem>Delete</DropdownItem>
                              <DropdownItem>Active</DropdownItem>
                              <DropdownItem>Deactive</DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                    </th>
                    <th>CareGiver Information</th>
                    <th>Qualification</th>
                    <th>Region</th>
                    {/* <th>Price Range</th> */}
                    <th>Applying as</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>{tableData}</tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default CareGiver;
