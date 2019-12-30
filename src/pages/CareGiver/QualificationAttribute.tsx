import React, { Component } from "react";
import { Form, FormGroup, Label, Col, Row, Button } from "reactstrap";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { QualificationAttributes } from "../../config";

class QualificationAttribute extends Component {
  render() {
    return (
      <div>
        <Form className="form-section">
          <Row>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Qualification
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Select
                        placeholder="Qualification Attributes"
                        isMulti
                        options={QualificationAttributes}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="mandatory-text">* Required Fields</div>
                <div className={"text-right"}>
                  <Button color="primary" type="submit" className="btn-sumbit">
                    Next Step & Save
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
export default QualificationAttribute;
