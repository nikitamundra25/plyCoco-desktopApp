import React, { useState, FunctionComponent } from "react";
import { FormGroup } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { FormikProps } from "formik";
import {
  IReactSelectInterface,
  ICareGiverValues
} from "../../../../../interfaces";
import { languageTranslation } from "../../../../../helpers";
import Select from "react-select";

const QualificationFormComponent: FunctionComponent<FormikProps<
  ICareGiverValues
> & { qualificationList: IReactSelectInterface[] | undefined }> = (
  props: FormikProps<ICareGiverValues> & {
    qualificationList: IReactSelectInterface[] | undefined;
  }
) => {
  const { values, initialValues, qualificationList } = props;
  let [selectedQualification, setselectedQualification] = useState<
    IReactSelectInterface
  >({
    label: "",
    value: ""
  });

  const { qualifications } = values;
  const handleQualification = (value: any) => {
    setselectedQualification((selectedQualification = value));
    let qualificationValue: any = initialValues.qualifications;
    props.setFieldValue("qualifications", value);
  };

  // props.setFieldValue("qualifications", []);
  return (
    <>
      <div className="common-list-card">
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
            {qualifications && qualifications.length ? (
              <ul className="common-list list-unstyled mb-0">
                {qualifications.map(
                  (qualification: IReactSelectInterface, index: number) => {
                    return <li key={index}>{qualification.label}</li>;
                  }
                )}
              </ul>
            ) : null}
          </div>
          <div className="common-list-footer ">
            <FormGroup className="mb-0">
              <Select
                isMulti
                menuPlacement={"top"}
                value={qualifications}
                name={"selectedQualification"}
                placeholder={languageTranslation(
                  "CAREGIVER_QUALIFICATION_ATTRIBUTE_PLACEHOLDER"
                )}
                options={qualificationList}
                onChange={handleQualification}
                className="attribute-select"
                classNamePrefix="attribute-inner-select"
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default QualificationFormComponent;
