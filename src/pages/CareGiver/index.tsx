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
class CareGiver extends Component<RouteComponentProps, any> {
  render() {
    const tableData: any[] = [];
    for (let index = 0; index < 10; index++) {
      tableData.push(
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
                <div className="info-title">Sir John Doe</div>
                <p className="description-text">
                  <i className="fa fa-envelope mr-2"></i>
                  <span className="align-middle">john@gmail.com</span>
                </p>
                <p className="description-text">
                  <i className="fa fa-phone mr-2"></i>
                  <span className="align-middle">564575678</span>
                </p>
              </div>
            </div>
          </td>
          <td>
            <div className="description-column  ml-0">
              <p className="description-text ">
                <span className="text-label mr-1">
                  <i className="fa fa-angle-right"></i>
                </span>
                <span className="align-middle">Care</span>
              </p>
              <p className="description-text ">
                <span className="text-label mr-1">
                  <i className="fa fa-angle-right"></i>
                </span>
                <span className="align-middle">Anesthesia Assistance</span>
              </p>
              <p className="description-text ">
                <span className="text-label mr-1">
                  <i className="fa fa-angle-right"></i>
                </span>
                <span className="align-middle">Obstetrics</span>
              </p>
            </div>
          </td>
          <td>
            <div className="description-column">
              <div className="info-title">Sir John Doe</div>
              <p className="description-text">
                <span className=" mr-2">Bank Name</span>
                <span className="align-middle">john@gmail.com</span>
              </p>
              <p className="description-text">
                <i className="fa fa-phone mr-2"></i>
                <span className="align-middle">564575678</span>
              </p>
            </div>
          </td>
          <td className="text-center">
            {" "}
            {/* <div className="description-column ml-0">
              <p className="description-text">
                <span className="text-label mr-1">Employee ID:</span>
                <span className="align-middle">e546567cdg</span>
              </p>
              <p className="description-text">
                <span className="text-label mr-1">Employee Username:</span>
                <span className="align-middle">US_542346</span>
              </p>
            </div> */}
            <div>3</div>
          </td>
          <td className="text-center">
            <span
              className={`status-btn ${
                index % 2 === 0 ? "active" : "inactive"
              }`}
            >
              {index % 2 === 0 ? "Active" : "Deactive"}
            </span>
          </td>
          <td>
            <div className="action-btn">
              <span className="btn-icon mr-2" id={`edit${index}`}>
                <UncontrolledTooltip placement="top" target={`edit${index}`}>
                  Edit
                </UncontrolledTooltip>
                <i
                  className="fa fa-pencil"
                  onClick={() =>
                    this.props.history.push(AppRoutes.EDIT_CARE_GIVER)
                  }
                ></i>
              </span>
              <span className="btn-icon mr-2" id={`view${index}`}>
                <UncontrolledTooltip placement="top" target={`view${index}`}>
                  View
                </UncontrolledTooltip>
                <i
                  className="fa fa-eye"
                  onClick={() =>
                    this.props.history.push(AppRoutes.PERSONAL_INFORMATION)
                  }
                ></i>
              </span>
              <span className="btn-icon " id={`delete${index}`}>
                <UncontrolledTooltip placement="top" target={`delete${index}`}>
                  Delete
                </UncontrolledTooltip>
                <i
                  className="fa fa-trash"
                  onClick={() => this.props.history.push("")}
                ></i>
              </span>
            </div>
          </td>
        </tr>
      );
    }
    return (
      <Row>
        <Col xs={"12"} lg={"12"}>
          <Card>
            <CardHeader>
              <h4>
                <i className="fa fa-h-square" />
                <span className="ml-1">CareGiver</span>
              </h4>
              <Button
                color={"primary"}
                className={"pull-right"}
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
                  {/* <Col lg={"2"}>
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
                  </Col> */}
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
                    <th>Bank Information</th>
                    <th className="text-center">Leasing Information</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>{tableData}</tbody>
                {/* <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <div className="info-column">
                        <div className="img-column">
                          <img
                            src="https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
                            className="img-fluid"
                          />
                        </div>
                        <div className="description-column">
                          <div className="info-title">John Doe</div>
                          <p className="description-text">
                            <i className="fa fa-envelope mr-2"></i>
                            <span className="align-middle">john@gmail.com</span>
                          </p>
                          <p className="description-text">
                            <i className="fa fa-phone mr-2"></i>
                            <span className="align-middle">564575678</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="description-column ml-0">
                        <p className="description-text">
                          <span className="text-label mr-1">Department:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Region:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Employee ID:</span>
                          <span className="align-middle">e546567cdg</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">
                            Employee Username:
                          </span>
                          <span className="align-middle">US_542346</span>
                        </p>
                      </div>
                    </td>
                    <td>38, Street 8, Mascow Tower, Sydney</td>
                    <td className="text-center">
                      <span className="status-btn active">Active</span>
                    </td>
                    <td>
                      <div
                        className="action-btn"
                        
                      >
                        
                        <span className="btn-icon mr-2">
                          <i className="fa fa-pencil"></i>
                        </span>
                        <span className="btn-icon mr-2">
                          <i className="fa fa-eye"></i>
                        </span>
                        <span className="btn-icon ">
                          <i className="fa fa-trash"></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <div className="info-column">
                        <div className="img-column">
                          <img
                            src="https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
                            className="img-fluid"
                          />
                        </div>
                        <div className="description-column">
                          <div className="info-title">John Doe</div>
                          <p className="description-text">
                            <i className="fa fa-envelope mr-2"></i>
                            <span className="align-middle">john@gmail.com</span>
                          </p>
                          <p className="description-text">
                            <i className="fa fa-phone mr-2"></i>
                            <span className="align-middle">564575678</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="description-column ml-0">
                        <p className="description-text">
                          <span className="text-label mr-1">Department:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Region:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Employee ID:</span>
                          <span className="align-middle">e546567cdg</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">
                            Employee Username:
                          </span>
                          <span className="align-middle">US_542346</span>
                        </p>
                      </div>
                    </td>
                    <td>38, Street 8, Mascow Tower, Sydney</td>
                    <td className="text-center">
                      <span className="status-btn inactive">Disable</span>
                    </td>
                    <td>
                      <div className="action-btn">
                        <span className="btn-icon mr-2">
                          <i className="fa fa-pencil"></i>
                        </span>
                        <span className="btn-icon mr-2">
                          <i className="fa fa-eye"></i>
                        </span>
                        <span className="btn-icon ">
                          <i className="fa fa-trash"></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>
                      <div className="info-column">
                        <div className="img-column">
                          <img
                            src="https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
                            className="img-fluid"
                          />
                        </div>
                        <div className="description-column">
                          <div className="info-title">John Doe</div>
                          <p className="description-text">
                            <i className="fa fa-envelope mr-2"></i>
                            <span className="align-middle">john@gmail.com</span>
                          </p>
                          <p className="description-text">
                            <i className="fa fa-phone mr-2"></i>
                            <span className="align-middle">564575678</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="description-column ml-0">
                        <p className="description-text">
                          <span className="text-label mr-1">Department:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Region:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Employee ID:</span>
                          <span className="align-middle">e546567cdg</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">
                            Employee Username:
                          </span>
                          <span className="align-middle">US_542346</span>
                        </p>
                      </div>
                    </td>
                    <td>38, Street 8, Mascow Tower, Sydney</td>
                    <td className="text-center">
                      <span className="status-btn active">Active</span>
                    </td>
                    <td>
                      <div className="action-btn">
                        <span className="btn-icon mr-2">
                          <i className="fa fa-pencil"></i>
                        </span>
                        <span className="btn-icon mr-2">
                          <i className="fa fa-eye"></i>
                        </span>
                        <span className="btn-icon ">
                          <i className="fa fa-trash"></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>
                      <div className="info-column">
                        <div className="img-column">
                          <img
                            src="https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
                            className="img-fluid"
                          />
                        </div>
                        <div className="description-column">
                          <div className="info-title">John Doe</div>
                          <p className="description-text">
                            <i className="fa fa-envelope mr-2"></i>
                            <span className="align-middle">john@gmail.com</span>
                          </p>
                          <p className="description-text">
                            <i className="fa fa-phone mr-2"></i>
                            <span className="align-middle">564575678</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="description-column ml-0">
                        <p className="description-text">
                          <span className="text-label mr-1">Department:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Region:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Employee ID:</span>
                          <span className="align-middle">e546567cdg</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">
                            Employee Username:
                          </span>
                          <span className="align-middle">US_542346</span>
                        </p>
                      </div>
                    </td>
                    <td>38, Street 8, Mascow Tower, Sydney</td>
                    <td className="text-center">
                      <span className="status-btn inactive">Disable</span>
                    </td>
                    <td>
                      <div className="action-btn">
                        <span className="btn-icon mr-2">
                          <i className="fa fa-pencil"></i>
                        </span>
                        <span className="btn-icon mr-2">
                          <i className="fa fa-eye"></i>
                        </span>
                        <span className="btn-icon ">
                          <i className="fa fa-trash"></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>
                      <div className="info-column">
                        <div className="img-column">
                          <img
                            src="https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
                            className="img-fluid"
                          />
                        </div>
                        <div className="description-column">
                          <div className="info-title">John Doe</div>
                          <p className="description-text">
                            <i className="fa fa-envelope mr-2"></i>
                            <span className="align-middle">john@gmail.com</span>
                          </p>
                          <p className="description-text">
                            <i className="fa fa-phone mr-2"></i>
                            <span className="align-middle">564575678</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="description-column ml-0">
                        <p className="description-text">
                          <span className="text-label mr-1">Department:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Region:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Employee ID:</span>
                          <span className="align-middle">e546567cdg</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">
                            Employee Username:
                          </span>
                          <span className="align-middle">US_542346</span>
                        </p>
                      </div>
                    </td>
                    <td>38, Street 8, Mascow Tower, Sydney</td>
                    <td className="text-center">
                      <span className="status-btn active">Active</span>
                    </td>
                    <td>
                      <div className="action-btn">
                        <span className="btn-icon mr-2">
                          <i className="fa fa-pencil"></i>
                        </span>
                        <span className="btn-icon mr-2">
                          <i className="fa fa-eye"></i>
                        </span>
                        <span className="btn-icon ">
                          <i className="fa fa-trash"></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>
                      <div className="info-column">
                        <div className="img-column">
                          <img
                            src="https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
                            className="img-fluid"
                          />
                        </div>
                        <div className="description-column">
                          <div className="info-title">John Doe</div>
                          <p className="description-text">
                            <i className="fa fa-envelope mr-2"></i>
                            <span className="align-middle">john@gmail.com</span>
                          </p>
                          <p className="description-text">
                            <i className="fa fa-phone mr-2"></i>
                            <span className="align-middle">564575678</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="description-column ml-0">
                        <p className="description-text">
                          <span className="text-label mr-1">Department:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Region:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Employee ID:</span>
                          <span className="align-middle">e546567cdg</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">
                            Employee Username:
                          </span>
                          <span className="align-middle">US_542346</span>
                        </p>
                      </div>
                    </td>
                    <td>38, Street 8, Mascow Tower, Sydney</td>
                    <td className="text-center">
                      <span className="status-btn active">Active</span>
                    </td>
                    <td>
                      <div className="action-btn">
                        <span className="btn-icon mr-2">
                          <i className="fa fa-pencil"></i>
                        </span>
                        <span className="btn-icon mr-2">
                          <i className="fa fa-eye"></i>
                        </span>
                        <span className="btn-icon ">
                          <i className="fa fa-trash"></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>
                      <div className="info-column">
                        <div className="img-column">
                          <img
                            src="https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
                            className="img-fluid"
                          />
                        </div>
                        <div className="description-column">
                          <div className="info-title">John Doe</div>
                          <p className="description-text">
                            <i className="fa fa-envelope mr-2"></i>
                            <span className="align-middle">john@gmail.com</span>
                          </p>
                          <p className="description-text">
                            <i className="fa fa-phone mr-2"></i>
                            <span className="align-middle">564575678</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="description-column ml-0">
                        <p className="description-text">
                          <span className="text-label mr-1">Department:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Region:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Employee ID:</span>
                          <span className="align-middle">e546567cdg</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">
                            Employee Username:
                          </span>
                          <span className="align-middle">US_542346</span>
                        </p>
                      </div>
                    </td>
                    <td>38, Street 8, Mascow Tower, Sydney</td>
                    <td className="text-center">
                      <span className="status-btn inactive">Disable</span>
                    </td>
                    <td>
                      <div className="action-btn">
                        <span className="btn-icon mr-2">
                          <i className="fa fa-pencil"></i>
                        </span>
                        <span className="btn-icon mr-2">
                          <i className="fa fa-eye"></i>
                        </span>
                        <span className="btn-icon ">
                          <i className="fa fa-trash"></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>
                      <div className="info-column">
                        <div className="img-column">
                          <img
                            src="https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
                            className="img-fluid"
                          />
                        </div>
                        <div className="description-column">
                          <div className="info-title">John Doe</div>
                          <p className="description-text">
                            <i className="fa fa-envelope mr-2"></i>
                            <span className="align-middle">john@gmail.com</span>
                          </p>
                          <p className="description-text">
                            <i className="fa fa-phone mr-2"></i>
                            <span className="align-middle">564575678</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="description-column ml-0">
                        <p className="description-text">
                          <span className="text-label mr-1">Department:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Region:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Employee ID:</span>
                          <span className="align-middle">e546567cdg</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">
                            Employee Username:
                          </span>
                          <span className="align-middle">US_542346</span>
                        </p>
                      </div>
                    </td>
                    <td>38, Street 8, Mascow Tower, Sydney</td>
                    <td className="text-center">
                      <span className="status-btn active">Active</span>
                    </td>
                    <td>
                      <div className="action-btn">
                        <span className="btn-icon mr-2">
                          <i className="fa fa-pencil"></i>
                        </span>
                        <span className="btn-icon mr-2">
                          <i className="fa fa-eye"></i>
                        </span>
                        <span className="btn-icon ">
                          <i className="fa fa-trash"></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>
                      <div className="info-column">
                        <div className="img-column">
                          <img
                            src="https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
                            className="img-fluid"
                          />
                        </div>
                        <div className="description-column">
                          <div className="info-title">John Doe</div>
                          <p className="description-text">
                            <i className="fa fa-envelope mr-2"></i>
                            <span className="align-middle">john@gmail.com</span>
                          </p>
                          <p className="description-text">
                            <i className="fa fa-phone mr-2"></i>
                            <span className="align-middle">564575678</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="description-column ml-0">
                        <p className="description-text">
                          <span className="text-label mr-1">Department:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Region:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Employee ID:</span>
                          <span className="align-middle">e546567cdg</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">
                            Employee Username:
                          </span>
                          <span className="align-middle">US_542346</span>
                        </p>
                      </div>
                    </td>
                    <td>38, Street 8, Mascow Tower, Sydney</td>
                    <td className="text-center">
                      <span className="status-btn active">Active</span>
                    </td>
                    <td>
                      <div className="action-btn">
                        <span className="btn-icon mr-2">
                          <i className="fa fa-pencil"></i>
                        </span>
                        <span className="btn-icon mr-2">
                          <i className="fa fa-eye"></i>
                        </span>
                        <span className="btn-icon ">
                          <i className="fa fa-trash"></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>
                      <div className="info-column">
                        <div className="img-column">
                          <img
                            src="https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
                            className="img-fluid"
                          />
                        </div>
                        <div className="description-column">
                          <div className="info-title">John Doe</div>
                          <p className="description-text">
                            <i className="fa fa-envelope mr-2"></i>
                            <span className="align-middle">john@gmail.com</span>
                          </p>
                          <p className="description-text">
                            <i className="fa fa-phone mr-2"></i>
                            <span className="align-middle">564575678</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="description-column ml-0">
                        <p className="description-text">
                          <span className="text-label mr-1">Department:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Region:</span>
                          <span className="align-middle">HR Marketing</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">Employee ID:</span>
                          <span className="align-middle">e546567cdg</span>
                        </p>
                        <p className="description-text">
                          <span className="text-label mr-1">
                            Employee Username:
                          </span>
                          <span className="align-middle">US_542346</span>
                        </p>
                      </div>
                    </td>
                    <td>38, Street 8, Mascow Tower, Sydney</td>
                    <td className="text-center">
                      <span className="status-btn active">Active</span>
                    </td>
                    <td>
                      <div className="action-btn">
                        
                        <span className="btn-icon mr-2">
                          <i
                            className="fa fa-pencil"
                            onClick={() =>
                              this.props.history.push(AppRoutes.EDIT_EMPLOYEE)
                            }
                          ></i>
                        </span>
                        <span className="btn-icon mr-2">
                          <i
                            className="fa fa-eye"
                            onClick={() =>
                              this.props.history.push(AppRoutes.VIEW_EMPLOYEE)
                            }
                          ></i>
                        </span>
                        <span className="btn-icon ">
                          <i
                            className="fa fa-trash"
                            onClick={() => this.props.history.push("")}
                          ></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
               */}
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default CareGiver;