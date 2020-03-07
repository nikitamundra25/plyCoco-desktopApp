import React, { useState, FunctionComponent } from "react";
import { Button, Table, Form, FormGroup, Input, Label, Row, Col, Card, CardBody,CardHeader } from "reactstrap";
import Select from "react-select";
import logger from "redux-logger";
import { languageTranslation } from "../../../../helpers";
import Search from "../../components/SearchFilter/index";
import { State } from "../../../../config";
import close from "../../../assets/img/cancel.svg";
import closehover from "../../../assets/img/cancel-hover.svg";
import refresh from "../../../assets/img/refresh.svg";
import { FormikHelpers, FormikProps, Formik } from 'formik';
import { RouteComponentProps } from 'react-router';
import { TODO_PAGE_LIMIT, AppRoutes } from '../../../../config';
import "./index.scss"
const AllInvoices: FunctionComponent<RouteComponentProps> & any = (
  mainProps: any
) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  
  return (
  
  <Card>
   
  <div className="common-detail-page">

      <div className="common-detail-section">
  
        <div className="common-sidnav">
          <ul className="common-ul nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active">
                <span className="nav-text text-capitalize">
                  Booking details
              </span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link ">
                <span className="nav-text text-capitalize">
                  Price & working hours
              </span>
              </a>
            </li>
          </ul>
        </div>
      
        <CardBody>
        <div className='filter-form form-section mb-2'>
 
      <Form >
        <Row>
          <Col lg={'3'} md={'3'}>
            <FormGroup>
              <Label for='search' className='col-form-label'>
                {languageTranslation('SEARCH_LABEL')} :
              </Label>
              <Input
                type='text'
                name='searchValue'
                id='search'
                value={"searchValue"}
              />
            </FormGroup>
          </Col>
          <Col lg={'2'} md={'3'}>
                <FormGroup>
                  <Label for='Selectregion' className='col-form-label'>
                    {languageTranslation('STATUS_LABEL')} :
                  </Label>
                  <Select
                    placeholder={languageTranslation('STATUS_PLACEHOLDER')}
                    options={options}
                    isClearable={true}
                    isSearchable={false}
                    classNamePrefix='custom-inner-reactselect'
                    className={'custom-reactselect'}
                  />
                </FormGroup>
              </Col>
          <Col lg={'2'} md={'3'}>
                <FormGroup>
                  <Label for='Selectregion' className='col-form-label'>
                  {languageTranslation('FILTER_BY_STATUS')} :
                  </Label>
                  <Select
                    placeholder={languageTranslation('STATUS_PLACEHOLDER')}
                    options={options}
                    isClearable={true}
                    isSearchable={false}
                    classNamePrefix='custom-inner-reactselect'
                    className={'custom-reactselect'}
                  />
                </FormGroup>
              </Col>
           
              <Col lg={'2'} md={'3'}>
            <div className='label-height'></div>
            <div className='filter-btn-wrap'>
              <Button
                className='btn-filter mr-2'
                type='submit'
                id='search1'
               
              >
          
                <i className='fa fa-search'></i>
                <span className='search-text'>
                  {languageTranslation('SEARCH_LABEL')}
                </span>
              </Button>
              <Button
                className='btn-filter mr-2'
                id='reset'
              
              >
                <i className='fa fa-refresh '></i>
                <span className='search-text'>
                  {languageTranslation('RESET_LABEL')}
                </span>
              </Button>
            </div>
          </Col>

       </Row>
       </Form>
     
       </div>
        <div className="common-content flex-grow-1  p-0 all-invoice">
          <div className="table-minheight ">
            <Table bordered hover responsive>
              <thead className="thead-bg">
                <tr>
                  <th className="all-invoice-number"> {languageTranslation("NUMBER")} </th>
                  <th className="all-invoice-facility"> {languageTranslation("FACILITY")}</th>
                  <th className="all-invoice-cancellation-for"> {languageTranslation("CANCELLATION_FOR")} </th>
                  <th className="all-invoice-canceled-by"> {languageTranslation("CANCELED_BY")}</th>
                  <th className="all-invoice-rchng"> RchngnR. F</th>
                  <th className="all-invoice-date">{languageTranslation("DATE")}</th>
                  <th className="all-invoice-amount">{languageTranslation("AMOUNT")}</th>
                  <th className="all-invoice-posted">{languageTranslation("POSTED")}</th>
                  <th className="all-invoice-sent-mail">{languageTranslation("SENT_MAIL")}</th>

                  <th className="all-invoice-paid">{languageTranslation("PAID")}</th>
                  <th className="all-invoice-remind">{languageTranslation("REMIND")}</th>
                  <th className="all-invoice-reminded">{languageTranslation("REMINDED")}</th>
                  <th className="all-invoice-lawyer">{languageTranslation("LAWYER")}</th>
                  <th className="all-invoice-doudful">{languageTranslation("DOUBTFUL")}</th>
                  <th className="all-invoice-uncollectible">{languageTranslation("UNCOLLECTIBLE")}</th>
                  <th className="all-invoice-still-open">{languageTranslation("STILL_OPEN")}</th>
                  <th className="all-invoice-comment">{languageTranslation("COMMENT")}</th>
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
        </div>
        </CardBody>
      </div>
    </div>
 
    </Card>
  );
};
export default AllInvoices;
