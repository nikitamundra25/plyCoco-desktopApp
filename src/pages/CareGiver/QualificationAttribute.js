import React, { Component } from "react";
import { FormGroup, Label, Col, Row } from "reactstrap";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { QualificationAttributes } from "../../config";

class QualificationAttribute extends Component {
  render() {
    return (
      <div>
        <FormGroup>
          <Row>
            <Col>
              <Label>Qualification Attributes</Label>
            </Col>
            <Col>
              <Select
                placeholder="Qualification Attributes"
                isMulti
                options={QualificationAttributes}
              />
            </Col>
          </Row>
        </FormGroup>
      </div>
    );
  }
}
export default QualificationAttribute;
