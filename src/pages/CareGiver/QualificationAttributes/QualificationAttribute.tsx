import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Col,
  Row,
  Button,
  CustomInput
} from "reactstrap";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { QualificationAttributes } from "../../../config";

class QualificationAttribute extends Component {
  render() {
    return (
      <Col>
        <Form className="form-section">
          <h5 className="main-title mb-3">Grouped Below</h5>
        </Form>
      </Col>
    );
  }
}
export default QualificationAttribute;
