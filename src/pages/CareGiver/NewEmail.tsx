import React, { Component } from "react";
import { Button, Col, Row, Form, FormGroup, Label, Input } from "reactstrap";
import EmailMenus from "./EmailMenus";
import { RouteComponentProps } from "react-router";
class Email extends Component<RouteComponentProps, any> {
  render() {
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
                          <Col sm="3">
                            <Label className="form-label col-form-label text-left">
                              Subject
                            </Label>
                          </Col>
                          <Col sm="9">
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
                          <Col sm="3">
                            <Label className="form-label col-form-label text-left">
                              Text
                            </Label>
                          </Col>
                          <Col sm="9">
                            <div>
                              <Input
                                type="textarea"
                                name={"text"}
                                placeholder="text"
                                rows="5"
                              />
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col lg={"12"}>
                <div className="d-flex align-items-center justify-content-between">
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
          </Form>
        </div>
      </div>
    );
  }
}
export default Email;
