import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { Button, Col, Row, Form, FormGroup, Label, Input } from "reactstrap";
import EmailMenus from "./EmailMenus";
import { RouteComponentProps } from "react-router";
class Email extends Component<RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }
  onEditorStateChange = (editorState: any) => {
    this.setState({
      editorState
    });
  };
  render() {
    const { editorState } = this.state;

    return (
      <div className="email-section">
        <EmailMenus {...this.props} />
        <div className="email-content">
          <Form className="form-section">
            <Row>
              <Col lg={"12"}>
                <h5 className="main-title mb-4">New Email</h5>
                <div className="form-card">
                  <Row>
                    <Col lg={"12"}>
                      <FormGroup>
                        <Row>
                          {/* <Col sm="3">
                            <Label className="form-label col-form-label text-left">
                              Subject
                            </Label>
                          </Col> */}
                          <Col sm="12">
                            <div>
                              <Input
                                type="text"
                                name={"subject"}
                                placeholder="Subject"
                              />
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col lg={"12"}>
                      <FormGroup>
                        <Row>
                          {/* <Col sm="3">
                            <Label className="form-label col-form-label text-left">
                              Text
                            </Label>
                          </Col> */}
                          <Col sm="12">
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
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col lg={"12"}>
                      <div className="d-flex align-items-center justify-content-end">
                        <div>
                          <Button
                            color="primary"
                            type="submit"
                            className="btn-sumbit"
                          >
                            Send
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}
export default Email;
