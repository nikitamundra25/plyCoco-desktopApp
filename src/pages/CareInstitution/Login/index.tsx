import React, { Component } from "react";
import { Table } from "reactstrap";
import { RouteComponentProps } from "react-router";

class Login extends Component<RouteComponentProps, any> {
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
      <>
        <div className="carelogin-section">
          <div>
            <h5 className="content-title">Login History</h5>
            <Table bordered hover responsive>
              <thead className="thead-bg">
                <tr>
                  <th>Date</th>
                  <th>IP Address</th>
                  <th>Browser</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-success">
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className="table-success">
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>

                <tr className="table-success">
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className="table-danger">
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className="table-success">
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className="table-danger">
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className="table-success">
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className="table-success">
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className="table-danger">
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className="table-success">
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className="table-success">
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className="table-danger">
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
export default Login;
