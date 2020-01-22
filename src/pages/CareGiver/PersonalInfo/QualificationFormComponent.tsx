import React, { Component, useState } from "react";
import {
  Card,
  CardHeader,
  Label,
  CardBody,
  Col,
  Row,
  Button,
  CustomInput,
  BreadcrumbItem,
  Breadcrumb,
  InputGroup,
  InputGroupAddon,
  FormGroup
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  State,
  Region,
  Salutation,
  LegalForm,
  Country,
  NightAllowancePerHour
} from "../../../config";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  FormikValues
} from "formik";
import { CareGiverValues, IReactSelectInterface } from "../../../interfaces";
import {
  FormikSelectField,
  FormikTextField
} from "../../../common/forms/FormikFields";
import { languageTranslation } from "../../../helpers";
import FormikCheckbox from "../../../common/forms/FormikFields/FormikCheckbox";
import { IQualifications } from "../../../interfaces/qualification";
import { GET_QUALIFICATION_ATTRIBUTES } from "../../../queries";
import { useQuery } from "@apollo/react-hooks";
import Select from "react-select";

const QualificationFormComponent: any = (
  props: FormikProps<CareGiverValues>
) => {
  const { values, initialValues } = props;
  let [selectedQualification, setselectedQualification] = useState<
    IReactSelectInterface
  >({
    label: "",
    value: ""
  });
  const handleQualification = (value: any) => {
    setselectedQualification((selectedQualification = value));
    let qualificationValue: any = initialValues.qualifications;
    console.log("qualificationValue",qualificationValue);
    
    // props.setFieldValue("qualifications", qualificationValue.concat(value));
  };

  const { data, loading, error, refetch } = useQuery<IQualifications>(
    GET_QUALIFICATION_ATTRIBUTES
  );
  const qualificationList: IReactSelectInterface[] | undefined = [];
  if (data && data.getQualificationAttributes) {
    data.getQualificationAttributes.forEach((quali: any) => {
      qualificationList.push({
        label: quali.attributeName,
        value: quali.id
      });
    });
  }
  // props.setFieldValue("qualifications", []);
  return (
    <>
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
                isMulti
                menuPlacement={"top"}
                name={"selectedQualification"}
                placeholder={"Add Qualification"}
                options={qualificationList}
                onChange={handleQualification}
                className="w-100"
              />
            </FormGroup>
          </div>
        </div>
      </div>

      {/* <div className="form-inner-list-section fix-height-section">
        <h5 className="content-title">Qualifications</h5>
        <Row className="custom-col">
          <Col sm={12}>
            <Card>
              <div className="form-inner-list-wrap">
                <h5 className="heading toggle-filter  ">Qualification</h5>
                <div className="form-inner-list-content-wrap">
                  <ul>
                    {initialValues.qualifications &&
                      initialValues.qualifications.map(quali => {
                        return <li>{quali}</li>;
                      })}
                  </ul>
                </div>
              </div>

              <div className="custom-select-wrap">
                <Select
                  name={"selectedQualification"}
                  placeholder={"Add Qualification"}
                  options={qualificationList}
                  onChange={handleQualification}
                  className="w-100"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div> */}
    </>
  );
};

export default QualificationFormComponent;
