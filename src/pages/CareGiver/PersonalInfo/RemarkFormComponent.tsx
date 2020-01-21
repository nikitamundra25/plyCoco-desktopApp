import React, { Component, FunctionComponent, useState } from "react";
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
  Input,
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
import {
  CareGiverValues,
  IRemark,
  ICareGiverValues
} from "../../../interfaces";
import {
  FormikSelectField,
  FormikTextField
} from "../../../common/forms/FormikFields";
import { languageTranslation } from "../../../helpers";
import FormikCheckbox from "../../../common/forms/FormikFields/FormikCheckbox";

// CareGiverValues
const RemarkFormComponent: FunctionComponent = (
  props: any
) => {
  let remarks: Object[] = []
  let {
    touched,
    errors,
    isSubmitting,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched
  } = props;

  let [addRemark, setRemark] = useState<String>("");
  let [isRemark, setIsRemark] = useState(false);
  const handleChange = (event: React.ChangeEvent<any>) => {
    setRemark((addRemark = event.target.value));
  };

  const handleSave = () => {
    let remarkValue = [];
    remarkValue.push({
      createdBy: `${"firstName"} ${"lastName"}`,
      description: `${addRemark}`
    });
    setIsRemark((isRemark = false));
    setFieldValue("remarks", remarkValue);
  };

  return (
    // <Col lg={4}>
    <div className="remark-details">
      <div className="remark-header d-flex align-items-center justify-content-between">
        <h5 className="my-2 text-left activity-title">
          {" "}
          {languageTranslation("REMARKS")}
        </h5>
        <div
          className="edit-remark my-2"
          onClick={() => setIsRemark((isRemark = true))}
        >
          <i className="icon-note mr-2" /> {languageTranslation("ADD_REMARKS")}
        </div>
      </div>
      <div className="remark-body remark-body-max-height ">
        <div className="activity-logs ">
          {isRemark ? (
            <div className="activity-block py-2 px-3">
              <div className="pr-3 text-left">
                <div className="remark-section">
                  <Input
                    type="textarea"
                    name={"remarks.description"}
                    placeholder="Remarks"
                    onChange={handleChange}
                    className="height-textarea "
                  />
                  <div className="add-remark-btn" onClick={() => handleSave()}>
                    {" "}
                    {languageTranslation("ADD_REMARKS")}
                  </div>
                </div>
              </div>
              <div className="text-left activity-date">
                <span>
                  <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019, 2:54 PM
                </span>
                <span>
                  <i className="fa fa-user mr-2"></i>
                  {"firstName"} {"lastName"}
                </span>
              </div>
              <span className="activity-icon activity-set"></span>
            </div>
          ) : null}

          {remarks && remarks.length ?
            remarks.map((rmk: any) => {
              return (
                <div className="activity-block py-2 px-3">
                  <div className="pr-3 text-left">
                    <span className="text-capitalize">
                      {rmk.description}
                      <span className="view-more-link">View More</span>
                    </span>
                  </div>
                  <div className="text-left activity-date">
                    <span>
                      <i className="fa fa-clock-o mr-2"></i>
                      {rmk.createdAt}
                    </span>
                    <span>
                      <i className="fa fa-user mr-2"></i>
                      {rmk.createdBy}
                    </span>
                  </div>
                  <span className="activity-icon activity-set"></span>
                </div>
              );
            }) :
            null
          }
          {/* <div className="activity-block py-2 px-3">
            <div className="pr-3 text-left">
              <span className="text-capitalize">
                Called a few days before the registration (they repeatedly asked
                to register), is KS and wants to make some money, preferably in
                clinics...
                <span className="view-more-link">View More</span>
              </span>
            </div>
            <div className="text-left activity-date">
              <span>
                <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019, 2:54 PM
              </span>
              <span>
                <i className="fa fa-user mr-2"></i>Mark Smith
              </span>
            </div>
            <span className="activity-icon activity-set"></span>
          </div>
          <div className="activity-block  py-2 px-3">
            <div className="pr-3 text-left">
              <span className="text-capitalize">
                She came to the info talk with her little son (about 3 years).
                But everyone ran quietly. She had a lot of questions, generally
                freelance...
                <span className="view-more-link">View More</span>
              </span>
            </div>
            <div className="text-left activity-date">
              <span>
                <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019, 2:54 PM
              </span>
              <span>
                <i className="fa fa-user mr-2"></i>Mark Smith
              </span>
            </div>
            <span className="activity-icon activity-set"></span>
          </div>
          <div className="activity-block  py-2 px-3">
            <div className="pr-3 text-left">
              <span className="text-capitalize">
                she called (yesterday on the phone again with Norma and asked
                everything again, apparently hadn't listened to the
                conversation), now she ...
                <span className="view-more-link">View More</span>
              </span>
            </div>
            <div className="text-left activity-date">
              <span>
                <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019, 2:54 PM
              </span>
              <span>
                <i className="fa fa-user mr-2"></i>Mark Smith
              </span>
            </div>
            <span className="activity-icon activity-set"></span>
          </div>
          <div className="activity-block  py-2 px-3">
            <div className="pr-3 text-left">
              <span className="text-capitalize">
                Although she still wants to become a freelancer, her child has
                to get used to kindergarten and this takes 1 to 2 months. She
                knows ....<span className="view-more-link">View More</span>
              </span>
            </div>
            <div className="text-left activity-date">
              <span>
                <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019, 2:54 PM
              </span>
              <span>
                <i className="fa fa-user mr-2"></i>Mark Smith
              </span>
            </div>
            <span className="activity-icon activity-set"></span>
          </div>
           */}
        </div>
      </div>
    </div>
    // </Col>
  );
};

export default RemarkFormComponent;
