import React, { FunctionComponent } from "react";
import { FormGroup, Label, Input, Col, Row, Table, Button } from "reactstrap";
import { TimeMask } from "../../../../../config";
import { FormikProps, Field } from "formik";
import { languageTranslation } from "../../../../../helpers";
import MaskedInput from "react-text-mask";
import { IAddTimeFormValues } from "../../../../../interfaces";
import moment from 'moment';
import { ConfirmBox } from "../../../components/ConfirmBox";
import { toast } from "react-toastify";

let toastId: any = '';

const TimesForm: FunctionComponent<FormikProps<IAddTimeFormValues> & any> = (
  props: FormikProps<IAddTimeFormValues> & any
) => {
  const {
    values: { begin, end, comment },
    timesData,
    setTimesData,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;

  let d = moment().format('L');
  let dtStart: any = new Date(d + " " + begin);
  let dtEnd: any = new Date(d + " " + end);
  let difference = dtEnd - dtStart;

  const onDelete = async (timesData: any, index: number) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_DEPARTMENT_DELETE_MSG'),
    });
    if (!value) {
      return;
    } else {
      const filteredTimes = timesData.filter(
        (t: any, i: number) => i !== index
      );
      setTimesData(filteredTimes);
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation('DEPARTMENT_DELETE_SUCCESS_MSG'),
        );
      }
    }
  };

  return (
    <>
      <div>
        <h5 className="content-title"> {languageTranslation("TIMES")}</h5>
      </div>
      {timesData && timesData.length ? (
        <Table bordered hover responsive>
          <thead className="thead-bg">
            <tr>
              <th>{languageTranslation("BEGIN")}</th>
              <th>{languageTranslation("END")}</th>
              <th>{languageTranslation("COMMENTS")}</th>
              <th className="text-center">
                {languageTranslation("TABEL_HEAD_CG_ACTION")}
              </th>
            </tr>
          </thead>
          <tbody>
            {timesData && timesData.length
              ? timesData.map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{item.begin}</td>
                    <td>{item.end}</td>
                    <td>{item.comment ? item.comment : "-"}</td>
                    <td className="text-center">
                      <div className="action-btn">
                        <span
                          className="btn-icon "
                          onClick={() => {
                            onDelete(timesData, index);
                            // const filteredTimes = timesData.filter(
                            //   (t: any, i: number) => i !== index
                            // );
                            // setTimesData(filteredTimes);
                          }}
                        >
                          <i className="fa fa-trash"></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
              : null}
          </tbody>
        </Table>
      ) : null}
      <div className="form-card minheight-auto">
        <Row>
          <Col lg={"12"}>
            <FormGroup>
              <Row className="align-items-center">
                <Col sm="3">
                  <Label className="form-label col-form-label">
                    {languageTranslation("BEGIN")}
                  </Label>
                </Col>
                <Col sm="9">
                  <div>
                    <Field
                      name={"begin"}
                      render={({ field }: any) => (
                        <MaskedInput
                          {...field}
                          placeholder={languageTranslation(
                            "EMPLOYEE_JOINING_TIME_PLACEHOLDER"
                          )}
                          mask={TimeMask}
                          className={
                            errors.begin && touched.begin
                              ? "text-input error form-control"
                              : "text-input form-control"
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={begin}
                        />
                      )}
                    />
                    {errors.begin && touched.begin && (
                      <div className="required-tooltip">{errors.begin}</div>
                    )}
                  </div>
                </Col>
              </Row>
            </FormGroup>
          </Col>
          <Col lg={"12"}>
            <FormGroup>
              <Row className="align-items-center">
                <Col sm="3">
                  <Label className="form-label col-form-label">
                    {languageTranslation("END")}
                  </Label>
                </Col>
                <Col sm="9">
                  <div>
                    <Field
                      name={"end"}
                      render={({ field }: any) => (
                        <MaskedInput
                          {...field}
                          placeholder={languageTranslation(
                            "EMPLOYEE_JOINING_TIME_PLACEHOLDER"
                          )}
                          mask={TimeMask}
                          className={
                            (errors.end && touched.end) || (difference < 0 || isNaN(difference))
                              ? "text-input error form-control"
                              : "text-input form-control"
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={end}
                        />
                      )}
                    />
                    {errors.end && touched.end && (
                      <div className="required-tooltip">{errors.end}</div>
                    )}
                    {touched.end && (difference < 0 || isNaN(difference)) ?
                      <div className="required-tooltip">{languageTranslation(
                        "VALID_TIME_RANGE"
                      )}</div>
                      : null}
                  </div>
                </Col>
              </Row>
            </FormGroup>
          </Col>
          <Col lg={"12"}>
            <FormGroup>
              <Row>
                <Col sm="3">
                  <Label className="form-label col-form-label">
                    {languageTranslation("COMMENT")}
                  </Label>
                </Col>
                <Col sm="9">
                  <div>
                    <Input
                      type="textarea"
                      name={"comment"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={comment}
                      rows="3"
                      placeholder={languageTranslation("COMMENT")}
                      className="textarea-custom"
                    />
                  </div>
                </Col>
              </Row>
            </FormGroup>
          </Col>
          <Col lg={"12"} className="text-right">
            <Button
              className="status-btn"
              onClick={handleSubmit}
              color={"primary"}
              disabled={!(begin && end)}
            >
              <span>
                {" "}
                <i className={"fa fa-plus"} />
              </span>{" "}
              {languageTranslation("ADD_MORE_BUTTON")}
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default TimesForm;
