import React, { useState, FunctionComponent } from "react";
import {
  Button,
  Table,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Nav
} from "reactstrap";
import Select from "react-select";
import logger from "redux-logger";
import { languageTranslation } from "../../../../helpers";
import Search from "../../components/SearchFilter/index";
import { State } from "../../../../config";
import close from "../../../assets/img/cancel.svg";
import closehover from "../../../assets/img/cancel-hover.svg";
import refresh from "../../../assets/img/refresh.svg";
import PlyCocoreceipt from "../../../assets/img/header-icons/plyCoco-receipt.svg";
import SpecialistInvoice from "../../../assets/img/header-icons/specialist-invoice.svg";
import professaionalProfile from "../../../assets/img/header-icons/professaional-profile.svg";
import paid from "../../../assets/img/header-icons/paid.svg";
import interierDesign from "../../../assets/img/header-icons/interier-design-professional.svg";
import Again from "../../../assets/img/header-icons/again.svg";
import { FormikHelpers, FormikProps, Formik } from "formik";
import { RouteComponentProps } from "react-router";
import showAppointment from "../../../assets/img/header-icons/show-appointment.svg";
import { TODO_PAGE_LIMIT, AppRoutes } from "../../../../config";
import "./index.scss";
import filter from "../../../assets/img/filter.svg";

const AllInvoices: FunctionComponent<RouteComponentProps> & any = (
  mainProps: any
) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
  ];

  return (
    <>
      <Card>
        <div className="common-detail-page">
          <div className="common-detail-section">
            <div className="common-sidnav">
              <Nav className="common-ul" tabs>
                <li className="nav-item">
                  <a className="nav-link ">
                    <span className="nav-text text-capitalize">
                      Booking details
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active">
                    <span className="nav-text text-capitalize">
                      Price & working hours
                    </span>
                  </a>
                </li>
              </Nav>
            </div>

       
              <div className="common-topheader d-flex  px-2 mb-1">
                <div className="header-nav-colmn-items">
                  <div className="header-nav-heading mx-1"></div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={refresh} alt="" />
                    </span>
                    <span className="header-nav-text">
                      {languageTranslation("REFRESH")}
                    </span>
                  </div>
                  <div className="header-nav-item ">
                    <span className="header-nav-text">Open</span>
                  </div>
                  <div className="header-nav-item ">
                    <span className="header-nav-text">Not seen</span>
                  </div>
                </div>
                <div className="header-nav-colmn-items">
                  <div className="header-nav-heading mx-1">Filter</div>
                  <div className="user-select mx-1 ">
                    <Select
                      classNamePrefix="custom-inner-reactselect"
                      className={"custom-reactselect "}
                      placeholder="professional"
                      options={options}
                      isClearable={true}
                    />
                  </div>
                  <div className="user-select mx-1 ">
                    <Select
                      classNamePrefix="custom-inner-reactselect"
                      className={"custom-reactselect "}
                      placeholder="facilities"
                      options={options}
                      isClearable={true}
                    />
                  </div>
                  <div className="user-select mx-1 ">
                    <Select
                      classNamePrefix="custom-inner-reactselect"
                      className={"custom-reactselect "}
                      placeholder="Broadcast date"
                      options={options}
                      isClearable={true}
                    />
                  </div>
                </div>
                <div className="header-nav-colmn-items">
                  <div className="header-nav-heading mx-1">
                    View Invoice PDFs
                  </div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={PlyCocoreceipt} alt="" />
                    </span>
                    <span className="header-nav-text">
                      PlyCoco show receipt
                    </span>
                  </div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={SpecialistInvoice} alt="" />
                    </span>
                    <span className="header-nav-text">
                      Show specialist invoice
                    </span>
                  </div>
                </div>
                <div className="header-nav-colmn-items">
                  <div className="header-nav-heading mx-1">
                    Sent &amp; Unsent
                  </div>
                  <div className="header-nav-item">
                    <span className="header-nav-icon">
                      <img src={Again} alt="" />
                    </span>
                    <span className="header-nav-text">again</span>
                  </div>
                  <div className="header-nav-item">
                    <span className="header-nav-text">Sent today</span>
                  </div>
                  <div className="header-nav-item">
                    <span className="header-nav-text">Unsent</span>
                  </div>
                </div>
                <div className="header-nav-colmn-items">
                  <div className="header-nav-heading mx-1">
                    Paid &amp; Unpaid
                  </div>

                  <div className="header-nav-item">
                    <span className="header-nav-icon">
                      <img src={paid} alt="" />
                    </span>
                    <span className="header-nav-text">Paid</span>
                  </div>
                  <div className="header-nav-item">
                    <span className="header-nav-icon">
                      <img src={"unPaid"} alt="" />
                    </span>
                    <span className="header-nav-text">Unpaid</span>
                  </div>
                  <div className="user-select mx-1 ">
                    <Select
                      classNamePrefix="custom-inner-reactselect"
                      className={"custom-reactselect "}
                      placeholder="professional"
                      options={options}
                      isClearable={true}
                    />
                  </div>
                </div>
                <div className="header-nav-colmn-items profile-section">
                  <div className="header-nav-heading mx-1">User Profile</div>

                  <div className="header-nav-item">
                    <span className="header-nav-icon">
                      <img src={professaionalProfile} alt="" />
                    </span>
                    <span className="header-nav-text">
                      Professional profile
                    </span>
                  </div>
                  <div className="header-nav-item">
                    <span className="header-nav-icon">
                      <img src={interierDesign} alt="" />
                    </span>
                    <span className="header-nav-text">
                      interior design professional
                    </span>
                  </div>
                  <div className="header-nav-item">
                    <span className="header-nav-icon">
                      <img src={showAppointment} alt="" />
                    </span>
                    <span className="header-nav-text">Show appointments</span>
                  </div>
                </div>
                <div className="header-nav-colmn-items profile-section">
                  <div className="header-nav-heading mx-1"></div>

                  <div className="header-nav-item">
                    <span className="header-nav-text">professional</span>
                  </div>
                  <div className="header-nav-item">
                    <span className="header-nav-text">furnishing solo</span>
                  </div>
                </div>
              </div>
      

            <CardBody>
              <div className="filter-form form-section mb-2">
                <Form>
                  <Row>
                    <Col lg={"3"} md={"3"}>
                      <FormGroup>
                        <Label for="search" className="col-form-label">
                          {languageTranslation("SEARCH_LABEL")} :
                        </Label>
                        <Input
                          type="text"
                          name="searchValue"
                          id="search"
                          value={"searchValue"}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={"2"} md={"3"}>
                      <FormGroup>
                        <Label for="Selectregion" className="col-form-label">
                          {languageTranslation("STATUS_LABEL")} :
                        </Label>
                        <Select
                          placeholder={languageTranslation(
                            "STATUS_PLACEHOLDER"
                          )}
                          options={options}
                          isClearable={true}
                          isSearchable={false}
                          classNamePrefix="custom-inner-reactselect"
                          className={"custom-reactselect"}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={"2"} md={"3"}>
                      <FormGroup>
                        <Label for="Selectregion" className="col-form-label">
                          {languageTranslation("FILTER_BY_STATUS")} :
                        </Label>
                        <Select
                          placeholder={languageTranslation(
                            "STATUS_PLACEHOLDER"
                          )}
                          options={options}
                          isClearable={true}
                          isSearchable={false}
                          classNamePrefix="custom-inner-reactselect"
                          className={"custom-reactselect"}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg={"2"} md={"3"}>
                      <div className="label-height"></div>
                      <div className="filter-btn-wrap">
                        <Button
                          className="btn-filter mr-2"
                          type="submit"
                          id="search1"
                        >
                          <i className="fa fa-search"></i>
                          <span className="search-text">
                            {languageTranslation("SEARCH_LABEL")}
                          </span>
                        </Button>
                        <Button className="btn-filter mr-2" id="reset">
                          <i className="fa fa-refresh "></i>
                          <span className="search-text">
                            {languageTranslation("RESET_LABEL")}
                          </span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className="common-content flex-grow-1  p-0 all-invoice">
                <div className="table-minheight invoices-table">
                  <Table bordered hover responsive>
                    <thead className="thead-bg">
                      <tr>
                        <th className="all-invoice-number">
                          {" "}
                          {languageTranslation("NUMBER")}{" "}
                        </th>
                        <th className="all-invoice-facility">
                          {" "}
                          {languageTranslation("FACILITY")}
                        </th>
                        <th className="all-invoice-cancellation-for">
                          {" "}
                          {languageTranslation("CANCELLATION_FOR")}{" "}
                        </th>
                        <th className="all-invoice-canceled-by">
                          {" "}
                          {languageTranslation("CANCELED_BY")}
                        </th>
                        <th className="all-invoice-rchng"> RchngnR. F</th>
                        <th className="all-invoice-date">
                          {languageTranslation("DATE")}
                        </th>
                        <th className="all-invoice-amount">
                          {languageTranslation("AMOUNT")}
                        </th>
                        <th className="all-invoice-posted">
                          {languageTranslation("POSTED")}
                        </th>
                        <th className="all-invoice-sent-mail">
                          {languageTranslation("SENT_MAIL")}
                        </th>

                        <th className="all-invoice-paid">
                          {languageTranslation("PAID")}
                        </th>
                        <th className="all-invoice-remind">
                          {languageTranslation("REMIND")}
                        </th>
                        <th className="all-invoice-reminded">
                          {languageTranslation("REMINDED")}
                        </th>
                        <th className="all-invoice-lawyer">
                          {languageTranslation("LAWYER")}
                        </th>
                        <th className="all-invoice-doudful">
                          {languageTranslation("DOUBTFUL")}
                        </th>
                        <th className="all-invoice-uncollectible">
                          {languageTranslation("UNCOLLECTIBLE")}
                        </th>
                        <th className="all-invoice-still-open">
                          {languageTranslation("STILL_OPEN")}
                        </th>
                        <th className="all-invoice-comment">
                          {languageTranslation("COMMENT")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> 3143156</td>
                        <td> Work at service</td>
                        <td> Testwerk</td>
                        <td> 03.03.2020</td>
                        <td>230004</td>
                        <td>16-09-2013</td>
                        <td>234.02</td>
                        <td>17-09-2013</td>
                        <td></td>
                        <td></td>
                        <td>16-09-2013</td>
                        <td>16-09-2013</td>
                        <td>16-09-2013</td>
                        <td>
                          <span className="checkbox-custom ">
                            <input type="checkbox" id="checkAll" className="" />
                            <label className=""> </label>
                          </span>
                        </td>
                        <td>
                          <span className="checkbox-custom ">
                            <input type="checkbox" id="checkAll" className="" />
                            <label className=""> </label>
                          </span>
                        </td>
                        <td>234.02</td>
                        <td>am 16.00</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div></div>
              </div>
            </CardBody>
          </div>
          <Form className="form-section total-form-section">
            <div className="d-flex flex-wrap total-form-block">
              <Col xs={"12"} sm={"6"} md={"6"} lg={"6"}>
                <FormGroup>
                  <Row className="align-items-center">
                    <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                      <Label className="form-label col-form-label">Total</Label>
                    </Col>
                    <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                      <div className="required-input">
                        <Input
                          type="text"
                          name={"firstName"}
                          placeholder={"Enter Total"}
                          className="text-input text-capitalize"
                        />
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              <Col xs={"12"} sm={"6"} md={"6"} lg={"6"}>
                <FormGroup>
                  <Row className="align-items-center">
                    <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                      <Label className="form-label col-form-label">
                        total selection
                      </Label>
                    </Col>
                    <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                      <div className="required-input">
                        <Input
                          type="text"
                          name={"firstName"}
                          placeholder={"Enter total selection"}
                          className="text-input text-capitalize"
                        />
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </div>
          </Form>
        </div>
      </Card>
    </>
  );
};
export default AllInvoices;
