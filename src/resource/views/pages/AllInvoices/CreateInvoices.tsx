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
import appendToPlycoco from "../../../assets/img/header-icons/tab-icons/append-to-plycoco.svg";
import attachReminder from "../../../assets/img/header-icons/tab-icons/attach-reminder.svg";
import AttachSpeacilistInvoice from "../../../assets/img/header-icons/tab-icons/attach-speacilist-invoice.svg";
import clear from "../../../assets/img/header-icons/tab-icons/clear.svg";

import edit from "../../../assets/img/header-icons/tab-icons/edit.svg";
import pen from "../../../assets/img/header-icons/pen.svg";
import paperclip from "../../../assets/img/header-icons/tab-icons/paperclip.svg";
import CompleteTime from "../../../assets/img/header-icons/tab-icons/complete-time.svg";
import idea from "../../../assets/img/header-icons/tab-icons/idea.svg";
import weekly from "../../../assets/img/header-icons/tab-icons/weekly.svg";
import everySixMonths from "../../../assets/img/header-icons/tab-icons/every-six-months.svg";
import massege from "../../../assets/img/header-icons/tab-icons/massege.svg";
import monthCalendar from "../../../assets/img/header-icons/tab-icons/month-calendar.svg";
import sendLawyer from "../../../assets/img/header-icons/tab-icons/send-lawyer.svg";
import sendReminder from "../../../assets/img/header-icons/tab-icons/send-reminder.svg";
import showReminder from "../../../assets/img/header-icons/tab-icons/show-reminder.svg";
import taxConsultant from "../../../assets/img/header-icons/tab-icons/tax-consultant.svg";
import uploadReminder from "../../../assets/img/header-icons/tab-icons/upload-reminder.svg";
import vicantPosition from "../../../assets/img/header-icons/tab-icons/vicant-position.svg";
import createReminder from "../../../assets/img/header-icons/tab-icons/create-reminder.svg";
import { FormikHelpers, FormikProps, Formik } from "formik";
import { RouteComponentProps } from "react-router";
import showAppointment from "../../../assets/img/header-icons/show-appointment.svg";
import { TODO_PAGE_LIMIT, AppRoutes } from "../../../../config";
import "./index.scss";
import filter from "../../../assets/img/filter.svg";

const CreateInvoice: FunctionComponent<RouteComponentProps> & any = (
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
            <div className="common-topheader d-flex  px-2 mb-1">
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={refresh} alt="" />
                </span>
                <span className="header-nav-text">Refresh</span>
              </div>

              <div className="user-select mx-1 ">
                <Select
                  classNamePrefix="custom-inner-reactselect"
                  className={"custom-reactselect "}
                  placeholder="Maiwald Jacqueline"
                  options={options}
                  isClearable={true}
                />
              </div>
              <div className="user-select mx-1 ">
                <Select
                  classNamePrefix="custom-inner-reactselect"
                  className={"custom-reactselect "}
                  placeholder="Nursing service at Treptower Park"
                  options={options}
                  isClearable={true}
                />
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={pen} alt="" />
                </span>
                <span className="header-nav-text">Create</span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={CompleteTime} alt="" />
                </span>
                <span className="header-nav-text">Times completely</span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={idea} alt="" />
                </span>
                <span className="header-nav-text">Create all specialist</span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={massege} alt="" />
                </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={monthCalendar} alt="" />
                </span>
                <span className="header-nav-text">Weekly</span>
              </div>

              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={monthCalendar} alt="" />
                </span>
                <span className="header-nav-text">Every six months</span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={monthCalendar} alt="" />
                </span>
                <span className="header-nav-text">Per month</span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={monthCalendar} alt="" />
                </span>
                <span className="header-nav-text">All</span>
              </div>
              <div className="user-select mx-1 ">
                <Select
                  classNamePrefix="custom-inner-reactselect"
                  className={"custom-reactselect "}
                  placeholder="Nursing service at Treptower Park"
                  options={options}
                  isClearable={true}
                />
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
                        <th className="all-invoice-number">Nr</th>
                        <th className="all-invoice-facility"> ID</th>
                        <th className="all-invoice-cancellation-for"> H</th>
                        <th className="all-invoice-canceled-by"> Text</th>
                        <th className="all-invoice-rchng">Beginning</th>
                        <th className="all-invoice-date">The End</th>
                        <th className="all-invoice-amount">End of beginning</th>
                        <th className="all-invoice-posted">Price</th>
                        <th className="all-invoice-sent-mail">Night</th>
                        <th className="all-invoice-paid">Night</th>
                        <th className="all-invoice-remind">We</th>
                        <th className="all-invoice-reminded">We</th>
                        <th className="all-invoice-lawyer">Celebration</th>
                        <th className="all-invoice-doudful">Celebration</th>
                        <th className="all-invoice-uncollectible">KM</th>
                        <th className="all-invoice-still-open">
                          {languageTranslation("STILL_OPEN")}
                        </th>
                        <th className="all-invoice-comment">expenses</th>
                        <th className="all-invoice-comment">overall</th>
                        <th className="all-invoice-comment">Provide</th>
                        <th className="all-invoice-comment">total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="checkbox-th-column text-center">
                          <span className=" checkbox-custom ">
                            <input
                              type="checkbox"
                              id="check"
                              className=""
                              name={"status"}
                              // checked={"true"}
                            />
                            <label className=""> </label>
                          </span>
                        </td>
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
export default CreateInvoice;
