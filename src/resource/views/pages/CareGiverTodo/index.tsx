import React, { Component, FunctionComponent } from "react";
import {
  Col,
  Row,
  FormGroup,
  Input,
  Table,
  UncontrolledTooltip
} from "reactstrap";
// import "./index.scss";
import { RouteComponentProps } from "react-router-dom";
// import EmailMenus from "../CareGiver/Emails/EmailMenus";
import { languageTranslation } from "../../../../helpers";

const CareGiverTodo: FunctionComponent = () => {
  return (
    <>
      <div className="email-content">
        <h5 className="content-title">
          {languageTranslation("MENU_TO_DO_CARE_GIVER")}
        </h5>

        <Row>
          <Col lg={"12"}>
            <div className="email-inbox-section">
              <div className="filter-form form-section">
                <Row>
                  <Col lg={"3"}>
                    <FormGroup className="mb-2">
                      <Input
                        type="text"
                        name="search"
                        id="search"
                        placeholder={languageTranslation("SEARCH_PLACEHOLDER")}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={"2"}>
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

              <Table responsive className="care-giver-todo">
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
              </Table>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CareGiverTodo;