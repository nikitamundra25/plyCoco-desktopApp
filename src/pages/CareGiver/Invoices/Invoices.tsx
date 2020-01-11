import React, { Component } from "react";
import { Table } from "reactstrap";
import { languageTranslation } from "../../../helpers";
import "./index.scss";
class Invoices extends Component {
  render() {
    return (
      <>
        <div className="invoice-section">
          <div>
            <h5 className="content-title">{languageTranslation("INVOICES")}</h5>

            <Table responsive className="invoice-table">
              <thead className="thead-bg">
                <tr>
                  <th>Institution ID</th>
                  <th>Cancellation For</th>
                  <th>Cancelled By</th>
                  <th>Facility</th>
                  <th>{languageTranslation("DATE")} </th>
                  <th>{languageTranslation("AMOUNT")}</th>
                  <th>Vat</th>
                  <th> {languageTranslation("DUE_DATE")} </th>
                  <th>Factoring</th>
                  <th>Sent BF</th>
                  <th> {languageTranslation("REMARKS")} </th>
                  <th className="sno-col">{languageTranslation("S_NO")} </th>
                  <th className="invoice-number-col">
                    {languageTranslation("INVOICES_NUMBER")}{" "}
                  </th>
                  <th className="invoice-date-col">
                    {languageTranslation("INVOICES_DATE")}{" "}
                  </th>
                  <th className="caregiver-name-col">
                    {languageTranslation("CAREGIVER_NAME")}{" "}
                  </th>
                  <th className="amount-col">
                    {languageTranslation("AMOUNT")}{" "}
                  </th>
                  <th className="due-date-col">
                    {languageTranslation("DUE_DATE")}{" "}
                  </th>
                  <th className="status-col">
                    {languageTranslation("STATUS")}{" "}
                  </th>
                  <th className="supported-documents-col">
                    {languageTranslation("SUPPORTED_DOCUMENTS")}{" "}
                  </th>
                  <th className="remarks-col">
                    {languageTranslation("REMARKS")}{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={11}>
                    <div className="date-title">
                      <span className="align-middle mr-2">
                        <i className="icon-arrow-down" />
                      </span>
                      <span className="align-middle ">Date: 2019</span>
                    </div>
                    <div>
                      <Table
                        bordered
                        hover
                        responsive
                        className="inner-invoice-table"
                      >
                        <tbody>
                          <tr>
                            <td className="sno-col">1</td>
                            <td className="invoice-number-col">230001</td>
                            <td className="invoice-date-col">29.04.2019</td>
                            <td className="caregiver-name-col">John Doe</td>
                            <td className="amount-col">2,190.50</td>
                            <td className="due-date-col">30.04.2019</td>
                            <td className="status-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""></label>
                              </span>
                            </td>
                            <td className="supported-documents-col">
                              <div>Invioce support.pdf</div>
                            </td>
                            <td className="remarks-col">trytuiyoiuo khjldsj</td>
                          </tr>
                          <tr>
                            <td className="sno-col">2</td>
                            <td className="invoice-number-col">230001</td>
                            <td className="invoice-date-col">29.04.2019</td>
                            <td className="caregiver-name-col">John Doe</td>
                            <td className="amount-col">2,190.50</td>
                            <td className="due-date-col">30.04.2019</td>
                            <td className="status-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""></label>
                              </span>
                            </td>
                            <td className="supported-documents-col">
                              <div>Invioce support.pdf</div>
                            </td>
                            <td className="remarks-col">trytuiyoiuo khjldsj</td>
                          </tr>
                          <tr>
                            <td className="sno-col">3</td>
                            <td className="invoice-number-col">230001</td>
                            <td className="invoice-date-col">29.04.2019</td>
                            <td className="caregiver-name-col">John Doe</td>
                            <td className="amount-col">2,190.50</td>
                            <td className="due-date-col">30.04.2019</td>
                            <td className="status-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""></label>
                              </span>
                            </td>
                            <td className="supported-documents-col">
                              <div>Invioce support.pdf</div>
                            </td>
                            <td className="remarks-col">trytuiyoiuo khjldsj</td>
                          </tr>
                          <tr>
                            <td className="sno-col">4</td>
                            <td className="invoice-number-col">230001</td>
                            <td className="invoice-date-col">29.04.2019</td>
                            <td className="caregiver-name-col">John Doe</td>
                            <td className="amount-col">2,190.50</td>
                            <td className="due-date-col">30.04.2019</td>
                            <td className="status-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""></label>
                              </span>
                            </td>
                            <td className="supported-documents-col">
                              <div>Invioce support.pdf</div>
                            </td>
                            <td className="remarks-col">trytuiyoiuo khjldsj</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td colSpan={11}>
                    <div className="date-title">
                      <span className="align-middle mr-2">
                        <i className="icon-arrow-down" />
                      </span>
                      <span className="align-middle ">Date: 2018</span>
                    </div>
                    <div>
                      <Table
                        bordered
                        hover
                        responsive
                        className="inner-invoice-table"
                      >
                        <tbody>
                          <tr>
                            <td className="sno-col">5</td>
                            <td className="invoice-number-col">230001</td>
                            <td className="invoice-date-col">29.04.2019</td>
                            <td className="caregiver-name-col">John Doe</td>
                            <td className="amount-col">2,190.50</td>
                            <td className="due-date-col">30.04.2019</td>
                            <td className="status-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""></label>
                              </span>
                            </td>
                            <td className="supported-documents-col">
                              <div>Invioce support.pdf</div>
                            </td>
                            <td className="remarks-col">trytuiyoiuo khjldsj</td>
                          </tr>
                          <tr>
                            <td className="sno-col">6</td>
                            <td className="invoice-number-col">230001</td>
                            <td className="invoice-date-col">29.04.2019</td>
                            <td className="caregiver-name-col">John Doe</td>
                            <td className="amount-col">2,190.50</td>
                            <td className="due-date-col">30.04.2019</td>
                            <td className="status-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""></label>
                              </span>
                            </td>
                            <td className="supported-documents-col">
                              <div>Invioce support.pdf</div>
                            </td>
                            <td className="remarks-col">trytuiyoiuo khjldsj</td>
                          </tr>
                          <tr>
                            <td className="sno-col">7</td>
                            <td className="invoice-number-col">230001</td>
                            <td className="invoice-date-col">29.04.2019</td>
                            <td className="caregiver-name-col">John Doe</td>
                            <td className="amount-col">2,190.50</td>
                            <td className="due-date-col">30.04.2019</td>
                            <td className="status-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""></label>
                              </span>
                            </td>
                            <td className="supported-documents-col">
                              <div>Invioce support.pdf</div>
                            </td>
                            <td className="remarks-col">trytuiyoiuo khjldsj</td>
                          </tr>
                          <tr>
                            <td className="sno-col">8</td>
                            <td className="invoice-number-col">230001</td>
                            <td className="invoice-date-col">29.04.2019</td>
                            <td className="caregiver-name-col">John Doe</td>
                            <td className="amount-col">2,190.50</td>
                            <td className="due-date-col">30.04.2019</td>
                            <td className="status-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""></label>
                              </span>
                            </td>
                            <td className="supported-documents-col">
                              <div>Invioce support.pdf</div>
                            </td>
                            <td className="remarks-col">trytuiyoiuo khjldsj</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td colSpan={11}>
                    <div className="date-title">
                      <span className="align-middle mr-2">
                        <i className="icon-arrow-down" />
                      </span>
                      <span className="align-middle ">Date: 2017</span>
                    </div>
                    <div>
                      <Table
                        bordered
                        hover
                        responsive
                        className="inner-invoice-table"
                      >
                        <tbody>
                          <tr>
                            <td className="sno-col">9</td>
                            <td className="invoice-number-col">230001</td>
                            <td className="invoice-date-col">29.04.2019</td>
                            <td className="caregiver-name-col">John Doe</td>
                            <td className="amount-col">2,190.50</td>
                            <td className="due-date-col">30.04.2019</td>
                            <td className="status-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""></label>
                              </span>
                            </td>
                            <td className="supported-documents-col">
                              <div>Invioce support.pdf</div>
                            </td>
                            <td className="remarks-col">trytuiyoiuo khjldsj</td>
                          </tr>
                          <tr>
                            <td className="sno-col">10</td>
                            <td className="invoice-number-col">230001</td>
                            <td className="invoice-date-col">29.04.2019</td>
                            <td className="caregiver-name-col">John Doe</td>
                            <td className="amount-col">2,190.50</td>
                            <td className="due-date-col">30.04.2019</td>
                            <td className="status-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""></label>
                              </span>
                            </td>
                            <td className="supported-documents-col">
                              <div>Invioce support.pdf</div>
                            </td>
                            <td className="remarks-col">trytuiyoiuo khjldsj</td>
                          </tr>
                          <tr>
                            <td className="sno-col">11</td>
                            <td className="invoice-number-col">230001</td>
                            <td className="invoice-date-col">29.04.2019</td>
                            <td className="caregiver-name-col">John Doe</td>
                            <td className="amount-col">2,190.50</td>
                            <td className="due-date-col">30.04.2019</td>
                            <td className="status-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""></label>
                              </span>
                            </td>
                            <td className="supported-documents-col">
                              <div>Invioce support.pdf</div>
                            </td>
                            <td className="remarks-col">trytuiyoiuo khjldsj</td>
                          </tr>
                          <tr>
                            <td className="sno-col">12</td>
                            <td className="invoice-number-col">230001</td>
                            <td className="invoice-date-col">29.04.2019</td>
                            <td className="caregiver-name-col">John Doe</td>
                            <td className="amount-col">2,190.50</td>
                            <td className="due-date-col">30.04.2019</td>
                            <td className="status-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""></label>
                              </span>
                            </td>
                            <td className="supported-documents-col">
                              <div>Invioce support.pdf</div>
                            </td>
                            <td className="remarks-col">trytuiyoiuo khjldsj</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td colSpan={11}>
                    <div className="date-title">
                      <span className="align-middle mr-2">
                        <i className="icon-arrow-down" />
                      </span>
                      <span className="align-middle ">Date: 2016</span>
                    </div>
                    <div>
                      <Table
                        bordered
                        hover
                        responsive
                        className="inner-invoice-table"
                      >
                        <tbody>
                          <tr>
                            <td className="sno-col">13</td>
                            <td className="invoice-number-col">230001</td>
                            <td className="invoice-date-col">29.04.2019</td>
                            <td className="caregiver-name-col">John Doe</td>
                            <td className="amount-col">2,190.50</td>
                            <td className="due-date-col">30.04.2019</td>
                            <td className="status-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""></label>
                              </span>
                            </td>
                            <td className="supported-documents-col">
                              <div>Invioce support.pdf</div>
                            </td>
                            <td className="remarks-col">trytuiyoiuo khjldsj</td>
                          </tr>
                          <tr>
                            <td className="sno-col">14</td>
                            <td className="invoice-number-col">230001</td>
                            <td className="invoice-date-col">29.04.2019</td>
                            <td className="caregiver-name-col">John Doe</td>
                            <td className="amount-col">2,190.50</td>
                            <td className="due-date-col">30.04.2019</td>
                            <td className="status-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""></label>
                              </span>
                            </td>
                            <td className="supported-documents-col">
                              <div>Invioce support.pdf</div>
                            </td>
                            <td className="remarks-col">trytuiyoiuo khjldsj</td>
                          </tr>
                          <tr>
                            <td className="sno-col">15</td>
                            <td className="invoice-number-col">230001</td>
                            <td className="invoice-date-col">29.04.2019</td>
                            <td className="caregiver-name-col">John Doe</td>
                            <td className="amount-col">2,190.50</td>
                            <td className="due-date-col">30.04.2019</td>
                            <td className="status-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""></label>
                              </span>
                            </td>
                            <td className="supported-documents-col">
                              <div>Invioce support.pdf</div>
                            </td>
                            <td className="remarks-col">trytuiyoiuo khjldsj</td>
                          </tr>
                          <tr>
                            <td className="sno-col">16</td>
                            <td className="invoice-number-col">230001</td>
                            <td className="invoice-date-col">29.04.2019</td>
                            <td className="caregiver-name-col">John Doe</td>
                            <td className="amount-col">2,190.50</td>
                            <td className="due-date-col">30.04.2019</td>
                            <td className="status-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""></label>
                              </span>
                            </td>
                            <td className="supported-documents-col">
                              <div>Invioce support.pdf</div>
                            </td>
                            <td className="remarks-col">trytuiyoiuo khjldsj</td>
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
        <div className="careinvoice-section">
          <div>
            <h5 className="content-title">Invoices</h5>
            <Table bordered hover responsive>
              <thead className="thead-bg">
                <tr>
                  <th>Institution ID</th>
                  <th>Cancellation For</th>
                  <th>Cancelled By</th>
                  <th>Facility</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Vat</th>
                  <th>Posted Date</th>
                  <th>Factoring</th>
                  <th>Sent BF</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={11}>
                    <div className="date-title">
                      <span className="align-middle mr-2">
                        <i className="icon-arrow-down" />
                      </span>
                      <span className="align-middle ">Date: 2013</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>230001</td>
                  <td></td>
                  <td>230002</td>
                  <td>GZH</td>
                  <td>29.04.2019</td>
                  <td>2,190.50</td>
                  <td>0%</td>
                  <td>30.04.2019</td>
                  <td>
                    <span className="checkboxli checkbox-custom checkbox-default">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""></label>
                    </span>
                  </td>
                  <td>30.04.2019</td>
                  <td></td>
                </tr>
                <tr>
                  <td>230001</td>
                  <td></td>
                  <td>230002</td>
                  <td>GZH</td>
                  <td>29.04.2019</td>
                  <td>2,190.50</td>
                  <td>0%</td>
                  <td>30.04.2019</td>
                  <td>
                    <span className="checkboxli checkbox-custom checkbox-default">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""></label>
                    </span>
                  </td>
                  <td>30.04.2019</td>
                  <td></td>
                </tr>
                <tr>
                  <td>230001</td>
                  <td></td>
                  <td>230002</td>
                  <td>GZH</td>
                  <td>29.04.2019</td>
                  <td>2,190.50</td>
                  <td>0%</td>
                  <td>30.04.2019</td>
                  <td>
                    <span className="checkboxli checkbox-custom checkbox-default">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""></label>
                    </span>
                  </td>
                  <td>30.04.2019</td>
                  <td></td>
                </tr>
                <tr>
                  <td>230001</td>
                  <td></td>
                  <td>230002</td>
                  <td>GZH</td>
                  <td>29.04.2019</td>
                  <td>2,190.50</td>
                  <td>0%</td>
                  <td>30.04.2019</td>
                  <td>
                    <span className="checkboxli checkbox-custom checkbox-default">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""></label>
                    </span>
                  </td>
                  <td>30.04.2019</td>
                  <td></td>
                </tr>
                <tr>
                  <td>230001</td>
                  <td></td>
                  <td>230002</td>
                  <td>GZH</td>
                  <td>29.04.2019</td>
                  <td>2,190.50</td>
                  <td>0%</td>
                  <td>30.04.2019</td>
                  <td>
                    <span className="checkboxli checkbox-custom checkbox-default">
                      <input type="checkbox" id="checkAll" className="" />
                      <label className=""></label>
                    </span>
                  </td>
                  <td>30.04.2019</td>
                  <td></td>
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
