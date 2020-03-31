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
  UncontrolledTooltip
} from "reactstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import { languageTranslation } from "../../../../helpers";
import refresh from "../../../assets/img/refresh.svg";

import document from "../../../assets/img/header-icons/specialist-invoice.svg";
import { RouteComponentProps } from "react-router";
import showAppointment from "../../../assets/img/header-icons/show-appointment.svg";
import {  StatusOptions, SortOptions } from "../../../../config";
import "./index.scss";
import rich from "../../../assets/img/rich.svg";

const HealthInsuranceForm: FunctionComponent<RouteComponentProps> & any = (
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
                      <Label for="Selectregion" className="col-form-label">
                        {languageTranslation("SORTBY_LABEL")} :
                      </Label>
                      <Select
                        placeholder={languageTranslation("SORTBY_PLACEHOLDER")}
                        options={SortOptions}
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
                <div className="table-minheight healthinsuraceform-table">
                  <Table bordered hover responsive>
                    <thead className="thead-bg">
                      <tr>
                        <th className="name-col">{languageTranslation(
                            "NAME"
                          )}</th>
                        <th className="sepa-col">{languageTranslation(
                            "SEPA"
                          )}</th>
                        
                        <th className={'text-center action-col'}>
                      {languageTranslation('TABEL_HEAD_CG_ACTION')}
                    </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="name-col">
                         
                            John Doe
                          
                        </td>
                       
                        <td className="sepa-col"> <span className="checkbox-custom ">
                            <input type="checkbox" id="checkAll" className="" />
                            <label className=""> </label>
                          </span></td>
                          <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`edit`}>
                        <UncontrolledTooltip placement="top" target={`edit`}>
                          Edit
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      </div>
                      </td>
                      </tr>
                      <tr>
                      <td className="name-col">
                         
                         John Doe
                       
                     </td>
                    
                     <td className="sepa-col"> <span className="checkbox-custom ">
                         <input type="checkbox" id="checkAll" className="" />
                         <label className=""> </label>
                       </span></td>
                       <td className="action-col">
                 <div className="action-btn">
                   <span className="btn-icon mr-2" id={`edit`}>
                     <UncontrolledTooltip placement="top" target={`edit`}>
                       Edit
                     </UncontrolledTooltip>
                     <i className="fa fa-pencil"></i>
                   </span>
                   </div>
                   </td>
                      </tr> <tr>
                      <td className="name-col">
                         
                         John Doe
                       
                     </td>
                    
                     <td className="sepa-col"> <span className="checkbox-custom ">
                         <input type="checkbox" id="checkAll" className="" />
                         <label className=""> </label>
                       </span></td>
                       <td className="action-col">
                 <div className="action-btn">
                   <span className="btn-icon mr-2" id={`edit`}>
                     <UncontrolledTooltip placement="top" target={`edit`}>
                       Edit
                     </UncontrolledTooltip>
                     <i className="fa fa-pencil"></i>
                   </span>
                   </div>
                   </td>
                      </tr> <tr>
                      <td className="name-col">
                         
                         John Doe
                       
                     </td>
                    
                     <td className="sepa-col"> <span className="checkbox-custom ">
                         <input type="checkbox" id="checkAll" className="" />
                         <label className=""> </label>
                       </span></td>
                       <td className="action-col">
                 <div className="action-btn">
                   <span className="btn-icon mr-2" id={`edit`}>
                     <UncontrolledTooltip placement="top" target={`edit`}>
                       Edit
                     </UncontrolledTooltip>
                     <i className="fa fa-pencil"></i>
                   </span>
                   </div>
                   </td>
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
export default HealthInsuranceForm;
