import React, { Component } from "react";
import { FormGroup, Label, Col, Row, Button } from "reactstrap";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { QualificationAttributes } from "../../config";

class QualificationAttribute extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col lg={"6"}>
            <FormGroup>
              <Row>
                <Col sm="4">
                  <Label className="form-label col-form-label ">
                    Qualification Attributes<span className="required">*</span>
                  </Label>
                </Col>
                <Col sm="8">
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
          <Col lg={"6"}>
            <FormGroup>
              <Row>
                <Col lg={"12"}>
                  <div className={"text-right"}>
                    <Button
                      color="primary"
                      type="submit"
                      className="btn-sumbit"
                    >
                      Submit
                    </Button>
                  </div>
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }
}
export default QualificationAttribute;
