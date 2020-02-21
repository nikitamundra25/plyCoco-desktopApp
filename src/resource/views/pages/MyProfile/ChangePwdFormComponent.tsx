import React, { FunctionComponent } from "react";
import { Button, FormGroup, Input, Form, Label, Col, Row } from "reactstrap";
import { FormikProps } from "formik";
import { languageTranslation } from "../../../../helpers";
import { IChangePasswordValues } from "../../../../interfaces";

export const ChangePwdFormComponent: FunctionComponent<FormikProps<
  IChangePasswordValues
> & { changePwdLoading: boolean }> = (
  props: FormikProps<IChangePasswordValues> & {
    changePwdLoading: boolean;
  }
) => {
  const {
    errors,
    values: { oldPassword, password, confirmPassword },
    touched,
    handleChange,
    handleSubmit,
    changePwdLoading
  } = props;
  return (
    <Col lg={"6"}>
      <div className="form-section">
        <h5 className="main-title">{languageTranslation("CHANGE_PASSWORD")}</h5>
        <div className="form-card minheight-auto">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg={"12"}>
                <FormGroup>
                  <Row className="align-items-center">
                    <Col sm="4">
                      <Label className="form-label col-form-label ">
                        {languageTranslation("OLD_PASSWORD")}
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="password"
                          name={"oldPassword"}
                          value={oldPassword}
                          onChange={handleChange}
                          autoComplete={"current-password"}
                          placeholder={languageTranslation("OLD_PASSWORD")}
                          className={
                            errors.oldPassword && touched.oldPassword
                              ? "text-input error my-2 my-sm-0"
                              : "text-input my-2 my-sm-0"
                          }
                        />
                        {errors.oldPassword && touched.oldPassword && (
                          <div className="required-tooltip">
                            {errors.oldPassword}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              <Col lg={"12"}>
                <FormGroup>
                  <Row className="align-items-center">
                    <Col sm="4">
                      <Label className="form-label col-form-label">
                        {languageTranslation("CG_MENU_NEW_PASSWORD")}
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="password"
                          name={"password"}
                          value={password}
                          onChange={handleChange}
                          autoComplete={"new-password"}
                          placeholder={languageTranslation(
                            "CG_MENU_NEW_PASSWORD"
                          )}
                          className={
                            errors.password && touched.password
                              ? "text-input error my-2 my-sm-0"
                              : "text-input my-2 my-sm-0"
                          }
                        />
                        {errors.password && touched.password && (
                          <div className="required-tooltip">
                            {errors.password}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              <Col lg={"12"}>
                <FormGroup>
                  <Row className="align-items-center">
                    <Col sm="4">
                      <Label className="form-label col-form-label ">
                        {languageTranslation("CONFIRM_PASSWORD")}
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="password"
                          name={"confirmPassword"}
                          value={confirmPassword}
                          onChange={handleChange}
                          autoComplete={"new-password"}
                          placeholder={languageTranslation("CONFIRM_PASSWORD")}
                          className={
                            errors.confirmPassword && touched.confirmPassword
                              ? "text-input error my-2 my-sm-0"
                              : "text-input my-2 my-sm-0"
                          }
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                          <div className="required-tooltip">
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              <Col lg={"12"} className="mt-3">
                <FormGroup>
                  <Row>
                    <Col lg={"4"}></Col>
                    <Col lg={"8"}>
                      <Button
                        color={"primary"}
                        className={"btn-save"}
                        onClick={handleSubmit}
                        disabled={changePwdLoading}
                      >
                        {changePwdLoading ? (
                          <i className="fa fa-spinner fa-spin mr-2" />
                        ) : null}{" "}
                        {languageTranslation("UPDATE_BUTTON")}
                      </Button>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </Col>
  );
};
