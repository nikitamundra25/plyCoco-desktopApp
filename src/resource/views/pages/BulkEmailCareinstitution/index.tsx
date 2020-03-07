import React, { FunctionComponent } from "react";
import {
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
  UncontrolledTooltip
} from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Select from "react-select";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { languageTranslation } from "../../../../helpers";
import { useDropzone } from "react-dropzone";
import refresh from "../../../assets/img/refresh.svg";
import "./index.scss";

const BulkEmailCareInstitution: FunctionComponent = () => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    minSize: 0,
    maxSize: 25000000
  });
  return (
    <>
      <div className="common-detail-page">
        <div className="common-detail-section">
          <div className="sticky-common-header">
            <div className="common-topheader d-flex align-items-center px-2 mb-1">
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={refresh} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("REFRESH")}
                </span>
              </div>

              <div className="ml-auto">
                <Button
                  color="primary"
                  className="btn-email-save ml-auto mr-2 btn btn-primary"
                >
                  <i className="fa fa-paper-plane mr-2" aria-hidden="true"></i>

                  <span>{languageTranslation("SEND")}</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="common-content flex-grow-1">
            <div className="bulk-email-section">
              <Row>
                <Col lg="6" className="pr-lg-0">
                  <div
                    id="scrollableDiv"
                    className="caregiver-list custom-scroll"
                  >
                    <Table
                      bordered
                      hover
                      responsive
                      className="mail-table mb-0"
                    >
                      <thead className="thead-bg">
                        <tr>
                          <th className="">
                            {languageTranslation("MENU_INSTITUTION")}
                          </th>
                          <th className="">{languageTranslation("CONTACT")}</th>
                          <th>{languageTranslation("NAME")}</th>
                          <th className="">{languageTranslation("EMAIL")}</th>
                          <th>{languageTranslation("SALUTATION")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <span className=" checkbox-custom  ">
                              <input
                                type="checkbox"
                                id="check"
                                name="checkbox"
                                className=""
                              />
                              <label className=""> Advita Berlin</label>
                            </span>
                          </td>
                          <td>John Doe</td>
                          <td>Head Contact</td>
                          <td>doe@advita.de</td>
                          <td>hello</td>
                        </tr>
                        <tr>
                          <td>
                            <span className=" checkbox-custom  ">
                              <input
                                type="checkbox"
                                id="check"
                                name="checkbox"
                                className=""
                              />
                              <label className=""> </label>
                            </span>
                          </td>
                          <td>John Doe</td>
                          <td>PDL</td>
                          <td>doe@advita.de</td>
                          <td>hello</td>
                        </tr>
                        <tr>
                          <td>
                            <span className=" checkbox-custom  ">
                              <input
                                type="checkbox"
                                id="check"
                                name="checkbox"
                                className=""
                              />
                              <label className=""></label>
                            </span>
                          </td>
                          <td>John Doe</td>
                          <td>Personal Officer</td>
                          <td>doe@advita.de</td>
                          <td>hello</td>
                        </tr>{" "}
                        <tr>
                          <td>
                            <span className=" checkbox-custom  ">
                              <input
                                type="checkbox"
                                id="check"
                                name="checkbox"
                                className=""
                              />
                              <label className=""> Testwerk</label>
                            </span>
                          </td>
                          <td>John Doe</td>
                          <td>Head Contact</td>
                          <td>doe@testwerk.de</td>
                          <td>hello</td>
                        </tr>{" "}
                        <tr>
                          <td>
                            <span className=" checkbox-custom  ">
                              <input
                                type="checkbox"
                                id="check"
                                name="checkbox"
                                className=""
                              />
                              <label className=""> </label>
                            </span>
                          </td>
                          <td>John Doe</td>
                          <td>Personal department</td>
                          <td>doe@advita.de</td>
                          <td>hello</td>
                        </tr>{" "}
                        <tr>
                          <td>
                            <span className=" checkbox-custom  ">
                              <input
                                type="checkbox"
                                id="check"
                                name="checkbox"
                                className=""
                              />
                              <label className=""> </label>
                            </span>
                          </td>
                          <td>John Doe</td>
                          <td>PDL</td>
                          <td>doe@advita.de</td>
                          <td>hello</td>
                        </tr>{" "}
                        <tr>
                          <td>
                            <span className=" checkbox-custom  ">
                              <input
                                type="checkbox"
                                id="check"
                                name="checkbox"
                                className=""
                              />
                              <label className=""> </label>
                            </span>
                          </td>
                          <td>John Doe</td>
                          <td>ASP</td>
                          <td>doe@advita.de</td>
                          <td>hello</td>
                        </tr>{" "}
                        <tr>
                          <td>
                            <span className=" checkbox-custom  ">
                              <input
                                type="checkbox"
                                id="check"
                                name="checkbox"
                                className=""
                              />
                              <label className=""> </label>
                            </span>
                          </td>
                          <td>John Doe</td>
                          <td>Central department</td>
                          <td>doe@advita.de</td>
                          <td>hello</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Col>
                <Col lg={"6"}>
                  <div className="">
                    <div className="form-section py-2 px-3 form-card">
                      <div className="d-flex align-items-end justify-content-between bulk-email-header">
                        <Label className="bulk-email-label">
                          {languageTranslation("SUBJECT")}{" "}
                          {languageTranslation("EMAIL")}
                          <span className="required">*</span>
                        </Label>
                        <div className="select-box mb-2">
                          <Select
                            placeholder={languageTranslation("SELECT_TEMPLATE")}
                            classNamePrefix="custom-inner-reactselect"
                            className="custom-reactselect"
                          />
                        </div>
                      </div>
                      <Row>
                        <Col lg={"12"}>
                          <FormGroup>
                            <div>
                              <Input
                                type="text"
                                placeholder={languageTranslation("SUBJECT")}
                                name={"lastName"}
                                maxLength={255}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Label className="form-label col-form-label mb-2">
                              {languageTranslation("TEXT_EMAIL")}
                              <span className="required">*</span>
                            </Label>

                            <div>
                              <Editor
                                // editorState={body}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                placeholder={languageTranslation(
                                  "EMAIL_BODY_PLACEHOLDER"
                                )}
                                toolbar={{
                                  options: [
                                    "inline",
                                    "blockType",
                                    "fontSize",
                                    "list",
                                    "textAlign",
                                    "link"
                                  ],
                                  inline: {
                                    options: ["bold", "italic", "underline"]
                                  },
                                  fontSize: {
                                    className: "bordered-option-classname"
                                  },
                                  fontFamily: {
                                    className: "bordered-option-classname"
                                  },
                                  list: {
                                    inDropdown: false,
                                    options: ["unordered"]
                                  },
                                  link: {
                                    options: ["link"]
                                  }
                                }}
                                // onEditorStateChange={onEditorStateChange}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col lg="12">
                          <div
                            {...getRootProps()}
                            className="dropzone-preview mb-2 "
                          >
                            <input
                              {...getInputProps()}
                              className="dropzone-input-preview"
                            />
                            <div className="icon-upload">
                              <i className="cui-cloud-upload"></i>
                            </div>
                            <span>
                              {languageTranslation("PERSONAL_DOCUMENTS_UPLOAD")}
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="document-list custom-scrollbar">
                      <div className="archieve-table-minheight ">
                        <Table
                          bordered
                          hover
                          responsive
                          className="mail-table mb-0"
                        >
                          <thead className="thead-bg">
                            <tr>
                              <th className="file-name">
                                {languageTranslation("FILE_NAME")}
                              </th>

                              <th className="size-col">
                                {languageTranslation("SIZE")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className={`file-name`}>
                                <div className={`file-description`}>
                                  <span className="word-wrap view-more-link">
                                    document.pdf
                                  </span>

                                  <span id={`delete`} className="trash-icon">
                                    <UncontrolledTooltip
                                      placement={"top"}
                                      target={`delete`}
                                    >
                                      {languageTranslation(
                                        "ATTACHMENT_DELETE_INFO_MSG"
                                      )}
                                    </UncontrolledTooltip>
                                    <i className="fa fa-trash"></i>
                                  </span>
                                </div>
                              </td>

                              <td className="size-col">123 Kb</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkEmailCareInstitution;
