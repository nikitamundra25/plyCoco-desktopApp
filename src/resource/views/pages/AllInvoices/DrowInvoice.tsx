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
import "../Appointment/index.scss";
import filter from "../../../assets/img/filter.svg";

const DrowInvoice: FunctionComponent<RouteComponentProps> & any = (
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
                <span className="header-nav-text">
                  Refresh
                  </span>
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
                <span className="header-nav-text">
                  Create
                  </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={CompleteTime} alt="" />
                </span>
                <span className="header-nav-text">
                  Times completely
                  </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={idea} alt="" />
                </span>
                <span className="header-nav-text">
                  Create all specialist
                  </span>
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
                <span className="header-nav-text">
                  Weekly
                  </span>
              </div>

              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={monthCalendar} alt="" />
                </span>
                <span className="header-nav-text">
                  Every six months
                  </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={monthCalendar} alt="" />
                </span>
                <span className="header-nav-text">
                  Per month
                  </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={monthCalendar} alt="" />
                </span>
                <span className="header-nav-text">
                  All
                  </span>
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
              <div>
              <Row>
                <Col lg={"6"}>
                  <div className="calender-section custom-scrollbar">
                    <div className="custom-appointment-calendar">
                      <div className="custom-appointment-calendar-head">
                        <div className="custom-appointment-row ">
                        <div className='thead-sticky name-col custom-appointment-col '>
                          <div className='all-star-wrap'>
                            <div className='position-relative username-col align-self-center'>
                              <div className='calender-heading'>Caregiver</div>
                              <Button
                               
                                className='btn-more d-flex align-items-center justify-content-center'
                              >
                                <i className='icon-options-vertical' />
                              </Button>
                            </div>

                            <div className='thead-sticky h-col custom-appointment-col text-center'>
                              H
                            </div>
                            <div className='thead-sticky s-col custom-appointment-col text-center'>
                              S
                            </div>
                            <div className='thead-sticky u-col custom-appointment-col text-center'>
                              U
                            </div>
                            <div className='thead-sticky v-col custom-appointment-col text-center'>
                              V
                            </div>
                          </div>
                        </div>
                         
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              1
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              2
                            </div>
                            <div className="custom-appointment-calendar-day">
                              MON
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              3
                            </div>
                            <div className="custom-appointment-calendar-day">
                              TUE
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              4
                            </div>
                            <div className="custom-appointment-calendar-day">
                              WED
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              5
                            </div>
                            <div className="custom-appointment-calendar-day">
                              THU
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              6
                            </div>
                            <div className="custom-appointment-calendar-day">
                              Fri
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              7
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SAT
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              8
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              9
                            </div>
                            <div className="custom-appointment-calendar-day">
                              MON
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              10
                            </div>
                            <div className="custom-appointment-calendar-day">
                              TUE
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              11
                            </div>
                            <div className="custom-appointment-calendar-day">
                              WED
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              12
                            </div>
                            <div className="custom-appointment-calendar-day">
                              THU
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              13
                            </div>
                            <div className="custom-appointment-calendar-day">
                              FRI
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              14
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SAT
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              15
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              16
                            </div>
                            <div className="custom-appointment-calendar-day">
                              MON
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              17
                            </div>
                            <div className="custom-appointment-calendar-day">
                              TUE
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              18
                            </div>
                            <div className="custom-appointment-calendar-day">
                              WED
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              19
                            </div>
                            <div className="custom-appointment-calendar-day">
                              THU
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              20
                            </div>
                            <div className="custom-appointment-calendar-day">
                              FRI
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              21
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SAT
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              22
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              23
                            </div>
                            <div className="custom-appointment-calendar-day">
                              MON
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              24
                            </div>
                            <div className="custom-appointment-calendar-day">
                              TUE
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              25
                            </div>
                            <div className="custom-appointment-calendar-day">
                              WED
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              26
                            </div>
                            <div className="custom-appointment-calendar-day">
                              THU
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              27
                            </div>
                            <div className="custom-appointment-calendar-day">
                              FRI
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              28
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SAT
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              29
                            </div>
                            <div className="custom-appointment-calendar-day">
                              SUN
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              30
                            </div>
                            <div className="custom-appointment-calendar-day">
                              MON
                            </div>
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            <div className="custom-appointment-calendar-date">
                              31
                            </div>
                            <div className="custom-appointment-calendar-day">
                              TUE
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="custom-appointment-calendar-body">
                        <div className="custom-appointment-row">
                        
                                <div className='name-col custom-appointment-col thead-sticky'>
                                  <div className='all-star-wrap'>
                                    <div
                                     
                                      
                                    >
                                     
                                        john doe
                                      
                                    </div>
                                    <div className='h-col custom-appointment-col text-center'></div>
                                    <div
                                      className='s-col custom-appointment-col text-center cursor-pointer'
                                      
                                    >
                                      
                                        <i className='fa fa-star-o' />
                                      
                                    </div>
                                    <div
                                      className='u-col custom-appointment-col text-center cursor-pointer'
                                      >
                                        <i className='fa fa-star-o' />
                                      
                                    </div>
                                    <div
                                      className='v-col custom-appointment-col text-center cursor-pointer'
                                      
                                    >
                                      <i className='fa fa-arrow-down' />
                                    </div>
                                  </div>
                                </div>
                                <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                           
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                           
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                           
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                           
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                           
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          <div className="custom-appointment-col calender-col text-center">
                            
                          </div>
                          </div>
                          </div>
                          </div>
                          </div>
                          </Col>
                          </Row>
                          </div>
              </div>
            </CardBody>
          </div>
         
        </div>
      </Card>
    </>
  );
};
export default DrowInvoice;
