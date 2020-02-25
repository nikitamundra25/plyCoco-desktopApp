import React, { Component } from 'react';
import { Button, Col, Row, Table } from 'reactstrap';
import { languageTranslation } from '../../../../helpers';
import './index.scss';

class MailQueue extends Component {
  render() {
    return (
      <div className='common-detail-page'>
        <div className='common-detail-section'>
          <div className='common-content flex-grow-1'>
            <h5 className='content-title mb-0'>
              {languageTranslation('MAIL_QUEUE')}
            </h5>
            <div className='email-section'>
              <div className='email-content pt-1'>
                <Row>
                  <Col lg={'12'}>
                    <div className='email-inbox-section'>
                      <div className='email-row-wrap align-items-center email-attributes-wrap'>
                        <div className='email-attributes-content d-flex align-items-center'>
                          <i className='fa fa-refresh mr-1'></i>
                          <span>{languageTranslation('REFRESH')}</span>
                        </div>
                        <div className='email-attributes-content d-flex align-items-center'>
                          <Button
                            color='primary'
                            className='pull-right ml-2 btn-add btn btn-primary'
                          >
                            {' '}
                            <span>
                              <i className='fa fa-plus mr-1'></i>
                            </span>{' '}
                            {languageTranslation('ADD_ROW')}
                          </Button>{' '}
                        </div>
                      </div>
                      <div className='filter-form form-section'>
                        <Row></Row>
                      </div>

                      <Table responsive className='email-inbox-table'>
                        <thead className='thead-bg'>
                          <tr>
                            <th className='key-col'>
                              {languageTranslation('KEY')}
                            </th>
                            <th className='value-col'>
                              {' '}
                              {languageTranslation('VALUE')}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={2}>
                              <div>
                                <Table
                                  bordered
                                  hover
                                  responsive
                                  className='inner-email-inbox-table'
                                >
                                  <tbody>
                                    <tr>
                                      <td className='key-col border-top-0'>
                                        Low
                                      </td>
                                      <td className='value-col border-top-0'>
                                        23
                                      </td>
                                    </tr>
                                    <tr className='tr-active'>
                                      <td className='key-col'>Aquise</td>
                                      <td className='value-col'>0</td>
                                    </tr>
                                    <tr>
                                      <td className='key-col'>Infimail</td>
                                      <td className='value-col'>15</td>
                                    </tr>
                                    <tr>
                                      <td className='key-col'>Low</td>
                                      <td className='value-col'>0</td>
                                    </tr>
                                    <tr>
                                      <td className='key-col'>Aquise</td>
                                      <td className='value-col'>12</td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                            </td>
                          </tr>
                          <tr></tr>
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MailQueue;
