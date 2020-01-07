import React, { Component } from "react";
import { Table } from "reactstrap";
class Invoices extends Component {
  render() {
    return (
      <>
        <div className="carelogin-section">
          <div>
            <h5 className="content-title">Invoices</h5>
            <Table bordered hover responsive>
              <thead className="thead-bg">
                <tr>
                  <th>Date</th>
                  <th>Computer</th>
                  <th>Browser</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-success">
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
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
