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
import { Link } from 'react-router-dom';
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
import paperclip from "../../../assets/img/header-icons/tab-icons/paperclip.svg";
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
import {  StatusOptions, SortOptions } from "../../../../config";
import "./index.scss";
import filter from "../../../assets/img/filter.svg";

const InvoiceSolona: FunctionComponent<RouteComponentProps> & any = (
  mainProps: any
) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
  ];
  const [tabChange, setTabChange] = useState(1);
  const tabChangehandler = (currentTab: any) => {
    setTabChange(currentTab)
  }
  return (
    <>
      <Card>
        <div className="common-detail-page">
          <div className="common-detail-section">
            <div className="common-sidnav">
              <Nav className="common-ul" tabs>
                <li className="nav-item">
                  <a
                    className={`nav-link ${tabChange == 1 ? "active" : ""}`}
                    onClick={() => tabChangehandler(1)}>
                    <span className="nav-text text-capitalize">
                      General
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${tabChange == 2 ? "active" : ""}`}
                    onClick={() => tabChangehandler(2)}>
                    <span className="nav-text text-capitalize">
                      Dunning and export
                    </span>
                  </a>
                </li>
              </Nav>
            </div>
            {tabChange == 1 ?
              <div className="common-topheader d-flex  px-2 mb-1">

                <div className="header-nav-colmn-items">
                  <div className="header-nav-heading mx-1">Filter</div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={refresh} alt="" />
                    </span>
                    <span className="header-nav-text">
                      {languageTranslation("REFRESH")}
                    </span>
                  </div>
                  <div className="header-nav-item ">
                    <span className="header-nav-text">Offer</span>
                  </div>
                  <div className="header-nav-item ">
                    <span className="header-nav-text">Not sent</span>
                  </div>
                </div>
                <div className="header-nav-colmn-items">
                  <div className="header-nav-heading mx-1"></div>

                  <div className="user-select mx-1 ">
                    <Select
                      classNamePrefix="custom-inner-reactselect"
                      className={"custom-reactselect "}
                      placeholder="Facilities"
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
                  <div className="header-nav-heading mx-1">View Invoice PDFs</div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={PlyCocoreceipt} alt="" />
                    </span>
                    <span className="header-nav-text">show receipt</span>
                  </div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={SpecialistInvoice} alt="" />
                    </span>
                    <span className="header-nav-text">
                      Save invoice
               </span>
                  </div>
                </div>
                <div className="header-nav-colmn-items">
                  <div className="header-nav-heading mx-1">Sent &amp; Unsent</div>
                  <div className="header-nav-item">
                    <span className="header-nav-icon">
                      <img src={Again} alt="" />
                    </span>
                    <span className="header-nav-text">send again</span>
                  </div>
                  <div className="header-nav-item">
                    <span className="header-nav-text">Sent today</span>
                  </div>
                  <div className="header-nav-item">
                    <span className="header-nav-text">Unsent</span>
                  </div>
                </div>
                <div className="header-nav-colmn-items">
                  <div className="header-nav-heading mx-1">Paid &amp; Unpaid</div>

                  <div className="header-nav-item">
                    <span className="header-nav-icon">
                      <img src={paid} alt="" />
                    </span>
                    <span className="header-nav-text">Paid on</span>
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
                    <span className="header-nav-text">Furnishing profile</span>
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
                    <span className="header-nav-text">Solo setup</span>
                  </div>
                  <div className="header-nav-item">
                    <span className="header-nav-text">Release</span>
                  </div>
                </div>
              </div>
              :

              <div className="common-topheader d-flex  px-2 mb-1">
                <div className="header-nav-colmn-items">
                  <div className="header-nav-heading mx-1">Reminders</div>
                  <div className="header-nav-item">
                    <span className="header-nav-icon">
                      <img src={sendReminder} alt="" />
                    </span>
                    <span className="header-nav-text">Send reminder</span>
                  </div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={createReminder} alt="" />
                    </span>
                    <span className="header-nav-text">Create a reminder</span>
                  </div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={showReminder} alt="" />
                    </span>
                    <span className="header-nav-text">Show reminder</span>
                  </div>
                </div>
                <div className="header-nav-colmn-items">
                  <div className="header-nav-heading mx-1">Warning</div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={uploadReminder} alt="" />
                    </span>
                    <span className="header-nav-text">Upload reminder</span>
                  </div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={attachReminder} alt="" />
                    </span>
                    <span className="header-nav-text">attach reminder</span>
                  </div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={sendLawyer} alt="" />
                    </span>
                    <span className="header-nav-text">Send to lawyer</span>
                  </div>
                </div>
                <div className="header-nav-colmn-items">
                  <div className="header-nav-heading mx-1">Export</div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={taxConsultant} alt="" />
                    </span>
                    <span className="header-nav-text">Tax consultant</span>
                  </div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={vicantPosition} alt="" />
                    </span>
                    <span className="header-nav-text">Vacant positions</span>
                  </div>
                </div>
                <div className="header-nav-colmn-items">
                  <div className="header-nav-heading mx-1">Invoices</div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={SpecialistInvoice} alt="" />
                    </span>
                    <span className="header-nav-text">Create new invoice</span>
                  </div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={SpecialistInvoice} alt="" />
                    </span>
                    <span className="header-nav-text">
                      Create cancellation invoice
     </span>
                  </div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={Again} alt="" />
                    </span>
                    <span className="header-nav-text">Bill again</span>
                  </div>
                </div>
                <div className="header-nav-colmn-items">
                  <div className="header-nav-heading mx-1"></div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={Again} alt="" />
                    </span>
                    <span className="header-nav-text">
                      Append order number Plycoco
     </span>
                  </div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={Again} alt="" />
                    </span>
                    <span className="header-nav-text">
                      Append order number specialist
     </span>
                  </div>
                </div>
                <div className="header-nav-colmn-items">
                  <div className="header-nav-heading mx-1">Other tool</div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={edit} alt="" />
                    </span>
                    <span className="header-nav-text">To edit</span>
                  </div>
                  <div className="header-nav-item ">
                    <span className="header-nav-icon">
                      <img src={clear} alt="" />
                    </span>
                    <span className="header-nav-text">Clear</span>
                  </div>
                </div>
              </div>

            }

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
                         
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={"2"} md={"3"}>
                      <FormGroup>
                        <Label for="Selectregion" className="col-form-label">
                          {languageTranslation("SORTBY_LABEL")} :
                        </Label>
                        <Select
                          placeholder={languageTranslation(
                            "SORTBY_PLACEHOLDER"
                          )}
                          options={SortOptions}
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
                          {languageTranslation("STATUS_LABEL")} :
                        </Label>
                        <Select
                          placeholder={languageTranslation(
                            "STATUS_PLACEHOLDER"
                          )}
                          options={StatusOptions}
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
                        <th className="invoiceid-col">
                          {" "}
                          {languageTranslation("NUMBER")}{" "}
                        </th>
                        <th className="careinstitution-col">{languageTranslation("MENU_INSTITUTION")}</th>
                        <th className="caregiver-col">
                          {" "}
                          {languageTranslation("MENU_CAREGIVER")}
                        </th>
                        <th className="cancel-col">
                          {" "}
                          {languageTranslation("CANCELLATION_FOR")}{" "}
                        </th>
                        <th className="cancel-col">
                          {" "}
                          {languageTranslation("CANCELED_BY")}
                        </th>
                        <th className="invoiceid-col"> {languageTranslation("INVOICE_NUMBER_F")}</th>
                        <th className="date-col">
                          {languageTranslation("DATE")}
                        </th>
                        <th className="amount-col">
                          {languageTranslation("AMOUNT")}
                        </th>
                        <th className="date-col">
                          {languageTranslation("POST")}
                        </th>
                        <th className="date-col">
                          {languageTranslation("SENT_POST")}
                        </th>

                        <th className="date-col">
                          {languageTranslation("PAID")}
                        </th>
                        <th className="date-col">
                          {languageTranslation("REMIND")}
                        </th>
                        <th className="date-col">
                          {languageTranslation("REMINDED")}
                        </th>
                        <th className="date-col">
                          {languageTranslation("LAWYER")}
                        </th>
                        <th className="checkbox-col">
                          {languageTranslation("DOUBTFUL")}
                        </th>
                        <th className="checkbox-col">
                          {languageTranslation("IRRECOVERABLE")}
                        </th>
                        <th className="amount-col">
                          {languageTranslation("COST")}
                        </th>
                        <th className="amount-col">
                          {languageTranslation("SALARY_AMOUNT")}
                        </th>
                        <th className="amount-col">
                          {languageTranslation("STILL_OPEN")}
                        </th>
                        <th className="comment-col">
                          {languageTranslation("COMMENT")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="invoiceid-col"> 230004</td>
                        <td className="careinstitution-col"> <Link to="#" className="view-more-link">John Doe</Link></td>
                        <td className="caregiver-col"> <Link to="#" className="view-more-link">Testwerk</Link></td>
                        <td className="cancel-col"></td>
                        <td className="cancel-col"></td>
                        <td className="invoiceid-col">230005</td>
                        <td className="date-col">16-09-2013</td>
                        <td className="amount-col">234.02</td>
                        <td className="date-col">17-09-2013</td>
                        <td className="date-col"></td>
                         <td className="date-col"></td>
                        <td className="date-col">16-09-2013</td>
                        <td className="date-col">16-09-2013</td>
                        <td className="date-col">16-09-2013</td>
                        <td className="checkbox-col">
                          <span className="checkbox-custom ">
                            <input type="checkbox" id="checkAll" className="" />
                            <label className=""> </label>
                          </span>
                        </td>
                        <td className="checkbox-col">
                          <span className="checkbox-custom ">
                            <input type="checkbox" id="checkAll" className="" />
                            <label className=""> </label>
                          </span>
                        </td>
                        <td className="amount-col">234.02</td>
                        <td className="amount-col">234.02</td>
                        <td className="amount-col">234.02</td>
                        
                        <td className="comment-col"><span className="word-wrap">am 16.00</span></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                
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
                        Total selection
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
export default InvoiceSolona;
