import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  Form
} from "reactstrap";

class AddRegion extends Component {
  render() {
    return (
      <>
        <Row>
          <Col xs={"12"} lg={"12"}>
            <Card>
              <CardHeader>
                <h4>
                  <i className="fa fa-sitemap" />
                  <span className="ml-1">Add Region</span>
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
                              Name of Region<span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="9">
                            <Input
                              type="text"
                              name={"nameofRegion"}
                              placeholder="Name of region"
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <Col lg={"12"}>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="mandatory-text">* Required Field</div>
                          <div className={"text-right"}>
                            <Button
                              color="primary"
                              type="submit"
                              className="btn-sumbit"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </Col>
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
export default AddRegion;
