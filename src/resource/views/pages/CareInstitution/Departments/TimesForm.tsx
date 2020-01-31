import React, { FunctionComponent } from "react";
import { FormGroup, Label, Input, Col, Row, Table, Button } from "reactstrap";
import { DateMask } from "../../../../../config";
import { FormikProps, Field } from "formik";
import { languageTranslation } from "../../../../../helpers";
import MaskedInput from "react-text-mask";
import { IAddTimeFormValues } from "../../../../../interfaces";

const TimesForm: FunctionComponent<FormikProps<IAddTimeFormValues> & any> = (
  props: FormikProps<IAddTimeFormValues> & any
) => {
  const {
    values: { userId, begin, end, comment },
    timesData,
    setTimesData,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;

  return (
    <>
      <div>
        <h5 className="content-title"> {languageTranslation("TIMES")}</h5>
      </div>
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
                    <td>{item.comment}</td>
                    <td className="text-center">
                      <div className="action-btn">
                        <span
                          className="btn-icon "
                          onClick={() => {
                            const filteredTimes = timesData.filter(
                              (t: any, i: number) => i !== index
                            );
                            setTimesData(filteredTimes);
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
      <div className="form-card minheight-auto">
        <Row>
          <Col lg={"12"}>
            <FormGroup>
              <Row>
                <Col sm="3">
                  <Label className="form-label col-form-label">
                    {languageTranslation("ID")}
                    {/* <span className="required">*</span> */}
                  </Label>
                </Col>
                <Col sm="9">
                  <div>
                    <Input
                      type="text"
                      name={"userId"}
                      disabled
                      value={userId}
                      placeholder={languageTranslation("USER_ID")}
                      className="width-common"
                    />
                  </div>
                </Col>
              </Row>
            </FormGroup>
          </Col>
          <Col lg={"12"}>
            <FormGroup>
              <Row>
                <Col lg={"12"}></Col>
                <Col sm="3">
                  <Label className="form-label col-form-label">
                    {languageTranslation("BEGIN")}
                    {/* <span className="required">*</span> */}
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
                            "EMPLOYEE_JOINING_DATE_PLACEHOLDER"
                          )}
                          mask={DateMask}
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
              <Row>
                <Col lg={"12"}></Col>
                <Col sm="3">
                  <Label className="form-label col-form-label">
                    {languageTranslation("END")}
                    {/* <span className="required">*</span> */}
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
                            "EMPLOYEE_JOINING_DATE_PLACEHOLDER"
                          )}
                          mask={DateMask}
                          className={
                            errors.end && touched.end
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
                    {/* <span className="required">*</span> */}
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
                      className="textarea-custom"
                    />
                  </div>
                </Col>
              </Row>
            </FormGroup>
          </Col>
          <Col lg={"12"}>
            <Button
              className="btn-submit text-center"
              onClick={handleSubmit}
              block
              color={"primary"}
              disabled={!(begin && end)}
            >
              <span>
                {" "}
                <i className="fa fa-floppy-o"></i>
              </span>{" "}
              {languageTranslation("SAVE_BUTTON")}
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default TimesForm;
