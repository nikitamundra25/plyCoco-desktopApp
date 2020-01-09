import React, { Component } from "react";
import { Col, Row, Card, CardBody, Table } from "reactstrap";
import { RouteComponentProps } from "react-router";

class InvoiceMenu extends Component<RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      startDate: ""
    };
  }
  handleChange = (date: any) => {
    this.setState({
      startDate: date
    });
  };
  onFocus = () => {
    this.setState({
      error: true
    });
  };
  render() {
    return (
      <div className="careinvoice-section">
        <div>
          <h5 className="content-title">Invoices</h5>
          <div className="invoice-table">
            <div className="invoice-table-header">
              <div className="invoice-number">Invoice Number</div>
              <div className="invoice-date">Invoice Date</div>
              <div className="invoice-name">CareGiver Name</div>
              <div className="invoice-amount">Amount</div>
              <div className="invoice-date">Due Date</div>
              <div className="invoice-status">Status</div>
              <div className="invoice-documents">Supported documents</div>
              <div className="invoice-remarks">Remarks</div>
            </div>
          </div>
          <Table bordered hover responsive>
            <thead className="thead-bg">
              <tr>
                <th>Invoice Number</th>
                <th>Invoice Date</th>
                <th>CareGiver Name</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Supported documents</th>
                <th>Remarks</th>
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
                  <div>
                    <Table bordered hover responsive>
                      <tbody>
                        <tr>
                          <td>230001</td>
                          <td>29.04.2019</td>
                          <td>John Doe</td>
                          <td>2,190.50</td>
                          <td>30.04.2019</td>
                          <td>
                            <span className="checkboxli checkbox-custom checkbox-default">
                              <input
                                type="checkbox"
                                id="checkAll"
                                className=""
                              />
                              <label className=""></label>
                            </span>
                          </td>
                          <td>
                            <div>Invioce support.pdf</div>
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </td>
              </tr>

              {/* <tr>
                <td>230001</td>
                <td>29.04.2019</td>
                <td>John Doe</td>
                <td>2,190.50</td>
                <td>30.04.2019</td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>
                  <div>Invioce support.pdf</div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>230001</td>
                <td>29.04.2019</td>
                <td>John Doe</td>
                <td>2,190.50</td>
                <td>30.04.2019</td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>
                  <div>Invioce support.pdf</div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>230001</td>
                <td>29.04.2019</td>
                <td>John Doe</td>
                <td>2,190.50</td>
                <td>30.04.2019</td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>
                  <div>Invioce support.pdf</div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>230001</td>
                <td>29.04.2019</td>
                <td>John Doe</td>
                <td>2,190.50</td>
                <td>30.04.2019</td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>
                  <div>Invioce support.pdf</div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>230001</td>
                <td>29.04.2019</td>
                <td>John Doe</td>
                <td>2,190.50</td>
                <td>30.04.2019</td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>
                  <div>Invioce support.pdf</div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>230001</td>
                <td>29.04.2019</td>
                <td>John Doe</td>
                <td>2,190.50</td>
                <td>30.04.2019</td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>
                  <div>Invioce support.pdf</div>
                </td>
                <td></td>
              </tr> */}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
export default InvoiceMenu;
