import React, { FunctionComponent } from "react";
import { FormGroup, Label, Input, Col, Row, Form } from "reactstrap";
import Select from "react-select";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { languageTranslation, logger } from "../../../../helpers";
import {
  ICareInstitutionFormValues,
  IHandleSelectInterface,
  IReactSelectInterface
} from "../../../../interfaces";
import { State, CareInstitutionAttr } from "../../../../config";

const QuallificationAttribute: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
> &
  IHandleSelectInterface & {
    qualificationList: IReactSelectInterface[] | undefined;
  }> = (
  props: FormikProps<ICareInstitutionFormValues> &
    IHandleSelectInterface & {
      qualificationList: IReactSelectInterface[] | undefined;
    }
) => {
  const {
    values: { qualificationId, attributeId },
    handleSelect,
    qualificationList
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
          <div className="common-list-body custom-scrollbar">
            {qualificationId && qualificationId.length ? (
              <ul className="common-list list-unstyled">
                {qualificationId.map((qualification: IReactSelectInterface) => {
                  return <li>{qualification.label}</li>;
                })}
              </ul>
            ) : null}
          </div>
          <div className="common-list-footer ">
            <FormGroup className="mb-0">
              <Select
                placeholder={"Please Select Qualification from the dropdown"}
                name={"qualificationId"}
                value={qualificationId ? qualificationId : undefined}
                onChange={(value: any) =>
                  handleSelect(value, "qualificationId")
                }
                isMulti
                options={qualificationList}
                menuPlacement={"top"}
                className="attribute-select"
                classNamePrefix="attribute-inner-select"
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
          <div className="common-list-body custom-scrollbar">
            <ul className="common-list list-unstyled">
              {attributeId && attributeId.length
                ? attributeId.map((attData: IReactSelectInterface) => {
                    return <li>{attData.label} </li>;
                  })
                : null}
            </ul>
          </div>
          <div className="common-list-footer  ">
            <FormGroup className="mb-0">
              <Select
                placeholder={" Please Select Attribute from the dropdown"}
                value={attributeId ? attributeId : undefined}
                onChange={(value: any) => handleSelect(value, "attributeId")}
                isMulti
                options={CareInstitutionAttr}
                menuPlacement={"top"}
                className="attribute-select"
                classNamePrefix="attribute-inner-select"
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuallificationAttribute;
