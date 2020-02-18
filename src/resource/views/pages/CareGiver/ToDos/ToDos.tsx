import React, { FunctionComponent } from "react";
import {
  Row,
  Col,
  Table,
  FormGroup,
  Label,
  Input,
  UncontrolledTooltip
} from "reactstrap";
import { languageTranslation } from "../../../../../helpers";
import "../caregiver.scss";
import Select from "react-select";
import { Priority, TodoFilter } from "../../../../../config";

const ToDo: FunctionComponent = () => {
  return (
    <>
      <div className="todo-section">
        <h5 className="content-title">
          {languageTranslation("CG_SUB_MENU_REMINDER")}
        </h5>
        <div className="filter-form form-section">
          <Row>
            <Col lg={"3"} md={"3"}>
              <FormGroup className="mb-2">
                <Label className="col-form-label">
                  {languageTranslation("SEARCH_LABEL")} :
                </Label>
                <Input
                  type="text"
                  name="search"
                  id="search"
                  placeholder={languageTranslation("SEARCH_LABEL")}
                />
              </FormGroup>
            </Col>
            <Col lg={"2"} md={"3"}>
              <FormGroup>
                <Label className="col-form-label">
                  {languageTranslation("STATUS_LABEL")} :
                </Label>
                <Select
                  placeholder={languageTranslation("STATUS_PLACEHOLDER")}
                  classNamePrefix="custom-inner-reactselect"
                  className={"custom-reactselect"}
                  options={TodoFilter}
                />
              </FormGroup>
            </Col>
            <Col lg={"2"} md={"3"}>
              <div className="label-height"></div>
              <div className="filter-btn-wrap mb-2">
                <span className="btn-filter mr-2" id="search1">
                  <UncontrolledTooltip placement="top" target="search1">
                    {languageTranslation("SEARCH_LABEL")}
                  </UncontrolledTooltip>
                  <i className="fa fa-search mr-1"></i>
                  {languageTranslation("SEARCH_LABEL")}
                </span>
                <span className="btn-filter mr-2" id="reset">
                  <UncontrolledTooltip placement="top" target="reset">
                    {languageTranslation("RESET_LABEL")}
                  </UncontrolledTooltip>
                  <i className="fa fa-refresh mr-1"></i>
                  {languageTranslation("RESET_LABEL")}
                </span>
              </div>
            </Col>
          </Row>
        </div>

        <Table bordered hover responsive>
          <thead className="thead-bg">
            <tr>
              <th className="date-th-column">{languageTranslation("DATE")} </th>
              <th className="remark-col">{languageTranslation("REMARKS")}</th>
              <th className="checkbox-th-column text-center">
                {" "}
                {languageTranslation("DONE")}
              </th>
              <th className="checkbox-th-column text-center">
                {" "}
                {languageTranslation("EXTERNAL")}
              </th>
              <th className="prio-col"> {languageTranslation("PRIORITY")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="date-th-column">30.12.2020</td>
              <td className="remark-col">
                <span className="word-wrap">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </span>
              </td>
              <td className="checkbox-th-column text-center">
                <span className="checkboxli checkbox-custom checkbox-default">
                  <input type="checkbox" id="checkAll" className="" />
                  <label className=""> </label>
                </span>
              </td>
              <td className="checkbox-th-column text-center">
                <span className="checkboxli checkbox-custom checkbox-default">
                  <input type="checkbox" id="checkAll" className="" />
                  <label className=""> </label>
                </span>
              </td>
              <td className="priority-th-column">
                <Select
                  placeholder="Select Priority"
                  classNamePrefix="custom-inner-reactselect"
                  className={"custom-reactselect"}
                  options={Priority}
                />
              </td>
            </tr>
            <tr>
              <td className="date-th-column">30.12.2020</td>
              <td className="remark-col">
                <span className="word-wrap">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </span>
              </td>
              <td className="checkbox-th-column text-center">
                <span className="checkboxli checkbox-custom checkbox-default">
                  <input type="checkbox" id="checkAll" className="" />
                  <label className=""> </label>
                </span>
              </td>
              <td className="checkbox-th-column text-center">
                <span className="checkboxli checkbox-custom checkbox-default">
                  <input type="checkbox" id="checkAll" className="" />
                  <label className=""> </label>
                </span>
              </td>
              <td className="priority-th-column">
                <Select
                  placeholder="Select Priority"
                  classNamePrefix="custom-inner-reactselect"
                  className={"custom-reactselect"}
                  options={Priority}
                />
              </td>
            </tr>
            <tr>
              <td className="date-th-column">30.12.2020</td>
              <td className="remark-col">
                <span className="word-wrap">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </span>
              </td>
              <td className="checkbox-th-column text-center">
                <span className="checkboxli checkbox-custom checkbox-default">
                  <input type="checkbox" id="checkAll" className="" />
                  <label className=""> </label>
                </span>
              </td>
              <td className="checkbox-th-column text-center">
                <span className="checkboxli checkbox-custom checkbox-default">
                  <input type="checkbox" id="checkAll" className="" />
                  <label className=""> </label>
                </span>
              </td>
              <td className="priority-th-column">
                <Select
                  placeholder="Select Priority"
                  classNamePrefix="custom-inner-reactselect"
                  className={"custom-reactselect"}
                  options={Priority}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        {/* <Table responsive className="todolist-table">
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
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
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
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
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
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
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
                          
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table> */}
      </div>
    </>
  );
};

export default ToDo;
