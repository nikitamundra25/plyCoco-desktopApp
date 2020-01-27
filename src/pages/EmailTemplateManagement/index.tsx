import React, { Component } from "react";
import {
  Col,
  Row,
  Collapse,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  UncontrolledTooltip
} from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { RouteComponentProps } from "react-router-dom";
import EmailMenus from "../CareGiver/Emails/EmailMenus";
import { languageTranslation } from "../../helpers";
import Select from "react-select";
import { State, Region, CareGiver } from "../../config";
import "./index.scss";
import save from "../../assets/img/save.svg";
import clear from "../../assets/img/clear.svg";
import newEmail from "../../assets/img/new-email.svg";
import EmailSeparator from "../../assets/img/mail.svg";

class EmailTemplateManagement extends Component<RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }
  options = [
    { value: "Denis", label: "Aaron, Hank" },
    { value: "Denis", label: "Bergman, Ingmar" },
    { value: "Beck, Glenn", label: "Berle, Milton" }
  ];
  onEditorStateChange = (editorState: any) => {
    this.setState({
      editorState
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <>
        <div className="common-detail-page">
          <div className="common-detail-section">
            <div className="sticky-common-header">
              <div className="common-topheader d-flex align-items-center mb-2 ">
                <div className="template-lable">
                  {languageTranslation("TEMPLATE_TYPE")}
                </div>
                <div className="user-select">
                  <Select placeholder="Select Template" options={CareGiver} />
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={newEmail} alt="" />
                  </span>
                  <span className="header-nav-text">New Email</span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={EmailSeparator} alt="" />
                  </span>
                  <span className="header-nav-text">New Email Separator</span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={clear} alt="" />
                  </span>
                  <span className="header-nav-text">Clear</span>
                </div>
                <div className="header-nav-item">
                  <span className="header-nav-icon">
                    <img src={save} alt="" />
                  </span>
                  <span className="header-nav-text">Save</span>
                </div>
              </div>
            </div>

            <div className="common-content flex-grow-1">
              <div>
                <Row>
                  <Col lg={"7"}>
                    <h5 className="content-title">
                      {languageTranslation("MENU_ENTRY")}
                    </h5>
                    <div className="common-list-wrap border-0">
                      <div className="common-list-body h-auto">
                        <ul className="common-list list-unstyled">
                          <li>Dialysis </li>
                          <li>Home Management</li>
                          <li>Nurse/carer</li>
                          <li>Dialysis </li>
                          <li>-----------------------------------------</li>
                          <li>Nurse/carer</li>
                          <li>Dialysis </li>
                          <li>Home Management</li>
                          <li>Nurse/carer</li>
                          <li>Dialysis </li>
                          <li>----------------------------------------</li>
                          <li>Nurse/carer</li>
                          <li>Dialysis </li>
                          <li>Home Management</li>
                          <li>Nurse/carer</li>
                          <li>Dialysis </li>
                          <li>Home Management</li>
                          <li>-----------------------------------------</li>
                          <li>Dialysis </li>
                          <li>Home Management</li>
                          <li>Nurse/carer</li>
                          <li>Dialysis </li>
                          <li>Dialysis </li>
                          <li>Home Management</li>
                          <li>Nurse/carer</li>
                          <li>Dialysis </li>
                        </ul>
                      </div>
                    </div>
                  </Col>

                  <Col lg={"5"}>
                    <h5 className="content-title">
                      {languageTranslation("DETAILS")}
                    </h5>

                    <div className="form-section">
                      <div className="form-card minheight-auto ">
                        <Row>
                          <Col lg={"12"}>
                            <FormGroup>
                              <Row>
                                <Col sm="4">
                                  <Label className="form-label col-form-label">
                                    {languageTranslation("ID")}{" "}
                                    <span className="required">*</span>
                                  </Label>
                                </Col>
                                <Col sm="8">
                                  <Row className="custom-col inner-no-padding-col">
                                    <Col sm="4">
                                      <div>
                                        <Input
                                          type="text"
                                          name={"lastName"}
                                          placeholder="ID"
                                          className="width-common"
                                        />
                                      </div>
                                    </Col>
                                    <Col sm="8">
                                      <Row className="custom-col inner-no-padding-col">
                                        <Col sm="6">
                                          <Label className="form-label col-form-label inner-label">
                                            {languageTranslation("TYPE")}{" "}
                                            <span className="required">*</span>
                                          </Label>
                                        </Col>
                                        <Col sm="6">
                                          <div>
                                            <Input
                                              type="text"
                                              name={"lastName"}
                                              placeholder="Type"
                                              className="width-common"
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </FormGroup>
                          </Col>

                          <Col lg={"12"}>
                            <FormGroup>
                              <Row>
                                <Col sm="4">
                                  <Label className="form-label col-form-label">
                                    {languageTranslation("MENU_ENTRY")}{" "}
                                  </Label>
                                </Col>
                                <Col sm="8">
                                  <div>
                                    <Input
                                      type="text"
                                      name={"lastName"}
                                      placeholder="Menu Entry"
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
                                    {languageTranslation("SUBJECT")}{" "}
                                  </Label>
                                </Col>
                                <Col sm="8">
                                  <div>
                                    <Input
                                      type="text"
                                      name={"lastName"}
                                      placeholder="subject"
                                      className="width-common"
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </FormGroup>
                          </Col>
                          <Col lg={"12"}>
                            <FormGroup>
                              <div>
                                <Editor
                                  editorState={editorState}
                                  toolbarClassName="toolbarClassName"
                                  wrapperClassName="wrapperClassName"
                                  editorClassName="editorClassName"
                                  onEditorStateChange={this.onEditorStateChange}
                                  placeholder="Enter Email Here"
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
                                />
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <Table bordered hover responsive className="mail-table">
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
                          <td className="file-name">pan card.PDF</td>
                          <td className="size-col">1kb</td>
                        </tr>
                        <tr>
                          <td className="file-name">voter id.pdf</td>
                          <td className="size-col">2kb</td>
                        </tr>

                        <tr>
                          <td className="file-name">pan card.PDF</td>
                          <td className="size-col">5kb</td>
                        </tr>
                        <tr>
                          <td className="file-name">voter id.pdf</td>
                          <td className="size-col">1kb</td>
                        </tr>
                        <tr>
                          <td className="file-name">pan card.PDF</td>
                          <td className="size-col">1kb</td>
                        </tr>
                        <tr>
                          <td className="file-name">voter id.pdf</td>
                          <td className="size-col">1kb</td>
                        </tr>
                        <tr>
                          <td className="file-name">adhar card.pdf</td>
                          <td className="size-col">1kb</td>
                        </tr>
                        <tr>
                          <td className="file-name">voter id.pdf</td>
                          <td className="size-col">3kb</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default EmailTemplateManagement;
