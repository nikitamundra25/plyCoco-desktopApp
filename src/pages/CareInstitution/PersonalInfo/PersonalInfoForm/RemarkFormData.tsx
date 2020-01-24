import React, { FunctionComponent, useState } from "react";
import { FormGroup, Label, Input, Col, Row, Form } from "reactstrap";
import Select from "react-select";
import { Formik, FormikProps, FormikHelpers, FieldArray } from "formik";
import { languageTranslation, logger } from "../../../../helpers";
import {
  ICareInstitutionFormValues,
  ICareInstitutionRemarks
} from "../../../../interfaces";
import { State } from "../../../../config";
import moment from "moment";

const RemarkFormData: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
>> = (
  props: FormikProps<ICareInstitutionFormValues> & {
    setRemarksDetail?: any;
    remarksDetail?: any;
  }
) => {
  const [activeRemark, setActiveRemark] = useState(0);
  let [changeRemark, setchangeRemark] = useState({
    data: "",
    createdAt: "",
    createdBy: ""
  });

  let [isEditRemark, setisEditRemark] = useState(false);
  let [remarkIndex, setisRemarkIndex] = useState(-1);
  let [isRemoveRemark, setRemoveRemark] = useState(false);

  const {
    values: { remarks, remarkData },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setRemarksDetail,
    remarksDetail
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
            <div>
              <div>
                <div className="activity-block py-2 px-3">
                  <div className=" text-left">
                    <div className="remark-section">
                      <Input
                        type="textarea"
                        name={"remarkData"}
                        onChange={
                          handleChange
                          // (e: any) =>
                          // setchangeRemark(
                          //   (changeRemark = {
                          //     data: e.target.value.trimStart(),
                          //     createdAt: moment().format(
                          //       'MMMM Do YYYY, h:mm a',
                          //     ),
                          //     createdBy: 'john doe',
                          //   }),
                          // )
                        }
                        placeholder="Remarks"
                        value={remarkData}
                        className="height-textarea "
                      />
                    </div>
                  </div>
                  <div className="activity-date position-relative">
                    <span>
                      <i className="fa fa-clock-o mr-2"></i>
                      {moment().format("MMMM Do YYYY, h:mm a")}
                    </span>
                    <span>
                      <i className="fa fa-user mr-2"></i>Mark Smith
                    </span>
                    <div className="remark-action-btn">
                      {!isEditRemark ? (
                        <div
                          className={`add-remark-btn ${
                            !remarkData ? "disabled-div" : " "
                          }`}
                          onClick={e => {
                            const temp = remarksDetail ? remarksDetail : [];
                            temp.unshift({
                              data: remarkData,
                              createdAt: moment().format(
                                "MMMM Do YYYY, h:mm a"
                              ),
                              createdBy: "john doe"
                            });
                            if (setRemarksDetail) {
                              setRemarksDetail(temp);
                              setFieldValue("remarkData", "");
                            }
                            // changeRemark && changeRemark.data
                            //   ? arrayHelpers.push(changeRemark)
                            //   : null;
                            // setchangeRemark(
                            //   (changeRemark = {
                            //     data: '',
                            //     createdAt: '',
                            //     createdBy: '',
                            //   }),
                            // );
                            // null;
                          }}
                        >
                          <i className={"fa fa-plus"} />
                          &nbsp; Add More
                        </div>
                      ) : (
                        <>
                          <div
                            className={"add-remark-btn"}
                            onClick={e => {
                              const temp = remarksDetail ? remarksDetail : [];
                              temp[activeRemark].data = remarkData;
                              // temp.push({
                              //   data: remarkData,
                              //   createdAt: moment().format(
                              //     'MMMM Do YYYY, h:mm a',
                              //   ),
                              //   createdBy: 'john doe',
                              // });
                              if (setRemarksDetail) {
                                setRemarksDetail(temp);
                                setFieldValue("remarkData", "");
                                setisEditRemark(false);
                              }
                            }}
                          >
                            Update
                          </div>
                          {/* <span
                            className={'delete-btn cursor-pointer'}
                            onClick={() => {
                              setisEditRemark((isEditRemark = false));
                              setchangeRemark(
                                (changeRemark = {
                                  data: '',
                                  createdAt: '',
                                  createdBy: '',
                                }),
                              );
                              null;
                            }}
                          >
                            <i className='fa fa-times'></i>
                          </span> */}
                        </>
                      )}
                    </div>
                  </div>
                  <span className="activity-icon activity-set"></span>
                </div>
              </div>
            </div>

            {remarksDetail && remarksDetail.length ? (
              <>
                {remarksDetail.map(
                  (remark: ICareInstitutionRemarks, index: number) => {
                    return (
                      <div className="activity-block py-2 ">
                        <div>
                          <div className="remark-section">{remark.data}</div>
                        </div>
                        <div className=" activity-date position-relative">
                          <span>
                            <i className="fa fa-clock-o mr-2"></i>
                            {remark.createdAt}
                          </span>
                          <span>
                            <i className="fa fa-user mr-2"></i>Mark Smith
                          </span>
                          <div className="remark-action-btn">
                            <span
                              onClick={() => {
                                setisEditRemark(true);
                                setActiveRemark(index);
                                setFieldValue("remarkData", remark.data);
                                // setchangeRemark(
                                //   (changeRemark = {
                                //     data: remark.data,
                                //     createdAt: moment(remark.createdAt).format(
                                //       'MMMM Do YYYY, h:mm a',
                                //     ),
                                //     createdBy: 'john doe',
                                //   }),
                                // );
                                // setisRemarkIndex((remarkIndex = index));
                              }}
                              className="edit-btn cursor-pointer"
                            >
                              <i className="icon-note"></i>
                            </span>
                            <span
                              onClick={() => {
                                let temp = remarksDetail ? remarksDetail : [];
                                temp = temp.filter(
                                  (remark: any, i: number) => i !== index
                                );
                                if (setRemarksDetail) {
                                  setRemarksDetail(temp);
                                  setFieldValue("remarkData", "");
                                  setisEditRemark(false);
                                }
                              }}
                              className="delete-btn cursor-pointer"
                              id={`delete${index}`}
                            >
                              <i className="icon-trash"></i>
                            </span>
                          </div>
                        </div>
                        <span className="activity-icon activity-set"></span>
                      </div>
                    );
                  }
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default RemarkFormData;
