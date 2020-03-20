import React, { FunctionComponent } from "react";
import { Table, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import { languageTranslation } from "../../../../../helpers";
import "../caregiver.scss";

const Invoices: FunctionComponent = () => {
  return (
    <>
      <div className="invoice-section">
        <div>
          <h5 className="content-title">{languageTranslation("INVOICES")}</h5>
          <div className="table-minheight ">
            <Table responsive bordered hover className="invoice-table">
              <thead className="thead-bg">
                <tr>
                  <th className="sno-col">{languageTranslation("S_NO")} </th>
                  <th className="invoiceid-col">
                    {languageTranslation("INVOICES_NUMBER")}{" "}
                  </th>
                  <th className="cancellation-col">
                    {" "}
                    {languageTranslation("CANCELLATION_FOR")}
                  </th>
                  <th className="cancel-col">
                    {" "}
                    {languageTranslation("CANCELLED_BY")}
                  </th>
                  <th className="careinstitution-col">
                    {" "}
                    {languageTranslation("MENU_INSTITUTION")}
                  </th>
                  <th className="date-col">{languageTranslation("DATE")} </th>
                  <th className="amount-col">
                    {languageTranslation("AMOUNT")}
                  </th>
                  <th className="vat-col">{languageTranslation("VAT")}</th>
                  <th className="due-date-col">
                    {" "}
                    {languageTranslation("DUE_DATE")}{" "}
                  </th>
                  <th className="factoring-col">
                    {languageTranslation("FACTORING")}
                  </th>
                  <th className="sent-col">{languageTranslation("SENT_BF")}</th>
                  <th className="remarks-col">
                    {" "}
                    {languageTranslation("REMARKS")}{" "}
                  </th>

                  <th className="action-col text-center">
                    {" "}
                    {languageTranslation("TABEL_HEAD_CG_ACTION")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="cancellation-col"></td>
                  <td className="cancel-col">230002</td>
                  <td className="careinstitution-col">
                    <Link to="#" className="view-more-link one-line-text">
                      careinstitution
                    </Link>
                  </td>
                  <td className="date-col">29.04.2019</td>
                  <td className="amount-col">2,190.50</td>
                  <td className="vat-col">0%</td>
                  <td className="due-date-col">30.04.2019</td>
                  <td className="factoring-col">
                    <span className="checkbox-custom ">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""> </label>
                    </span>
                  </td>
                  <td className="sent-col">30.04.2019</td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`new`}>
                        <UncontrolledTooltip placement="top" target={`new`}>
                          Create New Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`cancel`}>
                        <UncontrolledTooltip placement="top" target={`cancel`}>
                          Cancel Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-times"></i>
                      </span>
                      <span className="btn-icon mr-2" id={`replace`}>
                        <UncontrolledTooltip placement="top" target={`replace`}>
                          Replace Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoices;
