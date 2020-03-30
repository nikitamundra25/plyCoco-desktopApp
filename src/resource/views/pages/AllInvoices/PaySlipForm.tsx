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
import { languageTranslation } from "../../../../helpers";
import refresh from "../../../assets/img/refresh.svg";

import document from "../../../assets/img/header-icons/specialist-invoice.svg";
import { RouteComponentProps } from "react-router";
import showAppointment from "../../../assets/img/header-icons/show-appointment.svg";
import { TODO_PAGE_LIMIT, AppRoutes, InvoiceFilter } from "../../../../config";
import "./index.scss";
import rich from "../../../assets/img/rich.svg";

const PaySlipForm: FunctionComponent<RouteComponentProps> & any = (
  mainProps: any
) => {
  
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
                  {languageTranslation("REFRESH")}
                </span>
              </div>

              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={document} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("DOCUMENT_DISPLAY")}
                </span>
              </div>
              <div className="header-nav-item">
              <span className="header-nav-icon">
                  <img src={rich} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("UNPAID")}
                </span>
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
                        <Input type="text" name="searchValue" id="search" />
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
                <div className="table-minheight payslipform-table">
                  <Table bordered hover responsive>
                    <thead className="thead-bg">
                      <tr>
                        <th className="caregiver-col">{languageTranslation(
                            "MENU_CAREGIVER"
                          )}</th>
                        <th className="file-col">{languageTranslation(
                            "FILE_NAME"
                          )}</th>
                        <th className="date-col">{languageTranslation(
                            "DATE"
                          )}</th>
                        <th className="month-col">{languageTranslation(
                            "BILLING_MONTH"
                          )}</th>
                        <th className="amount-col">{languageTranslation(
                            "AMOUNT"
                          )}</th>
                        <th className="paymentamount-col">{languageTranslation(
                            "PAYMENT_AMOUNT"
                          )}</th>
                        <th className="gross-col">{languageTranslation(
                            "GROSS"
                          )}</th>
                        <th className="type-col">{languageTranslation(
                            "TYPE"
                          )}</th>
                        <th className="paid-col">{languageTranslation(
                            "PAID"
                          )}</th>
                        <th className="visible-col">{languageTranslation(
                            "VISIBLE"
                          )}</th>
                        <th className="comment-col">{languageTranslation(
                            "COMMENT"
                          )}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="careinstitution-col">
                          <Link to="#" className="view-more-link">
                            John Doe
                          </Link>
                        </td>
                        <td className="file-col"><span className="one-line-text">Payslip According to aggreement</span></td>
                        <td className="date-col">12.08.2019</td>
                        <td className="month-col">July 2019</td>
                        <td className="amount-col">685.00</td>
                        <td className="paymentamount-col">Payment Amount</td>
                        <td className="gross-col">1661.66</td>
                        <td className="typ-col"> <span className="one-line-text">Payroll According to BAP</span> </td>
                        <td className="paid-col">05-07-2019</td>
                        <td className="visible-col"> <span className="checkbox-custom ">
                            <input type="checkbox" id="checkAll" className="" />
                            <label className=""> </label>
                          </span></td>
                        <td className="comment-col"><span className="word-wrap">Comment</span></td>
                      </tr>
                      <tr>
                      <td className="careinstitution-col">
                          <Link to="#" className="view-more-link">
                            John Doe
                          </Link>
                        </td>
                        <td className="file-col"><span className="one-line-text">Payslip According to aggreement</span></td>
                        <td className="date-col">12.08.2019</td>
                        <td className="month-col">July 2019</td>
                        <td className="amount-col">685.00</td>
                        <td className="paymentamount-col">Payment Amount</td>
                        <td className="gross-col">1661.66</td>
                        <td className="typ-col"> <span className="one-line-text">Payroll According to BAP</span> </td>
                        <td className="paid-col">05-07-2019</td>
                        <td className="visible-col"> <span className="checkbox-custom ">
                            <input type="checkbox" id="checkAll" className="" />
                            <label className=""> </label>
                          </span></td>
                        <td className="comment-col"><span className="word-wrap">Comment</span></td>
                      </tr>
                      <tr>
                      <td className="careinstitution-col">
                          <Link to="#" className="view-more-link">
                            John Doe
                          </Link>
                        </td>
                        <td className="file-col"><span className="one-line-text">Payslip According to aggreement</span></td>
                        <td className="date-col">12.08.2019</td>
                        <td className="month-col">July 2019</td>
                        <td className="amount-col">685.00</td>
                        <td className="paymentamount-col">Payment Amount</td>
                        <td className="gross-col">1661.66</td>
                        <td className="typ-col"> <span className="one-line-text">Payroll According to BAP</span> </td>
                        <td className="paid-col">05-07-2019</td>
                        <td className="visible-col"> <span className="checkbox-custom ">
                            <input type="checkbox" id="checkAll" className="" />
                            <label className=""> </label>
                          </span></td>
                        <td className="comment-col"><span className="word-wrap">Comment</span></td>
                      </tr>
                      <tr>
                      <td className="careinstitution-col">
                          <Link to="#" className="view-more-link">
                            John Doe
                          </Link>
                        </td>
                        <td className="file-col"><span className="one-line-text">Payslip According to aggreement</span></td>
                        <td className="date-col">12.08.2019</td>
                        <td className="month-col">July 2019</td>
                        <td className="amount-col">685.00</td>
                        <td className="paymentamount-col">Payment Amount</td>
                        <td className="gross-col">1661.66</td>
                        <td className="typ-col"> <span className="one-line-text">Payroll According to BAP</span> </td>
                        <td className="paid-col">05-07-2019</td>
                        <td className="visible-col"> <span className="checkbox-custom ">
                            <input type="checkbox" id="checkAll" className="" />
                            <label className=""> </label>
                          </span></td>
                        <td className="comment-col"><span className="word-wrap">Comment</span></td>
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
export default PaySlipForm;
