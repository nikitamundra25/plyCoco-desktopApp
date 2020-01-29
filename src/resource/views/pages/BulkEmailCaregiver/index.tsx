import React, { Component } from 'react';
import { FormGroup, Label, Input, Col, Row, Table } from 'reactstrap';
import Select from 'react-select';
import { languageTranslation } from '../../../../helpers';
import { State } from '../../../../config';
import filter from '../../../assets/img/filter.svg';
import refresh from '../../../assets/img/refresh.svg';
import send from '../../../assets/img/send.svg';
import './index.scss';

class BulkEmailCaregiver extends Component {
  render() {
    return (
      <>
        <div className='common-detail-page'>
          <div className='common-detail-section'>
            <div className='sticky-common-header'>
              <div className='common-topheader d-flex align-items-center px-2 mb-1'>
                <div className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={refresh} alt='' />
                  </span>
                  <span className='header-nav-text'>Refresh</span>
                </div>
                <div className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={filter} alt='' />
                  </span>
                  <span className='header-nav-text'>Attribute</span>
                </div>

                <div className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={send} alt='' />
                  </span>
                  <span className='header-nav-text'>Send</span>
                </div>
              </div>
            </div>

            <div className='common-content flex-grow-1'>
              <div className='bulk-email-section'>
                <Row>
                  <Col lg={'7'}>
                    <div className='common-column'>
                      <Table bordered hover responsive>
                        <thead className='thead-bg'>
                          <tr>
                            <th className='checkbox-col'></th>
                            <th>{languageTranslation('NAME')}</th>
                            <th>{languageTranslation('EMAIL')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <span className='checkboxli checkbox-custom checkbox-default mr-2'>
                                <input
                                  type='checkbox'
                                  id='checkAll'
                                  className=''
                                />
                                <label className=''></label>
                              </span>
                            </td>
                            <td>Akan Nicole</td>
                            <td>kontact@pfleglisoft.de</td>
                          </tr>
                          <tr>
                            <td>
                              <span className='checkboxli checkbox-custom checkbox-default mr-2'>
                                <input
                                  type='checkbox'
                                  id='checkAll'
                                  className=''
                                />
                                <label className=''></label>
                              </span>
                            </td>
                            <td>Akan Nicole</td>
                            <td>kontact@pfleglisoft.de</td>
                          </tr>
                          <tr>
                            <td>
                              <span className='checkboxli checkbox-custom checkbox-default mr-2'>
                                <input
                                  type='checkbox'
                                  id='checkAll'
                                  className=''
                                />
                                <label className=''></label>
                              </span>
                            </td>
                            <td>Akan Nicole</td>
                            <td>kontact@pfleglisoft.de</td>
                          </tr>
                          <tr>
                            <td>
                              <span className='checkboxli checkbox-custom checkbox-default mr-2'>
                                <input
                                  type='checkbox'
                                  id='checkAll'
                                  className=''
                                />
                                <label className=''></label>
                              </span>
                            </td>
                            <td>Akan Nicole</td>
                            <td>kontact@pfleglisoft.de</td>
                          </tr>
                          <tr>
                            <td>
                              <span className='checkboxli checkbox-custom checkbox-default mr-2'>
                                <input
                                  type='checkbox'
                                  id='checkAll'
                                  className=''
                                />
                                <label className=''></label>
                              </span>
                            </td>
                            <td>Akan Nicole</td>
                            <td>kontact@pfleglisoft.de</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </Col>

                  <Col lg={'5'}>
                    <div className='common-column'>
                      <div className='form-section py-2 px-3'>
                        <div className='d-flex align-items-center justify-content-between'>
                          <Label>{languageTranslation('ID')}</Label>
                          <div className='select box'>
                            {/* <Select
                              placeholder="Select Template"
                              options={Region}
                              classNamePrefix="custom-reactselect"
                              className="custom-reactselect"
                            /> */}
                          </div>
                        </div>
                        <Row>
                          <Col lg={'12'}>
                            <FormGroup>
                              <Row>
                                <Col sm='4'>
                                  <Label className='form-label col-form-label'>
                                    {languageTranslation('ID')}
                                  </Label>
                                </Col>
                                <Col sm='8'>
                                  <div>
                                    <Input
                                      type='text'
                                      name={'lastName'}
                                      placeholder={languageTranslation('ID')}
                                      className='width-common'
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </FormGroup>
                          </Col>
                          <Col lg={'12'}>
                            <FormGroup>
                              <Row>
                                <Col sm='4'>
                                  <Label className='form-label col-form-label'>
                                    Caregiver
                                  </Label>
                                </Col>
                                <Col sm='8'>
                                  <div>
                                    <Select
                                      placeholder='REGION'
                                      options={State}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default BulkEmailCaregiver;
