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
import { QualificationAttributes } from "../../config";

class QualificationAttribute extends Component {
  render() {
    return (
      <Col>
        <Form className="form-section">
          <h5 className="main-title mb-3">Qualification Attribute</h5>
          {/* <Row>
            <Col lg={"3"}>
              <div className="mb-2">
                <div className=" checkbox-custom">
                  <input type="checkbox" id="check1" className="" />
                  <Label className="ml-2" for="check1">
                    Checkbox 1
                  </Label>
                </div>
              </div>
            </Col>
            <Col lg={"3"}>
              <div className="mb-2">
                <div className=" checkbox-custom">
                  <input type="checkbox" id="check2" className="" />
                  <Label className="ml-2" for="check2">
                    Checkbox 1
                  </Label>
                </div>
              </div>
            </Col>
            <Col lg={"3"}>
              <div className="mb-2">
                <div className=" checkbox-custom">
                  <input type="checkbox" id="check3" className="" />
                  <Label className="ml-2" for="check3">
                    Checkbox 1
                  </Label>
                </div>
              </div>
            </Col>
            <Col lg={"3"}>
              <div className="mb-2">
                <div className=" checkbox-custom">
                  <input type="checkbox" id="check4" className="" />
                  <Label className="ml-2" for="check4">
                    Checkbox 1
                  </Label>
                </div>
              </div>
            </Col>
            <Col lg={"3"}>
              <div className="mb-2">
                <div className=" checkbox-custom">
                  <input type="checkbox" id="check5" className="" />
                  <Label className="ml-2" for="check5">
                    Checkbox 1
                  </Label>
                </div>
              </div>
            </Col>
            <Col lg={"3"}>
              <div className="mb-2">
                <div className=" checkbox-custom">
                  <input type="checkbox" id="check6" className="" />
                  <Label className="ml-2" for="check6">
                    Checkbox 1
                  </Label>
                </div>
              </div>
            </Col>
            <Col lg={"3"}>
              <div className="mb-2">
                <div className=" checkbox-custom">
                  <input type="checkbox" id="check7" className="" />
                  <Label className="ml-2" for="check7">
                    Checkbox 1
                  </Label>
                </div>
              </div>
            </Col>
            <Col lg={"3"}>
              <div className="mb-2">
                <div className=" checkbox-custom">
                  <input type="checkbox" id="check8" className="" />
                  <Label className="ml-2" for="check8">
                    Checkbox 1
                  </Label>
                </div>
              </div>
            </Col>

            <Col lg={"12"}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="mandatory-text">* Required Fields</div>
                <div className={"text-right"}>
                  <Button color="primary" type="submit" className="btn-sumbit">
                    Submit
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
           */}
          <div className="form-card">
            <Row>
              {QualificationAttributes.map(item => {
                return item ? (
                  <Col lg={"3"}>
                    <div className="mb-2">
                      <div className=" checkbox-custom">
                        <input type="checkbox" id={item.value} className="" />
                        <Label className="ml-2" for={item.value}>
                          {item.label}
                        </Label>
                      </div>
                    </div>
                  </Col>
                ) : null;
              })}

              {/* <Col lg={"12"}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="mandatory-text">* Required Fields</div>
                 <div className={"text-right"}>
                  <Button color="primary" type="submit" className="btn-sumbit">
                    Save
                  </Button>
                </div> 
              </div>
            </Col> */}
            </Row>

            {/* <Row>
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
          </Row>
         */}
          </div>
        </Form>
      </Col>
    );
  }
}
export default QualificationAttribute;
