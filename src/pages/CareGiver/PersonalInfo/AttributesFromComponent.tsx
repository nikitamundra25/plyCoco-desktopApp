import React from "react";
import { FormGroup } from "reactstrap";
import { CareGiveAttributes } from "../../../config";
import { FormikProps } from "formik";
import { CareGiverValues, IReactSelectInterface } from "../../../interfaces";
import { languageTranslation } from "../../../helpers";
import Select from "react-select";

const AttributeFormComponent: any = (props: FormikProps<CareGiverValues>) => {
  const {
    values: { attributeId },
    setFieldValue
  } = props;
  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    setFieldValue(name, selectOption);
  };
  return (
    <>
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
              {attributeId
                ? attributeId.map(
                    ({ label }: IReactSelectInterface, index: number) => {
                      return <li key={index}>{label}</li>;
                    }
                  )
                : null}
            </ul>
          </div>
          <div className="common-list-footer form-section ">
            <FormGroup className="mb-0">
              <Select
                placeholder={"Please Select Qualification from the dropdown"}
                value={attributeId ? attributeId : undefined}
                onChange={(value: any) => handleSelect(value, "attributeId")}
                isMulti
                options={CareGiveAttributes}
                menuPlacement={"top"}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttributeFormComponent;
