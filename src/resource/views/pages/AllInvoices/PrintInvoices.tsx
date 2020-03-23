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
import refresh from "../../../assets/img/refresh.svg";

import printer from "../../../assets/img/printer.svg";

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
                <span className="header-nav-text">
                  {languageTranslation("REFRESH")}
                </span>
              </div>

              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={printer} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("PRINT")}
                </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-text">
                  {languageTranslation("ONLY_COMPLETE")}
                </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-text">
                  {languageTranslation("ALL_PER_POST_IN_PDF")}
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
                          <Link to="#" className="view-more-link">
                            Careinstitution
                          </Link>
                        </td>
                        <td className="open-col">18</td>
                        <td className="type-col">per email mit DLN</td>
                      </tr>
                      <tr>
                        <td className="careinstitution-col">
                          <Link to="#" className="view-more-link">
                            Careinstitution
                          </Link>
                        </td>
                        <td className="open-col">18</td>
                        <td className="type-col">per post mit DLN</td>
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
