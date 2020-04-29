import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";
import {
  Table,
} from "reactstrap";
import { languageTranslation } from "../../../../../helpers";
import moment from "moment";
import { Link } from "react-router-dom";
import "../index.scss";
import { defaultDateFormat, PAGE_LIMIT } from "../../../../../config";

const InvoiceListView: FunctionComponent<RouteComponentProps> & any = (
  mainProps: any
) => {
  const { invoiceList, currentPage, handleCheckedChange } = mainProps
  let count = (currentPage - 1) * PAGE_LIMIT + 1;
  return (
    <>
      <div className="table-minheight invoices-table">
        <Table bordered hover responsive>
          <thead className="thead-bg">
            <tr>
              <th className="sno-col">{languageTranslation("S_NO")}</th>
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
            {
              invoiceList && invoiceList.getInvoices && invoiceList.getInvoices.result && invoiceList.getInvoices.result.length ? invoiceList.getInvoices.result.map((invoiceData: any, index: number) => {
                return (
                  <tr key={index}>
                    <td className="checkbox-th-column text-center">
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
                    <td className="invoiceid-col"> {invoiceData.id}</td>
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
                    <td className="date-col">17-09-2013</td>
                    <td className="date-col"></td>
                    <td className="date-col"></td>
                    <td className="date-col">16-09-2013</td>
                    <td className="date-col">16-09-2013</td>
                    <td className="date-col">16-09-2013</td>
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
                    <td className="amount-col">234.02</td>
                    <td className="amount-col">234.02</td>
                    <td className="amount-col">234.02</td>

                    <td className="comment-col">
                      <span className="word-wrap">am 16.00</span>
                    </td>
                  </tr>
                )
              }) : null
            }
          </tbody>
        </Table>
      </div>

    </>
  );
};
export default InvoiceListView;