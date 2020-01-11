import React, { Component } from "react";
import { Table, FormGroup, exampleSelect, Label, Input } from "reactstrap";
import { languageTranslation } from "../../../helpers";
import "./index.scss";


class ToDo extends Component {
  render() {
    return (
      <>
        <div className="todo-section">
          <div>
            <h5 className="content-title">{languageTranslation("TODO")}</h5>

            <Table responsive className="todolist-table">
              <thead className="thead-bg">
                <tr>
                  <th className="date-col">{languageTranslation("DATE")} </th>
                  <th className="remarks-col">
                    {languageTranslation("REMARKS")}
                  </th>
                  <th className="done-col"> {languageTranslation("DONE")}</th>
                  <th className="extreme-col">
                    {" "}
                    {languageTranslation("EXTREME")}
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
                  <td colSpan={5}>
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
                        className="inner-tododlist-table"
                      >
                        <tbody>
                          <tr>
                            <td className="date-col">30.12.2020</td>
                            <td className="remarks-col">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
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
                            <td className="extreme-col">
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
                                <FormGroup className="todo-select">
                                  <Input
                                    type="select"
                                    name="select"
                                    id="exampleSelect"
                                  >
                                    <option>Name</option>
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
                  <td colSpan={5}>
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
                        className="inner-tododlist-table"
                      >
                        <tbody>
                          <tr>
                            <td className="date-col">30.12.2020</td>
                            <td className="remarks-col">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
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
                            <td className="extreme-col">
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
                                <FormGroup className="todo-select">
                                  <Input
                                    type="select"
                                    name="select"
                                    id="exampleSelect"
                                  >
                                    <option>Name</option>
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
                  <td colSpan={5}>
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
                        className="inner-tododlist-table"
                      >
                        <tbody>
                          <tr>
                            <td className="date-col">30.12.2020</td>
                            <td className="remarks-col">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
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
                            <td className="extreme-col">
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
                                <FormGroup className="todo-select">
                                  <Input
                                    type="select"
                                    name="select"
                                    id="exampleSelect"
                                  >
                                    <option>Name</option>
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
export default ToDo;
