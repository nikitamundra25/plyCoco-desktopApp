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
import { languageTranslation } from "../../helpers";

class AddRegion extends Component {
  render() {
    return (
      <>
        <Card>
          <CardHeader>
            <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
            <Button color={"primary"} className={"btn-add"}>
              {languageTranslation("SAVE_BUTTON")}
            </Button>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs={"12"} lg={"8"} className="mx-auto">
                <Form className="form-section">
                  <FormGroup>
                    <Row>
                      <Col sm="3">
                        <Label className="form-label col-form-label ">
                          {languageTranslation("REGION_NAME_OF_REGION_LABEL")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="9">
                        <Input
                          type="text"
                          name={"nameofRegion"}
                          placeholder={languageTranslation(
                            "REGION_NAME_OF_REGION_PLACEHOLDER"
                          )}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <Col lg={"12"}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="mandatory-text">
                        {languageTranslation("REQUIRED_FIELDS")}
                      </div>
                    </div>
                  </Col>
                </Form>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </>
    );
  }
}
export default AddRegion;
