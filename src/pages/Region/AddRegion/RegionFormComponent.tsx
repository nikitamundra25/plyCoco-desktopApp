import React, { FunctionComponent } from "react";
import { FormikProps } from "formik";
import logo from "../../assets/img/plycoco-logo.png";
import { ILoginFormValues, IRegionFormValue } from "../../../interfaces";
import {
  FormGroup,
  Form,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  Input
} from "reactstrap";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../../routes/routes";
import Search from "../../../common/SearchFilter";
import { toast } from "react-toastify";
import ButtonTooltip from "../../../common/Tooltip/ButtonTooltip";
import { languageTranslation } from "../../../helpers";
const RegionFormComponent: FunctionComponent<FormikProps<IRegionFormValue>> = (
  props: FormikProps<IRegionFormValue>
) => {
  const {
    values: { regionName },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;
  console.log("errors", errors);

  return (
    <>
      {/* <Card>
        <CardHeader>
          <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
          <Button
            color={"primary"}
            disabled={isSubmitting}
            className={"btn-add"}
            onClick={handleSubmit}
          >
            {isSubmitting === true ? (
              <i className="fa fa-spinner fa-spin loader" />
            ) : (
              ""
            )}
            {languageTranslation("SAVE_BUTTON")}
          </Button>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs={"12"} lg={"8"} className="mx-auto"> */}
      <Form onSubmit={handleSubmit} className="form-section">
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label className="form-label col-form-label ">
                {languageTranslation("REGION_NAME_OF_REGION_LABEL")}
                <span className="required">*</span>
              </Label>
            </Col>
            <Col sm="7">
              <Input
                type="text"
                name={"regionName"}
                placeholder={languageTranslation(
                  "REGION_NAME_OF_REGION_PLACEHOLDER"
                )}
                onChange={handleChange}
                maxLength="30"
                onBlur={handleBlur}
                value={regionName}
                className={
                  errors.regionName && touched.regionName
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.regionName && touched.regionName && (
                <div className="required-error">{errors.regionName}</div>
              )}
            </Col>
            <Col sm="2">
              <Button
                color={"primary"}
                disabled={isSubmitting}
                className={"btn-region"}
                onClick={handleSubmit}
              >
                {isSubmitting === true ? (
                  <i className="fa fa-spinner fa-spin loader" />
                ) : (
                  ""
                )}
                {languageTranslation("SAVE_BUTTON")}
              </Button>
            </Col>
          </Row>
        </FormGroup>

        <div className="d-flex align-items-center justify-content-between">
          <div className="mandatory-text">
            {languageTranslation("REQUIRED_FIELDS")}
          </div>
        </div>
      </Form>

      {/* </Row>
         </CardBody>
      </Card> */}
    </>
  );
};

export default RegionFormComponent;
