import React, { FunctionComponent, useState } from "react";
import { Input, Col } from "reactstrap";
import { FormikProps, FieldArray } from "formik";
import { languageTranslation } from "../../../helpers";
import { ICareInstitutionRemarks, ICareGiverValues } from "../../../interfaces";
import moment from "moment";

const RemarkFormComponent: FunctionComponent<FormikProps<ICareGiverValues>> = (
  props: FormikProps<ICareGiverValues>
) => {
  let [addRemark, setRemark] = useState(true);
  let [changeRemark, setchangeRemark] = useState({
    data: "",
    createdAt: "",
    createdBy: ""
  });

  const {
    values: { remarks },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched
  } = props;

  return (
    <Col lg={4}>
      <div className="remark-details">
        <div className="remark-header d-flex align-items-center justify-content-between">
          <h5 className="my-2 text-left activity-title">
            {" "}
            {languageTranslation("REMARKS")}
          </h5>
        </div>
        <div className="remark-body remark-body-max-height ">
          <div className="activity-logs ">
            {addRemark ? (
              <>
                <FieldArray
                  name="remarks"
                  render={arrayHelpers => (
                    <div>
                      <div>
                        <div className="activity-block py-2 px-3">
                          <div className="pr-3 text-left">
                            <div className="remark-section">
                              <Input
                                type="textarea"
                                name={"remarks"}
                                onChange={(e: any) =>
                                  setchangeRemark(
                                    (changeRemark = {
                                      data: e.target.value.trimStart(),
                                      createdAt: moment().format(
                                        "MMMM Do YYYY, h:mm a"
                                      ),
                                      createdBy: "john doe"
                                    })
                                  )
                                }
                                placeholder="Remarks"
                                value={changeRemark.data}
                                className="height-textarea "
                              />
                              <div
                                className={`add-remark-btn ${
                                  !changeRemark.data ? "disabled-div" : " "
                                }`}
                                onClick={e => {
                                  changeRemark && changeRemark.data
                                    ? arrayHelpers.push(changeRemark)
                                    : null;
                                  setchangeRemark(
                                    (changeRemark = {
                                      data: "",
                                      createdAt: "",
                                      createdBy: ""
                                    })
                                  );
                                  null;
                                }}
                              >
                                {" "}
                                {languageTranslation("ADD_REMARKS")}
                              </div>
                            </div>
                          </div>
                          <div className="text-left activity-date">
                            <span>
                              <i className="fa fa-clock-o mr-2"></i>
                              {moment().format("MMMM Do YYYY, h:mm a")}
                            </span>
                            <span>
                              <i className="fa fa-user mr-2"></i>Mark Smith
                            </span>
                          </div>
                          <span className="activity-icon activity-set"></span>
                        </div>
                      </div>
                    </div>
                  )}
                />
              </>
            ) : null}
            {remarks && remarks.length ? (
              <>
                {remarks.reverse().map((remark: ICareInstitutionRemarks) => {
                  return (
                    <div className="activity-block py-2 px-3">
                      <div className="pr-3 text-left">
                        <div className="remark-section">{remark.data}</div>
                      </div>
                      <div className="text-left activity-date">
                        <span>
                          <i className="fa fa-clock-o mr-2"></i>
                          {remark.createdAt}
                        </span>
                        <span>
                          <i className="fa fa-user mr-2"></i>Mark Smith
                        </span>
                      </div>
                      <span className="activity-icon activity-set"></span>
                    </div>
                  );
                })}
              </>
            ) : (
              ""
            )}

            {remarks && remarks.length
              ? remarks
                  .reverse()
                  .map((remarkData: ICareInstitutionRemarks, index: number) => {
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
                          <i className="fa fa-user mr-2"></i>
                          {remarkData.createdBy}
                        </span>
                      </div>
                      <span className="activity-icon activity-set"></span>
                    </div>;
                  })
              : null}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default RemarkFormComponent;
