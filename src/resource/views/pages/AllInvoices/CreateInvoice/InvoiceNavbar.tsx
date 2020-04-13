import React, { FunctionComponent, useState } from "react";
import {
 UncontrolledTooltip,
  Table,
} from 'reactstrap';
import { languageTranslation } from '../../../../../helpers';
import { IInvoiceList } from '../../../../../interfaces';

const InvoiceNavbar: FunctionComponent<IInvoiceList> = (props: IInvoiceList) => {
  const {

  } = props;

  return (
    <div className="table-minheight createinvoices-table">
    <Table bordered hover responsive>
      <thead className="thead-bg">
        <tr>
          <th className="sno-col">{languageTranslation("S_NO")}</th>
          <th className="invoiceid-col">
            {" "}
            {languageTranslation("ID")}
          </th>
          <th className="h-col">h</th>
          <th className="text-col">
            {" "}
            {languageTranslation("TEXT")}
          </th>
          <th className="datetime-col">
            {languageTranslation("BEGIN")}
          </th>
          <th className="datetime-col">
            {languageTranslation("THE_END")}
          </th>
          <th className="datetime-col">
            {languageTranslation("BREAK")}{" "}
            {languageTranslation("BEGIN")}
          </th>
          <th className="datetime-col">
            {languageTranslation("BREAK")}{" "}
            {languageTranslation("END")}
          </th>
          <th className="price-col">
            {" "}
            {languageTranslation("PRICE")}
          </th>
          <th className="price-col">
            {languageTranslation("NIGHT")}
          </th>
          <th className="price-col">
            {languageTranslation("NIGHT")}
          </th>
          <th className="price-col">
            {languageTranslation("WEEKEND")}
          </th>
          <th className="price-col">
            {languageTranslation("WEEKEND")}
          </th>
          <th className="price-col">
            {languageTranslation("HOLIDAY")}
          </th>
          <th className="price-col">
            {languageTranslation("HOLIDAY")}
          </th>
          <th className="price-col">
            {" "}
            {languageTranslation("KM")}
          </th>
          <th className="price-col">
            {languageTranslation("KM_PRICE")}
          </th>
          <th className="price-col">
            {languageTranslation("EXPENSES")}
          </th>
          <th className="price-col">
            {languageTranslation("TOTAL")}
          </th>
          <th className="price-col">
            {languageTranslation("COMMISSION")}
          </th>
          <th className="price-col">
            {languageTranslation("TOTAL")}
          </th>
          <th className={"text-center action-col"}>
            {languageTranslation("TABEL_HEAD_CG_ACTION")}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="sno-col">
          <td className="checkbox-th-column text-center">
            <span className=" checkbox-custom pl-4">
              <input
                type="checkbox"
                id="check"
                className=""
                name={"status"}
                // checked={"true"}
              />
              <label className="">1</label>
            </span>
          </td>
          <td className="invoiceid-col"> 5465465</td>
          <td className="h-col"> 12.00</td>

          <td className="text-col">WG in leipzig</td>
          <td className="datetime-col">Mon 03.03.2020 19:00</td>
          <td className="datetime-col">Mon 03.03.2020 19:00</td>
          <td className="datetime-col">Mon 03.03.2020 19:00</td>
          <td className="datetime-col">Mon 03.03.2020 19:00</td>
          <td className="price-col">3,200.00 &euro;</td>
          <td className="price-col">00.00 &euro;</td>
          <td className="price-col">00.00 &euro;</td>
          <td className="price-col">00.00 &euro;</td>
          <td className="price-col">00.00 &euro;</td>
          <td className="price-col">00.00 &euro;</td>
          <td className="price-col">00.00 &euro;</td>
          <td className="price-col">00.00 </td>
          <td className="price-col">00.30 &euro;</td>
          <td className="price-col">00.00 &euro;</td>
          <td className="price-col">384.00 &euro;</td>
          <td className="price-col">384.00 &euro;</td>
          <td className="price-col">34584.00 &euro;</td>
          <td className="action-col">
            <div className="action-btn">
              <span className="btn-icon mr-2" id={`viewcaregiver`}>
                <UncontrolledTooltip
                  placement="top"
                  target={`viewcaregiver`}
                >
                  View Caregiver Profile
                </UncontrolledTooltip>
                <i className="fa fa-eye"></i>
              </span>
              <span
                className="btn-icon mr-2"
                id={`viewcareinstitution`}
              >
                <UncontrolledTooltip
                  placement="top"
                  target={`viewcareinstitution`}
                >
                  View Care Institution Profile
                </UncontrolledTooltip>
                <i className="fa fa-eye"></i>
              </span>
              <span
                className="btn-icon mr-2"
                id={`appointmentdetails`}
              >
                <UncontrolledTooltip
                  placement="top"
                  target={`appointmentdetails`}
                >
                  Show Appointment Details
                </UncontrolledTooltip>
                <i className="fa fa-calendar"></i>
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
  </div>
  );
};

export default InvoiceNavbar;