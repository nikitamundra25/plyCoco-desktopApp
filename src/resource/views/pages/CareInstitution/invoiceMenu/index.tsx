import React, { Component, FunctionComponent } from "react";
import { Table, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { languageTranslation } from "../../../../../helpers";
import "../careinstitution.scss";

const InvoiceMenu: FunctionComponent = () => {
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
                    {languageTranslation("INVOICES_NUMBER")}
                  </th>
                  <th className="date-col">{languageTranslation("DATE")}</th>
                  <th className="caregiver-col">
                    {languageTranslation("MENU_CAREGIVER")}
                  </th>
                  <th className="amount-col">
                    {languageTranslation("AMOUNT")}{" "}
                  </th>
                  <th className="due-date-col">
                    {languageTranslation("DUE_DATE")}
                  </th>

                  <th className="dln-col">{languageTranslation("DLN")}</th>
                  <th className="remarks-col">
                    {languageTranslation("COMMENT")}
                  </th>
                  <th className="action-col text-center">
                    {languageTranslation("TABEL_HEAD_CG_ACTION")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
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
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
                      </span>
                      <span className="btn-icon " id={`resend`}>
                        <UncontrolledTooltip placement="top" target={`resend`}>
                          Send the invoice to the care institution again
                        </UncontrolledTooltip>
                        <i className="fa fa-reply"></i>
                      </span>
                    </div>
                  </td>
                </tr> <tr>
                  <td className="sno-col">1</td>
                  <td className="invoiceid-col">230001</td>
                  <td className="date-col">29.04.2019</td>
                  <td className="caregiver-col">
                    <Link to="#" className="view-more-link one-line-text">
                      caregiver
                    </Link>
                  </td>
                  <td className="amount-col">2,190.50</td>
                  <td className="due-date-col">30.04.2019</td>

                  <td className="dln-col">
                    <div>Invioce support.pdf</div>
                  </td>
                  <td className="remarks-col word-wrap">Remarks</td>
                  <td className="action-col text-center">
                    <div className="action-btn">
                      <span className="btn-icon mr-2" id={`open`}>
                        <UncontrolledTooltip placement="top" target={`open`}>
                          Open Invoice
                        </UncontrolledTooltip>
                        <i className="fa fa-eye"></i>
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

export default InvoiceMenu;
