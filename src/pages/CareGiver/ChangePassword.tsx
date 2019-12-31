import React, { Component } from "react";
import { FormGroup, Label, Col, Row, Input, Button, Form } from "reactstrap";

class ChangePassword extends Component {
  render() {
    return (
      <div>
        <Form className="form-section">
          <Row>
            <Col lg={"6"}>
              <h5 className="main-title mb-4">Change Password</h5>
              <div className="form-card">
                <Row>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="5">
                          <Label className="form-label col-form-label ">
                            Old Password<span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="7">
                          <div>
                            <Input
                              type="text"
                              name={"OldPassword"}
                              placeholder=" Old Password"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>

                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="5">
                          <Label className="form-label col-form-label ">
                            New Password<span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="7">
                          <Input
                            type="text"
                            name={"Newpassword"}
                            placeholder=" New Password"
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>

                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="5">
                          <Label className="form-label col-form-label ">
                            Confirm New Password
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="7">
                          <Input
                            type="text"
                            name={"ConfirmNewpassword"}
                            placeholder="Confirm New Password"
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
              <div className="message-text">
                The new password must be between 6 and 255 characters long.
              </div>
            </Col>
            <Col lg={"12"}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="mandatory-text">* Required Fields</div>
                <div className={"text-right"}>
                  <Button color="primary" type="submit" className="btn-sumbit">
                    Change Password
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default ChangePassword;
