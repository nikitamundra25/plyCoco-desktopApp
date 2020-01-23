import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  Table
} from "reactstrap";
import Select from "react-select";
import displaydoc from "../../assets/img/display-doc.svg";
import upload from "../../assets/img/upload.svg";

import { languageTranslation } from "../../helpers";

import { State, Region } from "../../config";
import "./index.scss";

class WorkingProof extends Component {
  render() {
    return (
      <>
        <div className="common-detail-page">
          <div className="common-detail-section">
            <div className="sticky-common-header">
              <div className="common-topheader d-flex align-items-center px-2 mb-1">
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={upload} alt="" />
                  </span>
                  <span className="header-nav-text">
                    Retrieve new work proofs
                  </span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={displaydoc} alt="" />
                  </span>
                  <span className="header-nav-text">Display different</span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-text">Hide mapped</span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-text">Hide Locked caregiver</span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-text">Hide old files</span>
                </div>
              </div>
            </div>

            <div className="common-content flex-grow-1">
              <div>
                <Form className="form-section ">
                  <Row>
                    <Col lg={"4"}>
                      <div>
                        <h5 className="content-title">New Work Proofs</h5>
                        <div>
                          <div className="form-section">
                            <FormGroup>
                              <Row>
                                <Col sm="4">
                                  <Select placeholder="Name" options={State} />
                                </Col>
                                <Col sm="8"></Col>
                              </Row>
                            </FormGroup>
                          </div>
                          <div className="document-list">
                            <Table responsive className="documentlist-table">
                              <thead className="thead-bg">
                                <tr>
                                  <th className="date-col">Date</th>
                                  <th className="file-col">File Name</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td colSpan={2}>
                                    <div className="date-title">
                                      <span className="align-middle mr-2">
                                        <i className="icon-arrow-down" />
                                      </span>
                                      <span className="align-middle ">
                                        Type: file Type1
                                      </span>
                                    </div>
                                    <div>
                                      <Table
                                        bordered
                                        hover
                                        responsive
                                        className="inner-documentlist-table"
                                      >
                                        <tbody>
                                          <tr>
                                            <td className="date-col">
                                              29.04.2019{" "}
                                            </td>
                                            <td className="file-col">
                                              license document.pdf
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="date-col">
                                              29.04.2019{" "}
                                            </td>
                                            <td className="file-col">
                                              invoice document.pdf
                                            </td>
                                          </tr>
                                        </tbody>
                                      </Table>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan={2}>
                                    <div className="date-title">
                                      <span className="align-middle mr-2">
                                        <i className="icon-arrow-down" />
                                      </span>
                                      <span className="align-middle ">
                                        Type: file Type2
                                      </span>
                                    </div>
                                    <div>
                                      <Table
                                        bordered
                                        hover
                                        responsive
                                        className="inner-documentlist-table"
                                      >
                                        <tbody>
                                          <tr>
                                            <td className="date-col">
                                              29.04.2019{" "}
                                            </td>
                                            <td className="file-col">
                                              license document.pdf
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="date-col">
                                              29.04.2019{" "}
                                            </td>
                                            <td className="file-col">
                                              invoice document.pdf
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
                        </div>
                      </div>
                    </Col>
                    <Col lg={"4"}>
                      <div>
                        <h5 className="content-title">Preview</h5>
                        <div className="document-preview"></div>
                      </div>
                    </Col>
                    <Col lg={"4"}>
                      <div>
                        <h5 className="content-title">Performed Work</h5>
                        <div>
                          <div className="form-card">
                            <Row>
                              <Col lg={"12"}>
                                <FormGroup>
                                  <Row>
                                    <Col sm="4">
                                      <Label className="form-label col-form-label">
                                        {languageTranslation("ID")}
                                      </Label>
                                    </Col>
                                    <Col sm="8">
                                      <div>
                                        <Input
                                          type="text"
                                          name={"lastName"}
                                          placeholder={languageTranslation(
                                            "ID"
                                          )}
                                          className="width-common"
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                </FormGroup>
                              </Col>
                              <Col lg={"12"}>
                                <FormGroup>
                                  <Row>
                                    <Col sm="4">
                                      <Label className="form-label col-form-label">
                                        Caregiver
                                      </Label>
                                    </Col>
                                    <Col sm="8">
                                      <div>
                                        <Select
                                          placeholder="REGION"
                                          options={State}
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                          <Table bordered hover responsive>
                            <thead className="thead-bg">
                              <tr>
                                <td>Begin</td>
                                <td>Facility</td>
                                <td>Department</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <span className="checkboxli checkbox-custom checkbox-default mr-2">
                                      <input
                                        type="checkbox"
                                        id="checkAll"
                                        className=""
                                      />
                                      <label className=""></label>
                                    </span>
                                    <div>20.08.2019</div>
                                  </div>
                                </td>
                                <td>Nursing</td>
                                <td>central department</td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <span className="checkboxli checkbox-custom checkbox-default mr-2">
                                      <input
                                        type="checkbox"
                                        id="checkAll"
                                        className=""
                                      />
                                      <label className=""></label>
                                    </span>
                                    <div>20.08.2019</div>
                                  </div>
                                </td>
                                <td>Nursing</td>
                                <td>central department</td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <span className="checkboxli checkbox-custom checkbox-default mr-2">
                                      <input
                                        type="checkbox"
                                        id="checkAll"
                                        className=""
                                      />
                                      <label className=""></label>
                                    </span>
                                    <div>20.08.2019</div>
                                  </div>
                                </td>
                                <td>Nursing</td>
                                <td>central department</td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <span className="checkboxli checkbox-custom checkbox-default mr-2">
                                      <input
                                        type="checkbox"
                                        id="checkAll"
                                        className=""
                                      />
                                      <label className=""></label>
                                    </span>
                                    <div>20.08.2019</div>
                                  </div>
                                </td>
                                <td>Nursing</td>
                                <td>central department</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default WorkingProof;
