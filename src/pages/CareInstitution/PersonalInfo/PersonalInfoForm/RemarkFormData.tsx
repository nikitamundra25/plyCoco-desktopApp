import React, { FunctionComponent, useState } from "react";
import { FormGroup, Label, Input, Col, Row, Form } from "reactstrap";
import Select from "react-select";
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { languageTranslation, logger } from "../../../../helpers";
import { ICareInstitutionFormValues } from "../../../../interfaces";
import { State } from "../../../../config";

const RemarkFormData: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
>> = (props: FormikProps<ICareInstitutionFormValues>) => {
  let [addRemark, setRemark] = useState(false);
  const {
    values: {
      remarks
    },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = props;

  return (
    <Col lg={4}>
      <div className="remark-details">
        <div className="remark-header d-flex align-items-center justify-content-between">
          <h5 className="my-2 text-left activity-title">
            {" "}
            {languageTranslation("REMARKS")}
          </h5>
          <div className="edit-remark my-2" onClick={() => setRemark(addRemark = true)}>
            <i className="icon-note mr-2" />{" "}
            {languageTranslation("ADD_REMARKS")}
          </div>
        </div>
        <div className="remark-body remark-body-max-height ">
          <div className="activity-logs ">
            {addRemark ? (
              <div className="activity-block py-2 px-3">
                <div className="pr-3 text-left">
                  <div className="remark-section">
                    <Input
                      type="textarea"
                      name={"remarks"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={remarks}
                      placeholder="Remarks"
                      className="height-textarea "
                    />
                    <div className="add-remark-btn" onClick={() => setRemark(addRemark = false)}>
                      {" "}
                      {languageTranslation("ADD_REMARKS")}
                    </div>
                  </div>
                </div>
                <div className="text-left activity-date">
                  <span>
                    <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019,
                    2:54 PM
                    </span>
                  <span>
                    <i className="fa fa-user mr-2"></i>Mark Smith
                    </span>
                </div>
                <span className="activity-icon activity-set"></span>
              </div>
            ) : null}
            <div className="activity-block py-2 px-3">
              <div className="pr-3 text-left">
                <span className="text-capitalize">
                  Called a few days before the registration (they
                  repeatedly asked to register), is KS and wants to make
                  some money, preferably in clinics...
                    <span className="view-more-link">View More</span>
                </span>
              </div>
              <div className="text-left activity-date">
                <span>
                  <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019,
                  2:54 PM
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
                  She came to the info talk with her little son (about 3
                  years). But everyone ran quietly. She had a lot of
                    questions, generally freelance...<span className="view-more-link">View More</span>
                </span>
              </div>
              <div className="text-left activity-date">
                <span>
                  <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019,
                  2:54 PM
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
                  she called (yesterday on the phone again with Norma and
                  asked everything again, apparently hadn't listened to
                    the conversation), now she ...<span className="view-more-link">View More</span>
                </span>
              </div>
              <div className="text-left activity-date">
                <span>
                  <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019,
                  2:54 PM
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
                  Although she still wants to become a freelancer, her
                  child has to get used to kindergarten and this takes 1
                    to 2 months. She knows ....<span className="view-more-link">View More</span>
                </span>
              </div>
              <div className="text-left activity-date">
                <span>
                  <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019,
                  2:54 PM
                  </span>
                <span>
                  <i className="fa fa-user mr-2"></i>Mark Smith
                  </span>
              </div>
              <span className="activity-icon activity-set"></span>
            </div>
          </div>
        </div>
      </div>
    </Col>
  )
}

export default RemarkFormData