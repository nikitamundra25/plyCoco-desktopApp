import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";
import {
  Table,
} from "reactstrap";
import { languageTranslation } from "../../../../../helpers";
import moment from "moment";
import { Link } from "react-router-dom";
import "../index.scss";
import { defaultDateFormat, ARCHIVE_PAGE_LIMIT } from "../../../../../config";
import { useHistory, useLocation } from 'react-router-dom';
import PaginationComponent from '../../../components/Pagination';
import * as qs from 'query-string';
import Loader from "../../../containers/Loader/Loader";

const InvoiceListView: FunctionComponent<RouteComponentProps> & any = (
  mainProps: any
) => {
  const { search, pathname } = useLocation();
  const { invoiceList, currentPage,totalCount, handleCheckedChange, invoiceListLoading } = mainProps
  let count = (currentPage - 1) * ARCHIVE_PAGE_LIMIT + 1;
  let history = useHistory();
  const onPageChanged = (currentPage: number) => {
    const query = qs.parse(search);
    const path = [pathname, qs.stringify({ ...query, page: currentPage })].join(
      '?',
    );
    history.push(path);
  };

  console.log("Employeeeeeeeeeeeeeeeeee",totalCount);
  
  return (
    <>
      <div className="table-minheight invoices-table">
        <Table bordered hover responsive>
          <thead className="thead-bg">
            <tr>
              <th className="invoiceid-col">
                {" "}
                {languageTranslation("NUMBER")}{" "}
              </th>
              <th className="careinstitution-col">
                {languageTranslation("MENU_INSTITUTION")}
              </th>
              <th className="caregiver-col">
                {" "}
                {languageTranslation("MENU_CAREGIVER")}
              </th>
              <th className="cancel-col">
                {" "}
                {languageTranslation("CANCELLATION_FOR")}{" "}
              </th>
              <th className="cancel-col">
                {" "}
                {languageTranslation("CANCELED_BY")}
              </th>
              <th className="invoiceid-col">
                {" "}
                {languageTranslation("INVOICE_NUMBER_F")}
              </th>
              <th className="date-col">
                {languageTranslation("DATE")}
              </th>
              <th className="amount-col">
                {languageTranslation("AMOUNT")}
              </th>
              <th className="date-col">
                {languageTranslation("POST")}
              </th>
              <th className="date-col">
                {languageTranslation("SENT_POST")}
              </th>

              <th className="date-col">
                {languageTranslation("PAID")}
              </th>
              <th className="date-col">
                {languageTranslation("REMIND")}
              </th>
              <th className="date-col">
                {languageTranslation("REMINDED")}
              </th>
              <th className="date-col">
                {languageTranslation("LAWYER")}
              </th>
              <th className="checkbox-col">
                {languageTranslation("DOUBTFUL")}
              </th>
              <th className="checkbox-col">
                {languageTranslation("IRRECOVERABLE")}
              </th>
              <th className="amount-col">
                {languageTranslation("COST")}
              </th>
              <th className="amount-col">
                {languageTranslation("SALARY_AMOUNT")}
              </th>
              <th className="amount-col">
                {languageTranslation("STILL_OPEN")}
              </th>
              <th className="comment-col">
                {languageTranslation("COMMENT")}
              </th>
            </tr>
          </thead>
          <tbody>
          {invoiceListLoading ? (
              <tr>
                <td className={'table-loader'} colSpan={22}>
                  <Loader />
                </td>
              </tr>
            ) :
              invoiceList && invoiceList.getInvoices && invoiceList.getInvoices.result && invoiceList.getInvoices.result.length ? invoiceList.getInvoices.result.map((invoiceData: any, index: number) => {
                return (
                  <tr key={index}>
                    <td className="invoiceid-col">
                      <span className=" checkbox-custom pl-4">
                        <input
                          type="checkbox"
                          id="check"
                          className=""
                          name={"status"}
                          onChange={(e: any) => handleCheckedChange(e, invoiceData)}
                        // checked={"true"}
                        />
                        <label className="">{count++}</label>
                      </span>
                    </td>
                    <td className="careinstitution-col">
                      {" "}
                      <Link to="#" className="view-more-link">
                        {invoiceData.careInstitutionName}
                      </Link>
                    </td>
                    <td className="caregiver-col">
                      {" "}
                      <Link to="#" className="view-more-link">
                        {invoiceData.careGiverName}
                      </Link>
                    </td>
                    <td className="cancel-col"></td>
                    <td className="cancel-col"></td>
                    <td className="invoiceid-col">{invoiceData.invoiceNumber}</td>
                    <td className="date-col">{moment(invoiceData.invoiceDate).format(defaultDateFormat)}</td>
                    <td className="amount-col">{parseFloat(invoiceData.amount).toFixed(2)}</td>
                    <td className="date-col"></td>
                    <td className="date-col"></td>
                    <td className="date-col"></td>
                    <td className="date-col"></td>
                    <td className="date-col"></td>
                    <td className="date-col"></td>
                    <td className="checkbox-col">
                      <span className="checkbox-custom ">
                        <input type="checkbox" id="checkAll" className="" />
                        <label className=""> </label>
                      </span>
                    </td>
                    <td className="checkbox-col">
                      <span className="checkbox-custom ">
                        <input type="checkbox" id="checkAll" className="" />
                        <label className=""> </label>
                      </span>
                    </td>
                    <td className="amount-col"></td>
                    <td className="amount-col"></td>
                    <td className="amount-col"></td>

                    <td className="comment-col">
                      <span className="word-wrap"></span>
                    </td>
                  </tr>
                )
              }) : <tr className={'text-center no-hover-row'}>
              <td colSpan={12} className={'pt-5 pb-5'}>
                <div className='no-data-section'>
                  <div className='no-data-icon'>
                    <i className='icon-ban' />
                  </div>
                  <h4 className='mb-1'>
                    {languageTranslation('NO_INVOICE_LIST')}{' '}
                  </h4>
                </div>
              </td>
            </tr>
            }
          </tbody>
        </Table>
      </div>
      {totalCount ? (
        <>
        <PaginationComponent
          totalRecords={totalCount}
          currentPage={currentPage}
          onPageChanged={onPageChanged}
        />
        </>
      ) : null}
    </>
  );
};
export default InvoiceListView;