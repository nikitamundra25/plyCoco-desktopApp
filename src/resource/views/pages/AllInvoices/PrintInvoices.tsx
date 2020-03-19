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
import { Link } from "react-router-dom";
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
import { TODO_PAGE_LIMIT, AppRoutes, InvoiceFilter } from "../../../../config";
import "./index.scss";
import filter from "../../../assets/img/filter.svg";

const PrintInvoice: FunctionComponent<RouteComponentProps> & any = (
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
                        <Label className="col-form-label">
                          {languageTranslation("STATUS_LABEL")} :
                        </Label>
                        <Select
                          placeholder={languageTranslation(
                            "STATUS_PLACEHOLDER"
                          )}
                          options={InvoiceFilter}
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
                        <th className="careinstitution-col">Careinstitution</th>
                        <th className="open-col">Open</th>
                        <th className="type-col">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="careinstitution-col">
                          <Link to="" className="view-more-link">
                            Careinstitution
                          </Link>
                        </td>
                        <td className="open-col">18</td>
                        <td className="type-col">per email mit DLn</td>
                      </tr>
                      <tr>
                        <td className="careinstitution-col">
                          <Link to="" className="view-more-link">
                            Careinstitution
                          </Link>
                        </td>
                        <td className="open-col">18</td>
                        <td className="type-col">per post mit DLn</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </CardBody>
          </div>
        </div>
      </Card>
    </>
  );
};
export default PrintInvoice;
