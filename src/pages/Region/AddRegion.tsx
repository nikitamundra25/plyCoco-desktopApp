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
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../routes/routes";

class AddRegion extends Component {
  render() {
    return (
      <>
        <Card>
          <CardHeader>
            <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
            <Button color={"primary"} className={"btn-add"}>
              Save
            </Button>
          </CardHeader>
          <CardBody>
            <div className="form-card">
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

                    <div className="d-flex align-items-center justify-content-between">
                      <div className="mandatory-text">* Required Field</div>
                    </div>
                  </Form>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
      </>
    );
  }
}
export default AddRegion;
