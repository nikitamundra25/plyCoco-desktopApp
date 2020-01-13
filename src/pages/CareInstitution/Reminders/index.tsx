import React, { Component } from "react";
import { Table, FormGroup, exampleSelect, Label, Input,FormFeedback,FormText } from "reactstrap";
import { languageTranslation } from "../../../helpers";
import "./index.scss";

class Reminders extends Component<any, any> {
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
        <div className="carelnstitution-reminders-section">
          <div>
            <h5 className="content-title">
              {languageTranslation("REMINDERS")}
            </h5>

            <Table responsive className="reminders-todo-table">
              <thead className="thead-bg">
                <tr>
                  <th className="date-col">{languageTranslation("DATE")} </th>
                  <th className="contact-col">
                    {" "}
                    {languageTranslation("CONTACT")}{" "}
                  </th>
                  <th className="remarks-col">
                    {" "}
                    {languageTranslation("REMARKS")}
                  </th>
                  <th className="done-col"> {languageTranslation("DONE")} </th>
                  <th className="external-col">
                    {" "}
                    {languageTranslation("EXTERNAL")}
                  </th>
                  <th className="prio-col"> {languageTranslation("PRIO")}</th>

                  {/* <th className="remarks-col">
                    {" "}
                    {languageTranslation("REMARKS")}{" "}
                  </th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6}>
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
                        className="inner-reminders-todo-table"
                      >
                        <tbody>
                          <tr>
                            <td className="date-col">30.12.2020</td>
                            <td className="contact-col">Mantel (PDL)</td>
                            <td className="remarks-col">
                              Akquise AH, 10:30 Jule
                            </td>
                            <td className="done-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""> </label>
                              </span>
                            </td>
                            <td className="external-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""> </label>
                              </span>
                            </td>
                            <td className="prio-col">
                              <div className="form-section">
                                <FormGroup className="mb-0 border-0">
                                  <Input
                                    type="select"
                                    name="select"
                                    id="exampleSelect"
                                    className=" border-0"
                                  >
                                   
                                    <option>low</option>
                                    <option>Normal</option>
                                    <option>high</option>
                                  </Input>
                                </FormGroup>
                              </div>
                            </td>
                            {/*  <td className="remarks-col">Remarks</td> */}
                          </tr>
                          <tr>
                            <td className="date-col">30.12.2020</td>
                            <td className="contact-col">Mantel (PDL)</td>
                            <td className="remarks-col">
                              Akquise AH, 10:30 Jule
                            </td>
                            <td className="done-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""> </label>
                              </span>
                            </td>
                            <td className="external-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""> </label>
                              </span>
                            </td>
                            <td className="prio-col">
                              <div className="form-section">
                                <FormGroup className="mb-0">
                                  <Input
                                    type="select"
                                    name="select"
                                    id="exampleSelect"
                                    className=" border-0"
                                  >
                                   
                                    <option>low</option>
                                    <option>Normal</option>
                                    <option>high</option>
                                  </Input>
                                </FormGroup>
                              </div>
                            </td>
                            {/*  <td className="remarks-col">Remarks</td> */}
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={6}>
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
                        className="inner-reminders-todo-table"
                      >
                        <tbody>
                          <tr>
                            <td className="date-col">30.12.2020</td>
                            <td className="contact-col">Mantel (PDL)</td>
                            <td className="remarks-col">
                              Akquise AH, 10:30 Jule
                            </td>
                            <td className="done-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""> </label>
                              </span>
                            </td>
                            <td className="external-col">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""> </label>
                              </span>
                            </td>
                            <td className="prio-col">
                              <div className="form-section">
                                <FormGroup className="mb-0">
                                  <Input
                                    type="select"
                                    name="select"
                                    id="exampleSelect"
                                    className=" border-0"
                                  >
                                   
                                    <option>low</option>
                                    <option>Normal</option>
                                    <option>high</option>
                                  </Input>
                                </FormGroup>
                              </div>
                            </td>
                            {/*  <td className="remarks-col">Remarks</td> */}
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
      </>
    );
  }
}
export default Reminders;
