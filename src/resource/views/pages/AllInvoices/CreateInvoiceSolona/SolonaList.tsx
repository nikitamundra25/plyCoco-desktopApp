import React, { useState, FunctionComponent } from 'react';
import {
  Button,
  Table,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  CardBody,
} from 'reactstrap';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { languageTranslation } from '../../../../../helpers';
import { RouteComponentProps } from 'react-router';
import {
  StatusOptions,
  SortOptions,
  defaultDateFormat,
} from '../../../../../config';
import '.././index.scss';
import moment from 'moment';

const SolonaList: FunctionComponent<RouteComponentProps> & any = (
  props: any
) => {
  const { invoiceList } = props;
  console.log('invoiceList in form', invoiceList);

  return (
    <CardBody>
      <div className='filter-form form-section mb-2'>
        <Form>
          <Row>
            <Col lg={'3'} md={'3'}>
              <FormGroup>
                <Label for='search' className='col-form-label'>
                  {languageTranslation('SEARCH_LABEL')} :
                </Label>
                <Input type='text' name='searchValue' id='search' />
              </FormGroup>
            </Col>
            <Col lg={'2'} md={'3'}>
              <FormGroup>
                <Label for='Selectregion' className='col-form-label'>
                  {languageTranslation('SORTBY_LABEL')} :
                </Label>
                <Select
                  placeholder={languageTranslation('SORTBY_PLACEHOLDER')}
                  options={SortOptions}
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
                  {languageTranslation('STATUS_LABEL')} :
                </Label>
                <Select
                  placeholder={languageTranslation('STATUS_PLACEHOLDER')}
                  options={StatusOptions}
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
                <Button className='btn-filter mr-2' type='submit' id='search1'>
                  <i className='fa fa-search'></i>
                  <span className='search-text'>
                    {languageTranslation('SEARCH_LABEL')}
                  </span>
                </Button>
                <Button className='btn-filter mr-2' id='reset'>
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
      <div className='common-content flex-grow-1  p-0 all-invoice'>
        <div className='table-minheight invoices-table'>
          <Table bordered hover responsive>
            <thead className='thead-bg'>
              <tr>
                <th className='invoiceid-col'>
                  {' '}
                  {languageTranslation('NUMBER')}{' '}
                </th>
                <th className='careinstitution-col'>
                  {languageTranslation('MENU_INSTITUTION')}
                </th>
                <th className='caregiver-col'>
                  {' '}
                  {languageTranslation('MENU_CAREGIVER')}
                </th>
                <th className='cancel-col'>
                  {' '}
                  {languageTranslation('CANCELLATION_FOR')}{' '}
                </th>
                <th className='cancel-col'>
                  {' '}
                  {languageTranslation('CANCELED_BY')}
                </th>
                <th className='invoiceid-col'>
                  {' '}
                  {languageTranslation('INVOICE_NUMBER_F')}
                </th>
                <th className='date-col'>{languageTranslation('DATE')}</th>
                <th className='amount-col'>{languageTranslation('AMOUNT')}</th>
                <th className='date-col'>{languageTranslation('POST')}</th>
                <th className='date-col'>{languageTranslation('SENT_POST')}</th>

                <th className='date-col'>{languageTranslation('PAID')}</th>
                <th className='date-col'>{languageTranslation('REMIND')}</th>
                <th className='date-col'>{languageTranslation('REMINDED')}</th>
                <th className='date-col'>{languageTranslation('LAWYER')}</th>
                <th className='checkbox-col'>
                  {languageTranslation('DOUBTFUL')}
                </th>
                <th className='checkbox-col'>
                  {languageTranslation('IRRECOVERABLE')}
                </th>
                <th className='amount-col'>{languageTranslation('COST')}</th>
                <th className='amount-col'>
                  {languageTranslation('SALARY_AMOUNT')}
                </th>
                <th className='amount-col'>
                  {languageTranslation('STILL_OPEN')}
                </th>
                <th className='comment-col'>
                  {languageTranslation('COMMENT')}
                </th>
              </tr>
            </thead>
            {invoiceList && invoiceList.length
              ? invoiceList.map((item: any, index:any) => {
                  return (
                    <tbody>
                      <tr>
                        <td className='invoiceid-col'> {index} </td>
                        <td className='careinstitution-col'>
                          {' '}
                          <Link to='#' className='view-more-link'>
                            {item && item.careInstitutionName
                              ? item.careInstitutionName
                              : '-'}
                          </Link> 
                        </td>
                        <td className='caregiver-col'>
                          {' '}
                          <Link to='#' className='view-more-link'>
                            {item && item.careGiverName
                              ? item.careGiverName
                              : '-'}
                          </Link>
                        </td>
                        <td className='cancel-col'></td>
                        <td className='cancel-col'></td>
                        <td className='invoiceid-col'>
                          {' '}
                          {item && item.invoiceNumber
                            ? item.invoiceNumber
                            : '-'}
                        </td>
                        <td className='date-col'>
                          {item && item.invoiceDate
                            ? moment(item.invoiceDate).format(defaultDateFormat)
                            : '-'}
                        </td>
                        <td className='amount-col'>
                          {item && item.amount
                            ? parseFloat(item.amount).toFixed(2)
                            : '-'}
                        </td>
                        <td className='date-col'></td>
                        <td className='date-col'></td>
                        <td className='date-col'></td>
                        <td className='date-col'></td>
                        <td className='date-col'></td>
                        <td className='date-col'></td>
                        <td className='checkbox-col'>
                          <span className='checkbox-custom '>
                            <input
                              type='checkbox'
                              id='checkAll'
                              className=''
                              checked={item && item.doubtful ? true : false}
                            />
                            <label className=''> </label>
                          </span>
                        </td>
                        <td className='checkbox-col'>
                          <span className='checkbox-custom '>
                            <input
                              type='checkbox'
                              id='checkAll'
                              className=''
                              checked={
                                item && item.irrecoverable ? true : false
                              }
                            />
                            <label className=''> </label>
                          </span>
                        </td>
                        <td className='amount-col'></td>
                        <td className='amount-col'></td>
                        <td className='amount-col'></td>

                        <td className='comment-col'>
                          <span className='word-wrap'></span>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              : null}
          </Table>
        </div>
        <Form className='form-section total-form-section bg-white'>
          <div className='d-flex flex-wrap total-form-block'>
            <Col xs={'12'} sm={'6'} md={'6'} lg={'6'}>
              <FormGroup>
                <Row className='align-items-center'>
                  <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                    <Label className='form-label col-form-label'>Total</Label>
                  </Col>
                  <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
                    <div className='required-input'>
                      <Input
                        type='text'
                        name={'firstName'}
                        placeholder={'Enter Total'}
                        className='text-input text-capitalize'
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={'12'} sm={'6'} md={'6'} lg={'6'}>
              <FormGroup>
                <Row className='align-items-center'>
                  <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                    <Label className='form-label col-form-label'>
                      Total selection
                    </Label>
                  </Col>
                  <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
                    <div className='required-input'>
                      <Input
                        type='text'
                        name={'firstName'}
                        placeholder={'Enter total selection'}
                        className='text-input text-capitalize'
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
          </div>
        </Form>
      </div>
    </CardBody>
  );
};
export default SolonaList;
