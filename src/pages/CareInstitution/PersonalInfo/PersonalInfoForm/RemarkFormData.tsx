import React, { FunctionComponent, useState } from "react";
import { FormGroup, Label, Input, Col, Row, Form } from "reactstrap";
import Select from "react-select";
import { Formik, FormikProps, FormikHelpers, FieldArray } from 'formik';
import { languageTranslation, logger } from "../../../../helpers";
import { ICareInstitutionFormValues, ICareInstitutionRemarks } from "../../../../interfaces";
import { State } from "../../../../config";

const RemarkFormData: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
>> = (props: FormikProps<ICareInstitutionFormValues>) => {
  let [addRemark, setRemark] = useState(false);
  let [remarkInput, setRemarkInput] = useState("")
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
              <>
                <FieldArray
                  name="remarks"
                  render={arrayHelpers => (
                    <div>
                      {remarks && remarks.length > 0 ? (
                        remarks.map((remarks: ICareInstitutionRemarks, index: number) => (
                          <div key={index}>
                            <div className="activity-block py-2 px-3">
                              <div className="pr-3 text-left">
                                <div className="remark-section">
                                  <Input
                                    type="textarea"
                                    name={"remarks"}
                                    handleChange={(e: any) => arrayHelpers.push(e.target.value)}
                                    placeholder="Remarks"
                                    className="height-textarea "
                                  />
                                  <div className="add-remark-btn" onClick={(e) => {
                                    console.log("e.target.value", e);
                                    arrayHelpers.insert(index, '');
                                    setRemark(addRemark = false)
                                  }}>
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
                          </div>
                        ))
                      ) : (

                          <>
                            <div className="activity-block py-2 px-3">
                              <div className="pr-3 text-left">
                                <div className="remark-section">
                                  <Input
                                    type="textarea"
                                    name={"remarks"}
                                    placeholder="Remarks"
                                    value={remarks}
                                    handleChange={(e: any) => arrayHelpers.push(e.target.value)}
                                    className="height-textarea "
                                  />
                                  <div className="add-remark-btn" onClick={(e) => {
                                    console.log("e.target.value", remarkInput);
                                    ;
                                    setRemark(addRemark = false)
                                  }}>
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
                          </>
                        )}
                    </div>
                  )}
                />
              </>
            ) : null}
            {
              remarks && remarks.length ?
                remarks.map((remarkData: ICareInstitutionRemarks, index: number) => {
                  <div className="activity-block py-2 px-3">
                    <div className="pr-3 text-left">
                      <span className="text-capitalize">
                        {remarkData.data}
                        <span className="view-more-link">View More</span>
                      </span>
                    </div>
                    <div className="text-left activity-date">
                      <span>
                        <i className="fa fa-clock-o mr-2"></i>
                        {remarkData.createdAt}
                      </span>
                      <span>
                        <i className="fa fa-user mr-2"></i>{remarkData.createdBy}
                      </span>
                    </div>
                    <span className="activity-icon activity-set"></span>
                  </div>
                }) :
                null
            }
          </div>
        </div>
      </div>
    </Col>
  )
}

export default RemarkFormData