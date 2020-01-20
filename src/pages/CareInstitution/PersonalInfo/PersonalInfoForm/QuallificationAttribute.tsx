import React, { FunctionComponent } from "react";
import { FormGroup, Label, Input, Col, Row, Form } from "reactstrap";
import Select from "react-select";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { languageTranslation, logger } from "../../../../helpers";
import {
  ICareInstitutionFormValues,
  IHandleSelectInterface
} from "../../../../interfaces";
import { State } from "../../../../config";

const QuallificationAttribute: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
> &
  IHandleSelectInterface> = (
  props: FormikProps<ICareInstitutionFormValues> & IHandleSelectInterface
) => {
  const {
    values: { qualificationId, attributeId },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    handleSelect
  } = props;
  return (
    <div className="quality-attribute-section d-flex flex-column">
      <div className="common-list-card">
        <h5 className="content-title">
          {languageTranslation("QUALIFICATIONS")}
        </h5>
        <div className="common-list-wrap">
          <div className="common-list-header d-flex align-items-cente justify-content-between">
            <div className="common-list-title align-middle">
              {" "}
              {languageTranslation("QUALIFICATION")}
            </div>
            <div className=" align-middle toggle-icon">
              <i className="fa fa-angle-down"></i>
            </div>
          </div>
          <div className="common-list-body">
            <ul className="common-list list-unstyled">
              <li>Dialysis </li>
              <li>Home Management</li>
              <li>Nurse/carer</li>
            </ul>
          </div>
          <div className="common-list-footer form-section ">
            <FormGroup className="mb-0">
              <Select
                placeholder={languageTranslation("REGION", "STATE")}
                value={qualificationId ? qualificationId : undefined}
                onChange={(value: any) => handleSelect(value, "qualification")}
                isMulti
                options={State}
                menuPlacement={"top"}
              />
            </FormGroup>
          </div>
        </div>
      </div>
      <div className="common-list-card">
        <h5 className="content-title">{languageTranslation("ATTRIBUTES")}</h5>
        <div className="common-list-wrap">
          <div className="common-list-header d-flex align-items-cente justify-content-between">
            <div className="common-list-title align-middle">
              {" "}
              {languageTranslation("ATTRIBUTES")}
            </div>
            <div className=" align-middle toggle-icon">
              <i className="fa fa-angle-down"></i>
            </div>
          </div>
          <div className="common-list-body">
            <ul className="common-list list-unstyled">
              <li>Dialysis </li>
              <li>Home Management</li>
              <li>Nurse/carer</li>
            </ul>
          </div>
          <div className="common-list-footer form-section ">
            <FormGroup className="mb-0">
              <Select
                placeholder={languageTranslation("REGION", "STATE")}
                value={attributeId ? attributeId : undefined}
                onChange={(value: any) => handleSelect(value, "attribute")}
                isMulti
                options={State}
                menuPlacement={"top"}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuallificationAttribute;
