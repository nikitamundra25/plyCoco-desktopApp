import React, { Component, FunctionComponent } from "react";
import {
  Col,
  Row,
  FormGroup,
  Input,
  Table,
  UncontrolledTooltip,
  Label
} from "reactstrap";

import { languageTranslation } from "../../../../helpers";
import Select from "react-select";
import { Priority, TodoFilter } from "../../../../config";

const CareGiverTodo: FunctionComponent = () => {
  return (
    <>
      <div>
        <h5 className="content-title">
          {languageTranslation("MENU_TO_DO_CARE_GIVER")}
        </h5>

        <Row>
          <Col lg={"12"}>
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
                  <FormGroup>
                    <Label className="col-form-label">
                      {languageTranslation("PRIORITY")} :
                    </Label>
                    <Select
                      placeholder="Select Priority"
                      classNamePrefix="custom-inner-reactselect"
                      className={"custom-reactselect"}
                      options={Priority}
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
                  <th className="sno-th-column text-center">
                    {languageTranslation("S_NO")}
                  </th>
                  <th className="date-th-column">
                    {languageTranslation("DATE")}{" "}
                  </th>
                  <th className="file-th-column">
                    {" "}
                    {languageTranslation("NAME")}
                  </th>
                  <th className="remark-col">
                    {languageTranslation("REMARKS")}
                  </th>

                  <th className="checkbox-th-column text-center">
                    {" "}
                    {languageTranslation("EXTREME")}
                  </th>
                  <th className={"text-center action-th-column"}>
                    {languageTranslation("TABEL_HEAD_CG_ACTION")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="sno-th-column text-center">1</td>
                  <td className="date-th-column">26.08.2015 01:30</td>
                  <td>
                    <span className="view-more-link word-wrap">John doe</span>
                  </td>
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
                  <td>
                    <div className={`action-btn `}>
                      <span className="btn-icon mr-2">
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className={`btn-icon mr-2 `}>
                        <i className="fa fa-check"></i>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="sno-th-column text-center">2</td>
                  <td className="date-th-column">26.08.2015 01:30</td>
                  <td>
                    <span className="view-more-link word-wrap">John doe</span>
                  </td>
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
                  <td>
                    <div className={`action-btn `}>
                      <span className="btn-icon mr-2">
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className={`btn-icon mr-2 `}>
                        <i className="fa fa-check"></i>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="sno-th-column text-center">3</td>
                  <td className="date-th-column">26.08.2015 01:30</td>
                  <td>
                    <span className="view-more-link word-wrap">John doe</span>
                  </td>
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
                  <td>
                    <div className={`action-btn `}>
                      <span className="btn-icon mr-2">
                        <i className="fa fa-pencil"></i>
                      </span>
                      <span className={`btn-icon mr-2 `}>
                        <i className="fa fa-check"></i>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>

            {/* <Table responsive className="care-giver-todo">
                <thead className="thead-bg">
                  <tr>
                    <th className="date-col">{languageTranslation("DATE")} </th>
                    <th className="name-col">{languageTranslation("NAME")} </th>
                    <th className="comment-col">
                      {" "}
                      {languageTranslation("COMMENT")}
                    </th>
                    <th className="external-col">
                      {" "}
                      {languageTranslation("EXTERNAL")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={12}>
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
                          className="inner-care-giver-todo"
                        >
                          <tbody>
                            <tr className="table-danger">
                              <td className="date-col">26.08.2015 01:30</td>
                              <td className="name-col">
                                Generator, Origins and Meaning
                              </td>
                              <td className="comment-col">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.{" "}
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
                            </tr>
                            <tr>
                              <td className="date-col">26.08.2015 00:00</td>
                              <td className="name-col">
                                Generator, Origins and Meaning
                              </td>
                              <td className="comment-col">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.{" "}
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
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={12}>
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
                          className="inner-care-giver-todo"
                        >
                          <tbody>
                            <tr>
                              <td className="date-col">26.08.2015 00:00</td>
                              <td className="name-col">
                                Generator, Origins and Meaning
                              </td>
                              <td className="comment-col">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.{" "}
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
                            </tr>
                            <tr>
                              <td className="date-col">26.08.2015 00:00</td>
                              <td className="name-col">
                                Generator, Origins and Meaning
                              </td>
                              <td className="comment-col">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.{" "}
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
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table> */}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CareGiverTodo;
