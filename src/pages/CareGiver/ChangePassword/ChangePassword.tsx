import React, { Component } from "react";
import { FormGroup, Label, Col, Row, Input, Button, Form } from "reactstrap";

class ChangePassword extends Component {
  render() {
    return (
      <div>
        <Form className="form-section">
          <Row>
            <Col lg={"12"}>
              <h5 className="main-title mb-4">Change Password</h5>
              <div className="form-card">
                <Row>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="3">
                          <Label className="form-label col-form-label ">
                            New Password<span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="5">
                          <Input
                            type="text"
                            value="Gvbzad436#d"
                            name={"Newpassword"}
                            placeholder="New Password"
                          />
                        </Col>
                        <Col sm="4">
                          <Button
                            color="primary"
                            type="submit"
                            className="password-btn1 d-flex align-items-center justify-content-center"
                          >
                            <i className="fa fa-key mr-2"></i>{" "}
                            <span className="align-middle">
                              Generate Other Password
                            </span>
                          </Button>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>

                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="3"></Col>
                        <Col sm="5"></Col>
                        <Col sm="4">
                          <Button
                            color="primary"
                            type="submit"
                            className="password-btn2 d-flex align-items-center justify-content-center"
                          >
                            <i className="fa fa-envelope-o mr-2"></i>{" "}
                            <span className="align-middle">
                              Change and Send Email
                            </span>
                          </Button>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default ChangePassword;
