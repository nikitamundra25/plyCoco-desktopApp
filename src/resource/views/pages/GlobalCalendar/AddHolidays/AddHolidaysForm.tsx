import React, { FunctionComponent } from "react";
import { FormGroup, Col, Label, Row, Input, Button } from "reactstrap";
import { languageTranslation } from "../../../../../helpers";
import { FieldArray, Field } from "formik";
import {
  IAddHolidaysFormValues,
  IReactSelectInterface,
  IAddHolidayProps,
  IAddHolidaysFormProps
} from "../../../../../interfaces";
import Select, { ValueType } from "react-select";
const AddHolidaysForm: FunctionComponent<IAddHolidaysFormProps> = (
  props: IAddHolidaysFormProps
): JSX.Element => {
  const { states, fieldsInfo, addNewHoliday, removeHoliday } = props;
  const { values, handleBlur, handleChange, setFieldValue } = fieldsInfo;
  const handleStateChange = (
    value: ValueType<IReactSelectInterface[]>,
    index: number
  ): void => {
    let valueToSet: number[] = [];
    // check if all option is selected
    const isAllSelected = value
      ? (value as IReactSelectInterface[]).findIndex(
          (val: IReactSelectInterface) => val.value.toLowerCase() === "all"
        ) > -1
      : false;
    valueToSet = isAllSelected
      ? states.map(state => Number(state.id))
      : ((value ||
          []) as IReactSelectInterface[]).map((val: IReactSelectInterface) =>
          Number(val.value)
        );
    // set field value in formik
    setFieldValue(`[${index}]states`, valueToSet);
  };
  // create options for react-select
  const stateOptions: IReactSelectInterface[] = states.map(state => ({
    value: state.id,
    label: state.name
  }));
  // push all on the first index
  stateOptions.unshift({
    label: "All",
    value: "all"
  });
  return (
    <>
      <FieldArray
        name={"values"}
        render={() => {
          return values.map(
            (holidaysData: IAddHolidaysFormValues, index: number) => {
              return (
                <React.Fragment key={index}>
                  <Row className={"holiday-add-block"}>
                    <Col sm="6">
                      <FormGroup>
                        <Row>
                          <Col sm="4">
                            <Label className="form-label col-form-label">
                              {languageTranslation("HOLIDAY_DATE")}{" "}
                              <span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="8">
                            <Field name={`[${index}].date`}>
                              {({
                                field,
                                form: { touched, errors },
                                meta
                              }: any) => {
                                console.log(meta);
                                return (
                                  <>
                                    <Input
                                      type="text"
                                      placeholder={languageTranslation(
                                        "HOLIDAY_DATE_PLACEHOLDER"
                                      )}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      rows="4"
                                      maxLength={255}
                                      className={
                                        meta.touched && meta.error
                                          ? "error"
                                          : ""
                                      }
                                      value={holidaysData.date}
                                      {...field}
                                    />
                                    {meta.touched && meta.error && (
                                      <div className="required-tooltip">
                                        {meta.error}
                                      </div>
                                    )}
                                  </>
                                );
                              }}
                            </Field>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Row>
                          <Col sm="4">
                            <Label className="form-label col-form-label">
                              {languageTranslation("HOLIDAY_NOTE")}{" "}
                              <span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="8">
                            <Field name={`[${index}].note`}>
                              {({
                                field,
                                form: { touched, errors },
                                meta
                              }: any) => (
                                <>
                                  <Input
                                    type="text"
                                    placeholder={languageTranslation(
                                      "HOLIDAY_NOTE_PLACEHOLDER"
                                    )}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    rows="4"
                                    maxLength={255}
                                    className={
                                      meta.touched && meta.error ? "error" : ""
                                    }
                                    value={holidaysData.note}
                                    {...field}
                                  />
                                  {meta.touched && meta.error && (
                                    <div className="required-tooltip">
                                      {meta.error}
                                    </div>
                                  )}
                                </>
                              )}
                            </Field>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Row>
                          <Col sm="2">
                            <Label className="form-label col-form-label">
                              {languageTranslation("HOLIDAY_STATES")}{" "}
                              <span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="10">
                            <>
                              <Select
                                options={stateOptions as any}
                                classNamePrefix="custom-inner-reactselect"
                                onChange={(
                                  value: ValueType<IReactSelectInterface[]>
                                ) => handleStateChange(value, index)}
                                className={"custom-reactselect"}
                                placeholder={languageTranslation(
                                  "HOLIDAY_STATES_PLACEHOLDER"
                                )}
                                isMulti
                              />
                            </>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    {index > 0 ? (
                      <a
                        className={"remove-icon"}
                        onClick={() => removeHoliday(index)}
                      >
                        <i className={"fa fa-trash"} />
                      </a>
                    ) : null}
                  </Row>
                  <hr />
                </React.Fragment>
              );
            }
          );
        }}
      />
      <Button color={"primary"} onClick={() => addNewHoliday(values)}>
        <i className={"fa fa-plus"} />
        &nbsp;&nbsp;New
      </Button>
    </>
  );
};

export default AddHolidaysForm;
