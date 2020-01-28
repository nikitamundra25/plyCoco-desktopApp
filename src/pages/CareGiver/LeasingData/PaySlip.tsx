import React, { Component } from 'react';
import { Table, CustomInput } from 'reactstrap';
import Select from 'react-select';
import { State } from '../../../config';
import { languageTranslation } from '../../../helpers';
import '../caregiver.scss';
import rich from '../../../assets/img/rich.svg';
class PaySlip extends Component {
  render() {
    return (
      <>
        <div className='payslip-section'>
          <h5 className='content-title'>{languageTranslation('PAY_SLIPS')}</h5>
          <div className='d-flex flex-nowrap align-items-center payslip-menu mb-2'>
            <div className='region-select mb-2 ml-0 mr-3 '>
              <Select
                placeholder={languageTranslation('DATE')}
                options={[{ label: '2020-01-15', value: '2020-01-15' }]}
                menuPlacement={'auto'}
              />
            </div>
            <div className='custom-switch-block mb-2 mr-3 '>
              <CustomInput
                type='switch'
                id='exampleCustomSwitch'
                name='customSwitch'
                label='Pay Slip TimYOCE'
                className='custom-switch'
              />
            </div>
            <div className='custom-menu mb-2 '>
              <span className='custom-menu-icon'>
                <img src={rich} alt='' />
              </span>
              <span className='custom-menu-text'>Charge Now</span>
            </div>
          </div>

          <Table responsive className='payslip-table'>
            <thead className='thead-bg'>
              <tr>
                <th className='sno-col'>{languageTranslation('S_NO')}</th>
                <th className='date-col'>{languageTranslation('DATE')}</th>
                <th className='type-col'>{languageTranslation('TYPE')}</th>
                <th className='amount-col'>{languageTranslation('AMOUNT')}</th>
                <th className='remarks-col'>
                  {languageTranslation('COMMENT')}
                </th>
                <th className='paid-col'>{languageTranslation('PAID')}</th>
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
                      className='inner-payslip-table'
                    >
                      <tbody>
                        <tr>
                          <td className='sno-col'>1</td>
                          <td className='date-col'>29.04.2019</td>
                          <td className='type-col'>type1</td>
                          <td className='amount-col'>2,190.50</td>
                          <td className='remarks-col'>remark text</td>
                          <td className='paid-col'>2,190.50</td>
                        </tr>
                        <tr>
                          <td className='sno-col'>2</td>
                          <td className='date-col'>29.04.2019</td>
                          <td className='type-col'>type1</td>
                          <td className='amount-col'>2,190.50</td>
                          <td className='remarks-col'>remark text</td>
                          <td className='paid-col'>2,190.50</td>
                        </tr>
                        <tr>
                          <td className='sno-col'>3</td>
                          <td className='date-col'>29.04.2019</td>
                          <td className='type-col'>type1</td>
                          <td className='amount-col'>2,190.50</td>
                          <td className='remarks-col'>remark text</td>
                          <td className='paid-col'>2,190.50</td>
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
                      className='inner-payslip-table'
                    >
                      <tbody>
                        <tr>
                          <td className='sno-col'>1</td>
                          <td className='date-col'>29.04.2019</td>
                          <td className='type-col'>type1</td>
                          <td className='amount-col'>2,190.50</td>
                          <td className='remarks-col'>remark text</td>
                          <td className='paid-col'>2,190.50</td>
                        </tr>
                        <tr>
                          <td className='sno-col'>2</td>
                          <td className='date-col'>29.04.2019</td>
                          <td className='type-col'>type1</td>
                          <td className='amount-col'>2,190.50</td>
                          <td className='remarks-col'>remark text</td>
                          <td className='paid-col'>2,190.50</td>
                        </tr>
                        <tr>
                          <td className='sno-col'>3</td>
                          <td className='date-col'>29.04.2019</td>
                          <td className='type-col'>type1</td>
                          <td className='amount-col'>2,190.50</td>
                          <td className='remarks-col'>remark text</td>
                          <td className='paid-col'>2,190.50</td>
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
                      className='inner-payslip-table'
                    >
                      <tbody>
                        <tr>
                          <td className='sno-col'>1</td>
                          <td className='date-col'>29.04.2019</td>
                          <td className='type-col'>type1</td>
                          <td className='amount-col'>2,190.50</td>
                          <td className='remarks-col'>remark text</td>
                          <td className='paid-col'>2,190.50</td>
                        </tr>
                        <tr>
                          <td className='sno-col'>2</td>
                          <td className='date-col'>29.04.2019</td>
                          <td className='type-col'>type1</td>
                          <td className='amount-col'>2,190.50</td>
                          <td className='remarks-col'>remark text</td>
                          <td className='paid-col'>2,190.50</td>
                        </tr>
                        <tr>
                          <td className='sno-col'>3</td>
                          <td className='date-col'>29.04.2019</td>
                          <td className='type-col'>type1</td>
                          <td className='amount-col'>2,190.50</td>
                          <td className='remarks-col'>remark text</td>
                          <td className='paid-col'>2,190.50</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}
export default PaySlip;
