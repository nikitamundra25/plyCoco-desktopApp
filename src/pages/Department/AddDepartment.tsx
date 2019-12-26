import React, { Component } from "react";
import { Button, FormGroup, Label, Input, Col, Row, Card, CardHeader, CardBody, Form } from "reactstrap";

class AddDepartment extends Component {
  render() {
    return (
      <>
        <Row>
          <Col xs={"12"} lg={"12"}>
            <Card>
              <CardHeader>
                <h4>
                  <i className="icon-people" /> Add Department
                </h4>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs={"12"} lg={"8"} className="mx-auto">
                    <Form className="form-section">
        <FormGroup>
          <Row>
            <Col sm="3">
                            <Label className="form-label col-form-label ">
                              Name of Department<span className="required">*</span>
                            </Label>
              
            </Col>
            <Col sm="9">
              <Input
                type="text"
                name={"nameofDepartment"}
                placeholder="Name of Department"
              />
            </Col>
          </Row>
          </FormGroup>
        <div className={"text-right"}>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </div>
        </Form>
        </Col>
        </Row>
        </CardBody>
        </Card>
        </Col>
        </Row>
      </>
    );
  }
}
export default AddDepartment;
