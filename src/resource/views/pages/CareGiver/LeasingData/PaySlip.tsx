import React, { FunctionComponent } from "react";
import { Table, CustomInput } from "reactstrap";
import Select from "react-select";
import { languageTranslation } from "../../../../../helpers";
import rich from "../../../../assets/img/rich.svg";
import "../caregiver.scss";
import { IPayslipValues } from "../../../../../interfaces";
import Loader from '../../../containers/Loader/Loader';
import moment from 'moment';
import { defaultDateFormat } from '../../../../../config';

const PaySlip: FunctionComponent<any> = (props: any) => {

  const {
    payslipDetails,
    loading
  } = props

  
  return (
    <>
      <div className="payslip-section">
        <h5 className="content-title">{languageTranslation("PAY_SLIPS")}</h5>
        <div className="d-flex flex-nowrap align-items-center payslip-menu mb-2">
          <div className="region-select mb-2 ml-0 mr-3 ">
            <Select
              classNamePrefix="custom-inner-reactselect"
              className={"custom-reactselect"}
              placeholder={languageTranslation("DATE")}
              options={[{ label: "2020-01-15", value: "2020-01-15" }]}
              menuPlacement={"auto"}
            />
          </div>
          
        </div>

        <Table responsive className="payslip-table">
          <thead className="thead-bg">
            <tr>
              <th className="sno-col">{languageTranslation("S_NO")}</th>
              <th className="date-col">{languageTranslation("DATE")}</th>
              <th className="type-col">{languageTranslation("TYPE")}</th>
              <th className="amount-col">{languageTranslation("AMOUNT")}</th>
              <th className="remarks-col">{languageTranslation("COMMENT")}</th>
              <th className="paid-col">{languageTranslation("PAID")}</th>
            </tr>
          </thead>
          <tbody>
          {loading ? (
              <div className='table-loader'>
                <Loader />
                </div>
                      ) : payslipDetails &&
                        payslipDetails.getAllPayslipCaregiver &&
                        payslipDetails.getAllPayslipCaregiver.length ? 
                          payslipDetails.getAllPayslipCaregiver.map((element: any, index: number) => {
                            return(<tr>
              <td colSpan={12}>
                <div className="date-title">
                  <span className="align-middle mr-2">
                    <i className="icon-arrow-down" />
                  </span>
                          <span className="align-middle ">{languageTranslation("DATE")}: {element.year}</span>
                </div>
                <div>
                  <Table
                    bordered
                    hover
                    responsive
                    className="inner-payslip-table"
                  >
                    <tbody>
                      {loading ? (
                        <div className='table-loader'>
                          <Loader />
                        </div>
                      ) : element &&
                        element.payslips &&
                        element.payslips.length ? 
                        element.payslips.map((d: any, index: number) => {
                            return(<tr>
                        <td className="sno-col">{index}</td>
                        <td className="date-col">
                          {moment(d .date).format(
                                defaultDateFormat ,
                              )}</td>
                        <td className="type-col"> {"Permanent Employee"} </td>
                        <td className="amount-col">{d.totalSalary}</td>
                        <td className="remarks-col">{d.remarks}</td>
                        <td className="paid-col">{d.totalSalary}</td>
                      </tr>)
                        }) : 
                        null }
                    
                    </tbody>
                  </Table>
                </div>
              </td>
            </tr>)
              }) : 
            null }
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default PaySlip;
