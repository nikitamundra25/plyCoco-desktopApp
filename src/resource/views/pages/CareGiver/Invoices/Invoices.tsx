import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { languageTranslation } from '../../../../../helpers';
import '../caregiver.scss';
class Invoices extends Component {
  render() {
    return (
      <>
        <div className='invoice-section'>
          <div>
            <h5 className='content-title'>{languageTranslation('INVOICES')}</h5>

            <Table responsive className='invoice-table'>
              <thead className='thead-bg'>
                <tr>
                  <th className='sno-col'>{languageTranslation('S_NO')} </th>
                  <th className='institution-col'>
                    {languageTranslation('INSTITUTION_ID')}{' '}
                  </th>
                  <th className='cancellation-col'>
                    {' '}
                    {languageTranslation('CANCELLATION_FOR')}
                  </th>
                  <th className='cancell-col'>
                    {' '}
                    {languageTranslation('CANCELLED_BY')}
                  </th>
                  <th className='facility-col'>
                    {' '}
                    {languageTranslation('FACILITY')}
                  </th>
                  <th className='date-col'>{languageTranslation('DATE')} </th>
                  <th className='amount-col'>
                    {languageTranslation('AMOUNT')}
                  </th>
                  <th className='vat-col'>{languageTranslation('VAT')}</th>
                  <th className='due-date-col'>
                    {' '}
                    {languageTranslation('DUE_DATE')}{' '}
                  </th>
                  <th className='factoring-col'>
                    {languageTranslation('FACTORING')}
                  </th>
                  <th className='sent-col'>{languageTranslation('SENT_BF')}</th>
                  <th className='remarks-col'>
                    {' '}
                    {languageTranslation('REMARKS')}{' '}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={12}>
                    <div className='date-title'>
                      <span className='align-middle mr-2'>
                        <i className='icon-arrow-down' />
                      </span>
                      <span className='align-middle '>Date: 2019</span>
                    </div>
                    <div>
                      <Table
                        bordered
                        hover
                        responsive
                        className='inner-invoice-table'
                      >
                        <tbody>
                          <tr>
                            <td className='sno-col'>1</td>
                            <td className='institution-col'>230001</td>
                            <td className='cancellation-col'>asdfgf</td>
                            <td className='cancell-col'>230002</td>
                            <td className='facility-col'>GZH</td>
                            <td className='date-col'>29.04.2019</td>
                            <td className='amount-col'>2,190.50</td>
                            <td className='vat-col'>0%</td>
                            <td className='due-date-col'>30.04.2019</td>
                            <td className='factoring-col'>
                              <span className='checkboxli checkbox-custom checkbox-default'>
                                <input
                                  type='checkbox'
                                  id='checkAll'
                                  className=''
                                />
                                <label className=''> </label>
                              </span>
                            </td>
                            <td className='sent-col'>30.04.2019</td>
                            <td className='remarks-col'>Remarks</td>
                          </tr>
                          <tr>
                            <td className='sno-col'>1</td>
                            <td className='institution-col'>230001</td>
                            <td className='cancellation-col'>asdfgf</td>
                            <td className='cancell-col'>230002</td>
                            <td className='facility-col'>GZH</td>
                            <td className='date-col'>29.04.2019</td>
                            <td className='amount-col'>2,190.50</td>
                            <td className='vat-col'>0%</td>
                            <td className='due-date-col'>30.04.2019</td>
                            <td className='factoring-col'>
                              <span className='checkboxli checkbox-custom checkbox-default'>
                                <input
                                  type='checkbox'
                                  id='checkAll'
                                  className=''
                                />
                                <label className=''> </label>
                              </span>
                            </td>
                            <td className='sent-col'>30.04.2019</td>
                            <td className='remarks-col'>Remarks</td>
                          </tr>
                          <tr>
                            <td className='sno-col'>1</td>
                            <td className='institution-col'>230001</td>
                            <td className='cancellation-col'>asdfgf</td>
                            <td className='cancell-col'>230002</td>
                            <td className='facility-col'>GZH</td>
                            <td className='date-col'>29.04.2019</td>
                            <td className='amount-col'>2,190.50</td>
                            <td className='vat-col'>0%</td>
                            <td className='due-date-col'>30.04.2019</td>
                            <td className='factoring-col'>
                              <span className='checkboxli checkbox-custom checkbox-default'>
                                <input
                                  type='checkbox'
                                  id='checkAll'
                                  className=''
                                />
                                <label className=''> </label>
                              </span>
                            </td>
                            <td className='sent-col'>30.04.2019</td>
                            <td className='remarks-col'>Remarks</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={12}>
                    <div className='date-title'>
                      <span className='align-middle mr-2'>
                        <i className='icon-arrow-down' />
                      </span>
                      <span className='align-middle '>Date: 2018</span>
                    </div>
                    <div>
                      <Table
                        bordered
                        hover
                        responsive
                        className='inner-invoice-table'
                      >
                        <tbody>
                          <tr>
                            <td className='sno-col'>1</td>
                            <td className='institution-col'>230001</td>
                            <td className='cancellation-col'>asdfgf</td>
                            <td className='cancell-col'>230002</td>
                            <td className='facility-col'>GZH</td>
                            <td className='date-col'>29.04.2019</td>
                            <td className='amount-col'>2,190.50</td>
                            <td className='vat-col'>0%</td>
                            <td className='due-date-col'>30.04.2019</td>
                            <td className='factoring-col'>
                              <span className='checkboxli checkbox-custom checkbox-default'>
                                <input
                                  type='checkbox'
                                  id='checkAll'
                                  className=''
                                />
                                <label className=''> </label>
                              </span>
                            </td>
                            <td className='sent-col'>30.04.2019</td>
                            <td className='remarks-col'>Remarks</td>
                          </tr>
                          <tr>
                            <td className='sno-col'>1</td>
                            <td className='institution-col'>230001</td>
                            <td className='cancellation-col'>asdfgf</td>
                            <td className='cancell-col'>230002</td>
                            <td className='facility-col'>GZH</td>
                            <td className='date-col'>29.04.2019</td>
                            <td className='amount-col'>2,190.50</td>
                            <td className='vat-col'>0%</td>
                            <td className='due-date-col'>30.04.2019</td>
                            <td className='factoring-col'>
                              <span className='checkboxli checkbox-custom checkbox-default'>
                                <input
                                  type='checkbox'
                                  id='checkAll'
                                  className=''
                                />
                                <label className=''> </label>
                              </span>
                            </td>
                            <td className='sent-col'>30.04.2019</td>
                            <td className='remarks-col'>Remarks</td>
                          </tr>
                          <tr>
                            <td className='sno-col'>1</td>
                            <td className='institution-col'>230001</td>
                            <td className='cancellation-col'>asdfgf</td>
                            <td className='cancell-col'>230002</td>
                            <td className='facility-col'>GZH</td>
                            <td className='date-col'>29.04.2019</td>
                            <td className='amount-col'>2,190.50</td>
                            <td className='vat-col'>0%</td>
                            <td className='due-date-col'>30.04.2019</td>
                            <td className='factoring-col'>
                              <span className='checkboxli checkbox-custom checkbox-default'>
                                <input
                                  type='checkbox'
                                  id='checkAll'
                                  className=''
                                />
                                <label className=''> </label>
                              </span>
                            </td>
                            <td className='sent-col'>30.04.2019</td>
                            <td className='remarks-col'>Remarks</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={12}>
                    <div className='date-title'>
                      <span className='align-middle mr-2'>
                        <i className='icon-arrow-down' />
                      </span>
                      <span className='align-middle '>Date: 2017</span>
                    </div>
                    <div>
                      <Table
                        bordered
                        hover
                        responsive
                        className='inner-invoice-table'
                      >
                        <tbody>
                          <tr>
                            <td className='sno-col'>1</td>
                            <td className='institution-col'>230001</td>
                            <td className='cancellation-col'>asdfgf</td>
                            <td className='cancell-col'>230002</td>
                            <td className='facility-col'>GZH</td>
                            <td className='date-col'>29.04.2019</td>
                            <td className='amount-col'>2,190.50</td>
                            <td className='vat-col'>0%</td>
                            <td className='due-date-col'>30.04.2019</td>
                            <td className='factoring-col'>
                              <span className='checkboxli checkbox-custom checkbox-default'>
                                <input
                                  type='checkbox'
                                  id='checkAll'
                                  className=''
                                />
                                <label className=''> </label>
                              </span>
                            </td>
                            <td className='sent-col'>30.04.2019</td>
                            <td className='remarks-col'>Remarks</td>
                          </tr>
                          <tr>
                            <td className='sno-col'>1</td>
                            <td className='institution-col'>230001</td>
                            <td className='cancellation-col'>asdfgf</td>
                            <td className='cancell-col'>230002</td>
                            <td className='facility-col'>GZH</td>
                            <td className='date-col'>29.04.2019</td>
                            <td className='amount-col'>2,190.50</td>
                            <td className='vat-col'>0%</td>
                            <td className='due-date-col'>30.04.2019</td>
                            <td className='factoring-col'>
                              <span className='checkboxli checkbox-custom checkbox-default'>
                                <input
                                  type='checkbox'
                                  id='checkAll'
                                  className=''
                                />
                                <label className=''> </label>
                              </span>
                            </td>
                            <td className='sent-col'>30.04.2019</td>
                            <td className='remarks-col'>Remarks</td>
                          </tr>
                          <tr>
                            <td className='sno-col'>1</td>
                            <td className='institution-col'>230001</td>
                            <td className='cancellation-col'>asdfgf</td>
                            <td className='cancell-col'>230002</td>
                            <td className='facility-col'>GZH</td>
                            <td className='date-col'>29.04.2019</td>
                            <td className='amount-col'>2,190.50</td>
                            <td className='vat-col'>0%</td>
                            <td className='due-date-col'>30.04.2019</td>
                            <td className='factoring-col'>
                              <span className='checkboxli checkbox-custom checkbox-default'>
                                <input
                                  type='checkbox'
                                  id='checkAll'
                                  className=''
                                />
                                <label className=''> </label>
                              </span>
                            </td>
                            <td className='sent-col'>30.04.2019</td>
                            <td className='remarks-col'>Remarks</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={12}>
                    <div className='date-title'>
                      <span className='align-middle mr-2'>
                        <i className='icon-arrow-down' />
                      </span>
                      <span className='align-middle '>Date: 2016</span>
                    </div>
                    <div>
                      <Table
                        bordered
                        hover
                        responsive
                        className='inner-invoice-table'
                      >
                        <tbody>
                          <tr>
                            <td className='sno-col'>1</td>
                            <td className='institution-col'>230001</td>
                            <td className='cancellation-col'>asdfgf</td>
                            <td className='cancell-col'>230002</td>
                            <td className='facility-col'>GZH</td>
                            <td className='date-col'>29.04.2019</td>
                            <td className='amount-col'>2,190.50</td>
                            <td className='vat-col'>0%</td>
                            <td className='due-date-col'>30.04.2019</td>
                            <td className='factoring-col'>
                              <span className='checkboxli checkbox-custom checkbox-default'>
                                <input
                                  type='checkbox'
                                  id='checkAll'
                                  className=''
                                />
                                <label className=''> </label>
                              </span>
                            </td>
                            <td className='sent-col'>30.04.2019</td>
                            <td className='remarks-col'>Remarks</td>
                          </tr>
                          <tr>
                            <td className='sno-col'>1</td>
                            <td className='institution-col'>230001</td>
                            <td className='cancellation-col'>asdfgf</td>
                            <td className='cancell-col'>230002</td>
                            <td className='facility-col'>GZH</td>
                            <td className='date-col'>29.04.2019</td>
                            <td className='amount-col'>2,190.50</td>
                            <td className='vat-col'>0%</td>
                            <td className='due-date-col'>30.04.2019</td>
                            <td className='factoring-col'>
                              <span className='checkboxli checkbox-custom checkbox-default'>
                                <input
                                  type='checkbox'
                                  id='checkAll'
                                  className=''
                                />
                                <label className=''> </label>
                              </span>
                            </td>
                            <td className='sent-col'>30.04.2019</td>
                            <td className='remarks-col'>Remarks</td>
                          </tr>
                          <tr>
                            <td className='sno-col'>1</td>
                            <td className='institution-col'>230001</td>
                            <td className='cancellation-col'>asdfgf</td>
                            <td className='cancell-col'>230002</td>
                            <td className='facility-col'>GZH</td>
                            <td className='date-col'>29.04.2019</td>
                            <td className='amount-col'>2,190.50</td>
                            <td className='vat-col'>0%</td>
                            <td className='due-date-col'>30.04.2019</td>
                            <td className='factoring-col'>
                              <span className='checkboxli checkbox-custom checkbox-default'>
                                <input
                                  type='checkbox'
                                  id='checkAll'
                                  className=''
                                />
                                <label className=''> </label>
                              </span>
                            </td>
                            <td className='sent-col'>30.04.2019</td>
                            <td className='remarks-col'>Remarks</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </>
    );
  }
}
export default Invoices;
