import React, { Component } from "react";
import { Table } from "reactstrap";
class Invoices extends Component {
  render() {
    return (
      <>
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
                    <span className="date-title">Date: 2013</span>
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
