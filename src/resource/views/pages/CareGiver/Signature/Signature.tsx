import React, { FunctionComponent } from "react";
import { FormGroup, Label, Col, Row, Button, Form } from "reactstrap";
import signature from "../../../../assets/img/sign.png";
import { languageTranslation } from "../../../../../helpers";
const Signature: FunctionComponent = () => {
  return (
    <>
      <div className="signature-section">
        <div>
          <h5 className="content-title">{languageTranslation("CURRENT_SIGNATURE")} </h5>
          <div className="form-card">
            <div>
              <img src={signature} alt="signature" />
            </div>
          </div>
          <Button color="danger" type="submit" size="sm" className="mb-3">
            <i className="fa fa-times mr-2"></i>{languageTranslation("CLEAR")} 
          </Button>
        </div>
        <Form className="form-section">
          <Row>
            <Col lg={"12"}>
              <h5 className="main-title mb-4">{languageTranslation("UPLOAD_SIGNATURE")} </h5>
              <div className="form-card">
                <Row>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="12">
                          <Label className="form-label col-form-label text-left">
                           {languageTranslation("SIGNATURE")} {" "}
                            <span>
                             {languageTranslation("SIGNATURE_VALIDATION_MSG")}
                            </span>
                          </Label>
                        </Col>
                        <Col sm="12">
                          <div className="custom-file-div">
                            <input
                              type="file"
                              id="FileBrowser"
                              name="customFile"
                              className="custom-input-file"
                            />
                            <Label
                              className="custom-label-file"
                              for="FileBrowser"
                            >
                              <span className="choosefile-label">
                                <i className="fa fa-folder-open-o mr-2"></i>{" "}
                                <span>{languageTranslation("CHOOSE_FILE")} </span>
                              </span>
                            </Label>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={"12"}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <Button
                    color="primary"
                    type="submit"
                    size="sm"
                    className="mb-3 mr-3"
                  >
                    <i className="fa fa-upload mr-2"></i>{languageTranslation("UPLOAD")}
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
        <div>
          <h5 className="content-title">{languageTranslation("SIGN_WITH_MOUSE")} </h5>
          <div className="form-card">
            <div className="bg-white py-5 w-100"></div>
          </div>
          <div>
            <Button
              color="primary"
              type="submit"
              size="sm"
              className="mb-3 mr-3"
            >
              <i className="fa fa-check mr-2"></i> {languageTranslation("SAVE_SIGNATURE")}
            </Button>
            <Button color="danger" type="submit" size="sm" className="mb-3">
              <i className="fa fa-times mr-2"></i>{languageTranslation("EMPTY_SIGNATURE")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signature;
