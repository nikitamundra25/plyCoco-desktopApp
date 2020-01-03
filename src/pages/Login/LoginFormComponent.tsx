import React from "react";
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
import logo from "../../assets/img/plycoco-logo.png";
import { ILoginFormValues } from "../../interfaces";
import { languageTranslation } from "../../helpers/LangauageTranslation";
const language = localStorage.getItem("language");
console.log("language in login", language);
if (language === null) {
  window.location.reload();
}
const LoginFormComponent: any = (
  props: FormikProps<ILoginFormValues> & any
) => {
  const {
    values: { email, password },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;
  // console.log(props.languageReducer.language, "props");
  // let label = props.languageReducer.language;

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
                      {language === "de" ? "Anmelden" : "Sign In"}
                    </h1>
                    <p className="sub-title text-center">
                      {language === "de"
                        ? "Zu deinem Konto"
                        : "To Your Account"}
                    </p>

                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {" "}
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type={"text"}
                          id="email"
                          name={languageTranslation("EMAIL")}
                          placeholder={languageTranslation("EMAIL_ADDRESS_PLACEHOLDER")}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={email}
                          className={
                            errors.email && touched.email
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                      </InputGroup>
                      {errors.email && touched.email && (
                        <div className="">{errors.email}</div>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          id="password"
                          type={"password"}
                          name={languageTranslation("PASSWORD")}
                          placeholder={languageTranslation("PASSWORD_LABEL")}
                          value={password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.password && touched.password
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                      </InputGroup>
                      {errors.password && touched.password && (
                        <div className="">{errors.password}</div>
                      )}
                    </FormGroup>
                    <Row>
                      <Col md="8" className="mx-auto mb-3">
                        <Button
                          disabled={isSubmitting}
                          type={"submit"}
                          color="link"
                          block
                          className="px-4 login-btn"
                        >
                          {language === "de" ? "Anmelden" : "Sign In"}
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
