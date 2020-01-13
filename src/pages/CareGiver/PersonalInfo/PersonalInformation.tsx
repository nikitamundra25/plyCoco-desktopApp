import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  CustomInput,
  InputGroup,
  InputGroupAddon,
  Card
} from "reactstrap";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RouteComponentProps } from "react-router";
import InputMask from "react-input-mask";

import {
  State,
  Region,
  Salutation,
  LegalForm,
  Country,
  NightAllowancePerHour
} from "../../../config";
import { languageTranslation } from "../../../helpers";
import PersonalInfoFormComponent from "./PersonalInfoFormComponent";
import BillingSettingsFormComponent from "./BillingSettingsFormComponent";
import QualificationFormComponent from "./QualificationFormComponent";
import AttributeFormComponent from "./AttributesFromComponent";
import RemarkFormComponent from "./RemarkFormComponent";

class PersonalInformation extends Component<RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      startDate: "",
      addRemark: false
    };
  }
  handleChange = (date: any) => {
    this.setState({
      startDate: date
    });
  };
  handleOnClick = () => {
    this.setState({
      addRemark: true
    });
  };
  render() {
    return (
    
      <div>
        <Form className="form-section forms-main-section">
          {/* <div>
            <div className="custom-control custom-switch mb-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="switch1"
              />

              <Label className="custom-control-label" for="switch1">
                To Edit
              </Label>
            </div>
          </div> */}
          <Row>
            <Col lg={"4"}>
              <PersonalInfoFormComponent />
            </Col>

            <Col lg={"4"}>
              <BillingSettingsFormComponent />
              <QualificationFormComponent />

              <AttributeFormComponent />
            </Col>
            <Col lg={4}>
              <RemarkFormComponent />
            </Col>
          </Row>

        </Form>
      </div>
    );
  }
}
export default PersonalInformation;
