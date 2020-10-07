import React, { FunctionComponent } from "react";
import { FormikProps } from "formik";
import { FormGroup, Form, Button, Label, Input } from "reactstrap";
import { IRegionFormValue } from "../../../../../interfaces";
import { languageTranslation } from "../../../../../helpers";

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
  return (
    <>
      <Form onSubmit={handleSubmit} className="form-section">
        <FormGroup>
          <div className="d-flex align-items-sm-center flex-column flex-sm-row justify-content-center">
            <div className="mr-3 position-relative ">
              <Label className="form-label col-form-label ">
                {languageTranslation("REGION_NAME_OF_REGION_LABEL")}
                <span className="required">*</span>
              </Label>
            </div>
            <div className="mr-3 region-input required-input  position-relative">
              <Input
                type="text"
                name={"regionName"}
                placeholder={languageTranslation("REGION_NAME_OF_REGION_LABEL")}
                onChange={handleChange}
                maxLength="255"
                onBlur={handleBlur}
                value={regionName}
                className={
                  errors.regionName && touched.regionName
                    ? "text-input error my-2 my-sm-0"
                    : "text-input my-2 my-sm-0"
                }
              />
              {errors.regionName && touched.regionName && (
                <div className="required-tooltip">{errors.regionName}</div>
              )}
            </div>
            <div className="mr-3">
              <Button
                color={"primary"}
                disabled={isSubmitting}
                className={"btn-region"}
                onClick={handleSubmit}
              >
                {isSubmitting === true ? (
                  <i className="fa fa-spinner fa-spin mr-2" />
                ) : (
                  ""
                )}
                {languageTranslation("SAVE_BUTTON")}
              </Button>
            </div>
          </div>
        </FormGroup>
        <div className="d-flex align-items-center ">
          <div className="mandatory-text">
            {languageTranslation("REQUIRED_FIELDS")}
          </div>
        </div>
      </Form>
    </>
  );
};

export default RegionFormComponent;
