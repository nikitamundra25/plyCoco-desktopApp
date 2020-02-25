import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Col,
  Row,
  UncontrolledTooltip,
  Table,
} from 'reactstrap';
import { languageTranslation } from '../../../../helpers';
import './index.scss';

class OutboxEmail extends Component {
  render() {
    return (
      <div className='common-detail-page'>
        <div className='common-detail-section'>
          <div className='common-content flex-grow-1'>
            <h5 className='content-title mb-0'>
              {languageTranslation('OUTBOX')}
            </h5>
            <div className='email-section'>
              <div className='email-content pt-1'>
                <Row>
                  <Col lg={'7'}>
                    <div className='email-inbox-section'>
                      <div className='email-row-wrap align-items-center email-attributes-wrap'>
                        <div className='email-attributes-content d-flex align-items-center'>
                          <i className='fa fa-refresh mr-1'></i>
                          <span>{languageTranslation('REFRESH')}</span>
                        </div>
                      </div>
                      <div className='filter-form form-section'>
                        <Row>
                          <Col lg={'8'} md={'8'} sm={'8'}>
                            <FormGroup className='mb-2'>
                              <Input
                                type='text'
                                name='search'
                                id='search'
                                placeholder={languageTranslation(
                                  'SEARCH_PLACEHOLDER',
                                )}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg={'4'} md={'4'} sm={'4'}>
                            <div className='filter-btn-wrap mb-2'>
                              <span className='btn-filter mr-2' id='search1'>
                                <UncontrolledTooltip
                                  placement='top'
                                  target='search1'
                                >
                                  {languageTranslation('SEARCH_LABEL')}
                                </UncontrolledTooltip>
                                <i className='fa fa-search'></i>{' '}
                                <span className='search-text'>
                                  {' '}
                                  {languageTranslation('SEARCH_LABEL')}
                                </span>
                              </span>
                              <span className='btn-filter mr-2' id='reset'>
                                <UncontrolledTooltip
                                  placement='top'
                                  target='reset'
                                >
                                  {languageTranslation('RESET_LABEL')}
                                </UncontrolledTooltip>
                                <i className='fa fa-refresh '></i>{' '}
                                <span className='search-text'>
                                  {' '}
                                  {languageTranslation('RESET_LABEL')}
                                </span>
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <Table responsive className='email-inbox-table'>
                        <thead className='thead-bg'>
                          <tr>
                            <th className='posted-col'>
                              {languageTranslation('POSTED')}
                            </th>
                            <th className='of-col'>
                              {' '}
                              {languageTranslation('OF')}
                            </th>
                            <th className='on-col'>
                              {' '}
                              {languageTranslation('ON')}
                            </th>
                            <th className='subject-col'>
                              {' '}
                              {languageTranslation('SUBJECT')}
                            </th>

                            {/* <th className="remarks-col">
                    {" "}
                    {languageTranslation("REMARKS")}{" "}
                  </th> */}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={4}>
                              <div className='date-title'>
                                <span className='align-middle mr-2'>
                                  <i className='icon-arrow-down' />
                                </span>
                                <span className='align-middle '>
                                  Date: 2018
                                </span>
                              </div>
                              <div>
                                <Table
                                  bordered
                                  hover
                                  responsive
                                  className='inner-email-inbox-table'
                                >
                                  <tbody>
                                    <tr>
                                      <td className='posted-col'>30.12.2018</td>
                                      <td className='of-col'>Mantel (PDL)</td>
                                      <td className='on-col'>
                                        Akquise AH, 10:30 Jule
                                      </td>
                                      <td className='subject-col'>
                                        Akquise AH, 10:30 Jule
                                      </td>
                                    </tr>
                                    <tr className='tr-active'>
                                      <td className='posted-col'>30.12.2020</td>
                                      <td className='of-col'>Mantel (PDL)</td>
                                      <td className='on-col'>
                                        Akquise AH, 10:30 Jule
                                      </td>
                                      <td className='subject-col'>
                                        Akquise AH, 10:30 Jule
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className='posted-col'>30.12.2020</td>
                                      <td className='of-col'>Mantel (PDL)</td>
                                      <td className='on-col'>
                                        Akquise AH, 10:30 Jule
                                      </td>
                                      <td className='subject-col'>
                                        Akquise AH, 10:30 Jule
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={4}>
                              <div className='date-title'>
                                <span className='align-middle mr-2'>
                                  <i className='icon-arrow-down' />
                                </span>
                                <span className='align-middle '>
                                  Date: 2020
                                </span>
                              </div>
                              <div>
                                <Table
                                  bordered
                                  hover
                                  responsive
                                  className='inner-email-inbox-table'
                                >
                                  <tbody>
                                    <tr>
                                      <td className='posted-col'>30.12.2020</td>
                                      <td className='of-col'>Mantel (PDL)</td>
                                      <td className='on-col'>
                                        Akquise AH, 10:30 Jule
                                      </td>
                                      <td className='subject-col'>
                                        Akquise AH, 10:30 Jule
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className='posted-col'>30.12.2020</td>
                                      <td className='of-col'>Mantel (PDL)</td>
                                      <td className='on-col'>
                                        Akquise AH, 10:30 Jule
                                      </td>
                                      <td className='subject-col'>
                                        Akquise AH, 10:30 Jule
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className='posted-col'>30.12.2020</td>
                                      <td className='of-col'>Mantel (PDL)</td>
                                      <td className='on-col'>
                                        Akquise AH, 10:30 Jule
                                      </td>
                                      <td className='subject-col'>
                                        Akquise AH, 10:30 Jule
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className='posted-col'>30.12.2020</td>
                                      <td className='of-col'>Mantel (PDL)</td>
                                      <td className='on-col'>
                                        Akquise AH, 10:30 Jule
                                      </td>
                                      <td className='subject-col'>
                                        Akquise AH, 10:30 Jule
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                  <Col lg={'5'}>
                    <div className='mail-details h-auto'>
                      <div className='mail-body'>
                        <h5 className='mb-3'>
                          {' '}
                          Your iBuy.com grocery shopping confirmation
                        </h5>
                        <div>
                          <span className='gray-color'>Posted:</span>{' '}
                          <span>12:20 PM</span>
                        </div>
                        <div className='mb-3'>
                          <span className='gray-color'>To:</span>{' '}
                          <span>Justina Achatoh</span>
                        </div>
                        <p className='mb-1'>
                          {' '}
                          -------------------------------------------------
                        </p>
                        <p> Hello Denis,</p>

                        <p>we have the following offer for you: Searched for</p>

                        <p>qualification: Elderly care</p>

                        <p>
                          01.01. ND 8.0h: old people's home near Bielefeld
                          (code: Q9T3M) Services by arrangement. Accommodation
                          is provided. Double services possible. Please let us
                          know your availability by email ! Fee: freely
                          negotiable Best regards Marc Erdtmann Tel: +49.30.644
                          99 444 Fax: +49.30.644 99 445 E-Mail:
                          Kontakt@plycoco.de www.plycoco.de Plycoco GmbH Am
                          Borsigturm 6 13507 Berlin Entry in the commercial
                          register: Register court : District court
                          Berlin-Charlottenburg, registration number: HRB
                          150746, managing
                        </p>
                        <div className='mt-3  mb-1'>Thanks and Regards</div>
                        <div className='h6'>John die</div>
                      </div>
                    </div>
                    <Table
                      bordered
                      hover
                      responsive
                      className='mail-table mt-2'
                    >
                      <thead className='thead-bg'>
                        <tr>
                          <th className='file-name'>
                            {languageTranslation('FILE_NAME')}
                          </th>
                          <th className='size-col'>
                            {languageTranslation('SIZE')}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='file-name'>Pan card.PDF</td>
                          <td className='size-col'>1kb</td>
                        </tr>
                        <tr>
                          <td className='file-name'>Voter id.pdf</td>
                          <td className='size-col'>2kb</td>
                        </tr>
                      </tbody>
                    </Table>
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
export default OutboxEmail;
