import React, { FunctionComponent } from "react";
import { FormikProps } from "formik";
import {
  Button,
  FormGroup,
  Card,
  CardBody,
  CardGroup,
  Container,
  Input,
  Col,
  Row,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import { ILoginFormValues } from "../../../../interfaces";
import { languageTranslation } from "../../../../helpers";
import logo from "../../../assets/img/plycoco-white.png";

const LoginFormComponent: FunctionComponent<FormikProps<ILoginFormValues> & {
  loading: boolean;
}> = (props: FormikProps<ILoginFormValues> & { loading: boolean }) => {
  const {
    values: { userName, password },
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    loading
  } = props;
  return (
    <div className="app flex-row align-items-center auth-page">
      <div className="auth-bg"></div>
      <Container>
        <Row className="justify-content-center">
          <Col md="12">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <CardGroup>
              <Card className="login-card p-4">
                <CardBody className="px-4 py-0">
                  <Form onSubmit={handleSubmit} className="form-section">
                    <h1 className="auth-title text-center">
                      {languageTranslation("SIGNIN")}
                    </h1>
                    <p className="sub-title text-center">
                      {languageTranslation("TOYOURACCOUNT")}
                    </p>

                    <FormGroup className="position-relative">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {" "}
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type={"text"}
                          name={"userName"}
                          placeholder={languageTranslation(
                            "USERNAME_PLACEHOLDER"
                          )}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={userName}
                          className={
                            errors.userName && touched.userName
                              ? "text-input error"
                              : "text-input"
                          }
                          autoComplete="username"
                        />
                      </InputGroup>
                      {errors.userName && touched.userName && (
                        <div className="required-tooltip">
                          {errors.userName}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="position-relative">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          id="password"
                          type={"password"}
                          name={"password"}
                          placeholder={languageTranslation("PASSWORD_LABEL")}
                          value={password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.password && touched.password
                              ? "text-input error"
                              : "text-input"
                          }
                          autoComplete="current-password"
                        />
                      </InputGroup>
                      {errors.password && touched.password && (
                        <div className="required-tooltip">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                    <Row>
                      <Col md="8" className="mx-auto mb-3">
                        <Button
                          disabled={loading}
                          type={"submit"}
                          color="link"
                          block
                          className="px-4 login-btn"
                        >
                          {loading ? (
                            <i className="fa fa-spinner fa-spin mr-2" />
                          ) : (
                            ""
                          )}
                          {languageTranslation("SIGNIN")}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginFormComponent;
