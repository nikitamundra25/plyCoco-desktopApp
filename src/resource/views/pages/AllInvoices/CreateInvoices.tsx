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
  Nav,
  UncontrolledTooltip,
} from "reactstrap";
import Select from "react-select";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { languageTranslation } from "../../../../helpers";
import refresh from "../../../assets/img/refresh.svg";

import pen from "../../../assets/img/header-icons/pen.svg";
import CompleteTime from "../../../assets/img/header-icons/tab-icons/complete-time.svg";
import idea from "../../../assets/img/header-icons/tab-icons/idea.svg";
import massege from "../../../assets/img/header-icons/tab-icons/massege.svg";

import { RouteComponentProps } from "react-router";
import "./index.scss";
import right_arrow from "../../../assets/img/rightarrow.svg";
import left_arrow from "../../../assets/img/leftarrow.svg";
import "react-day-picker/lib/style.css";
import {
  InvoiceSummaryFilter,
  StatusOptions,
  SortOptions,
} from "../../../../config";

const CreateInvoice: FunctionComponent<RouteComponentProps> & any = (
  mainProps: any
) => {
  
  return (
    <>
      <div className="common-detail-page">
        <div className="common-detail-section">
          <div className="common-topheader d-flex  px-2 pb-1 invoice-header">
            <div className="header-nav-item">
              <span className="header-nav-icon">
                <i className="fa fa-refresh "></i>
              </span>
              <span className="header-nav-text">
                {languageTranslation("RESET_LABEL")}
              </span>
            </div>

            <div className="user-select mx-1 ">
              <Select
                classNamePrefix="custom-inner-reactselect"
                className={"custom-reactselect "}
                placeholder="Maiwald Jacqueline"
                // options={options}
                isClearable={true}
              />
            </div>
            <div className="user-select mx-1 ">
              <Select
                classNamePrefix="custom-inner-reactselect"
                className={"custom-reactselect "}
                placeholder="Maiwald Jacqueline"
                // options={options}
                isClearable={true}
              />
            </div>
            <div className="user-select mx-1 ">
              <Select
                classNamePrefix="custom-inner-reactselect"
                className={"custom-reactselect "}
                placeholder="Nursing service at Treptower Park"
                // options={options}
                isClearable={true}
              />
            </div>
            <div className="header-nav-item">
              <span className="header-nav-icon">
                <img src={pen} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("CREATE")}
              </span>
            </div>
            <div className="header-nav-item">
              <span className="header-nav-icon">
                <img src={CompleteTime} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("TIMELY_COMPLETELY")}
              </span>
            </div>
            <div className="header-nav-item">
              <span className="header-nav-icon">
                <img src={idea} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("CREATE_ALL_CAREGIVER")}
              </span>
            </div>
            <div className="header-nav-item">
              <span className="header-nav-icon pr-0">
                <img src={massege} alt="" />
              </span>
            </div>
            <div className="user-select mx-1 ">
              <Select
                classNamePrefix="custom-inner-reactselect"
                className={"custom-reactselect "}
                placeholder="Select Month Summary"
                options={InvoiceSummaryFilter}
                isClearable={true}
              />
            </div>

            {/* <div className="user-select mx-1 ">
              <Select
                classNamePrefix="custom-inner-reactselect"
                className={"custom-reactselect "}
                placeholder="Nursing service at Treptower Park"
                // options={options}
                isClearable={true}
              />
            </div> */}
            <div className="header-nav-item">
              <span className="header-nav-icon pr-0">
                <img src={left_arrow} alt="" />
              </span>
            </div>
            <div className="common-header-input pr-1">
              <DayPickerInput />
            </div>
            <div className="header-nav-item">
              <span className="header-nav-icon pr-0">
                <img src={right_arrow} alt="" />
              </span>
            </div>
          </div>
          <div className="common-content flex-grow-1">
            <div className="common-content flex-grow-1  p-0 all-invoice">
              <div className="table-minheight createinvoices-table">
                <Table bordered hover responsive>
                  <thead className="thead-bg">
                    <tr>
                      <th className="sno-col">{languageTranslation("S_NO")}</th>
                      <th className="invoiceid-col">
                        {" "}
                        {languageTranslation("ID")}
                      </th>
                      <th className="h-col">h</th>
                      <th className="text-col">
                        {" "}
                        {languageTranslation("TEXT")}
                      </th>
                      <th className="datetime-col">
                        {languageTranslation("BEGIN")}
                      </th>
                      <th className="datetime-col">
                        {languageTranslation("THE_END")}
                      </th>
                      <th className="datetime-col">
                        {languageTranslation("BREAK")}{" "}
                        {languageTranslation("BEGIN")}
                      </th>
                      <th className="datetime-col">
                        {languageTranslation("BREAK")}{" "}
                        {languageTranslation("END")}
                      </th>
                      <th className="price-col">
                        {" "}
                        {languageTranslation("PRICE")}
                      </th>
                      <th className="price-col">
                        {languageTranslation("NIGHT")}
                      </th>
                      <th className="price-col">
                        {languageTranslation("NIGHT")}
                      </th>
                      <th className="price-col">
                        {languageTranslation("WEEKEND")}
                      </th>
                      <th className="price-col">
                        {languageTranslation("WEEKEND")}
                      </th>
                      <th className="price-col">
                        {languageTranslation("HOLIDAY")}
                      </th>
                      <th className="price-col">
                        {languageTranslation("HOLIDAY")}
                      </th>
                      <th className="price-col">
                        {" "}
                        {languageTranslation("KM")}
                      </th>
                      <th className="price-col">
                        {languageTranslation("KM_PRICE")}
                      </th>
                      <th className="price-col">
                        {languageTranslation("EXPENSES")}
                      </th>
                      <th className="price-col">
                        {languageTranslation("TOTAL")}
                      </th>
                      <th className="price-col">
                        {languageTranslation("COMMISSION")}
                      </th>
                      <th className="price-col">
                        {languageTranslation("TOTAL")}
                      </th>
                      <th className={"text-center action-col"}>
                        {languageTranslation("TABEL_HEAD_CG_ACTION")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="sno-col">
                      <td className="checkbox-th-column text-center">
                        <span className=" checkbox-custom pl-4">
                          <input
                            type="checkbox"
                            id="check"
                            className=""
                            name={"status"}
                            // checked={"true"}
                          />
                          <label className="">1</label>
                        </span>
                      </td>
                      <td className="invoiceid-col"> 5465465</td>
                      <td className="h-col"> 12.00</td>

                      <td className="text-col">WG in leipzig</td>
                      <td className="datetime-col">Mon 03.03.2020 19:00</td>
                      <td className="datetime-col">Mon 03.03.2020 19:00</td>
                      <td className="datetime-col">Mon 03.03.2020 19:00</td>
                      <td className="datetime-col">Mon 03.03.2020 19:00</td>
                      <td className="price-col">3,200.00 &euro;</td>
                      <td className="price-col">00.00 &euro;</td>
                      <td className="price-col">00.00 &euro;</td>
                      <td className="price-col">00.00 &euro;</td>
                      <td className="price-col">00.00 &euro;</td>
                      <td className="price-col">00.00 &euro;</td>
                      <td className="price-col">00.00 &euro;</td>
                      <td className="price-col">00.00 </td>
                      <td className="price-col">00.30 &euro;</td>
                      <td className="price-col">00.00 &euro;</td>
                      <td className="price-col">384.00 &euro;</td>
                      <td className="price-col">384.00 &euro;</td>
                      <td className="price-col">34584.00 &euro;</td>
                      <td className="action-col">
                        <div className="action-btn">
                          <span className="btn-icon mr-2" id={`viewcaregiver`}>
                            <UncontrolledTooltip
                              placement="top"
                              target={`viewcaregiver`}
                            >
                              View Caregiver Profile
                            </UncontrolledTooltip>
                            <i className="fa fa-eye"></i>
                          </span>
                          <span
                            className="btn-icon mr-2"
                            id={`viewcareinstitution`}
                          >
                            <UncontrolledTooltip
                              placement="top"
                              target={`viewcareinstitution`}
                            >
                              View Care Institution Profile
                            </UncontrolledTooltip>
                            <i className="fa fa-eye"></i>
                          </span>
                          <span
                            className="btn-icon mr-2"
                            id={`appointmentdetails`}
                          >
                            <UncontrolledTooltip
                              placement="top"
                              target={`appointmentdetails`}
                            >
                              Show Appointment Details
                            </UncontrolledTooltip>
                            <i className="fa fa-calendar"></i>
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <Form className="form-section total-form-section bg-white">
                <div className="d-flex flex-wrap total-form-block">
                  <Col xs={"12"} sm={"6"} md={"6"} lg={"6"}>
                    <FormGroup>
                      <Row className="align-items-center">
                        <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                          <Label className="form-label col-form-label">
                            Total
                          </Label>
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
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateInvoice;
