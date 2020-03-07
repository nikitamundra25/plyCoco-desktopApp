import React, { FunctionComponent, useState } from "react";
import { FormGroup, Col, Label, Row, Input, Button } from "reactstrap";
import { languageTranslation } from "../../../../../helpers";
import { FieldArray, Field } from "formik";
import {
  IAddHolidaysFormValues,
  IReactSelectInterface,
  IAddHolidaysFormProps,
  IState
} from "../../../../../interfaces";
import Select, { ValueType } from "react-select";
import MaskedInput from "react-text-mask";
import { DateMask } from "../../../../../config";
const AddHolidaysForm: FunctionComponent<IAddHolidaysFormProps> = (
  props: IAddHolidaysFormProps
): JSX.Element => {
  const {
    states,
    fieldsInfo,
    addNewHoliday,
    removeHoliday,
    isEditMode
  } = props;
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
    setFieldValue(`inputs.${index}.states`, valueToSet);
  };
  // create options for react-select
  const stateOptions: IReactSelectInterface[] = states.map((state: IState) => ({
    value: state.id,
    label: state.name
  }));
  // push all at the first index
  const allOption: IReactSelectInterface = {
    label: "All",
    value: "all"
  };
  stateOptions.unshift(allOption);
  // set selected
  const getSelectedStates = (index: number): IReactSelectInterface[] => {
    let selectedOptions: IReactSelectInterface[] = [];
    const selectedStates = values.inputs[index].states || [];
    states.forEach((state: IState) => {
      if (
        selectedStates
          .map((selectedState: number) => Number(selectedState))
          .indexOf(Number(state.id)) > -1
      ) {
        selectedOptions.push({
          label: state.name,
          value: state.id
        });
      }
    });
    if (states.length === selectedOptions.length) {
      selectedOptions = [allOption];
    }
    return selectedOptions;
  };
  return (
    <>
      <FieldArray
        name={"inputs"}
        render={() => {
          return values.inputs.map(
            (holidaysData: IAddHolidaysFormValues, index: number) => {
              return (
                <React.Fragment key={index}>
                  <Row className={"holiday-add-block form-section"}>
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
                            <Field name={`inputs.${index}.date`}>
                              {({ field, meta }: any) => {
                                return (
                                  <>
                                    <MaskedInput
                                      {...field}
                                      placeholder={languageTranslation(
                                        "HOLIDAY_DATE_PLACEHOLDER"
                                      )}
                                      mask={DateMask}
                                      className={
                                        meta.touched && meta.error
                                          ? "error form-control"
                                          : "form-control"
                                      }
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={holidaysData.date}
                                      {...field}
                                    />
                                    {meta.touched && meta.error && (
                                      <div className="required-tooltip text-danger">
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
                            </Label>
                          </Col>
                          <Col sm="8">
                            <Field name={`inputs.${index}.note`}>
                              {({ field, meta }: any) => (
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
                                    <div className="required-tooltip text-danger">
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
                                value={getSelectedStates(index)}
                              />
                            </>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    {index > 0 && !isEditMode ? (
                      <a
                        className={"remove-icon"}
                        onClick={() => removeHoliday(values, index)}
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
      {isEditMode ? null : (
        <Button color={"primary"} onClick={() => addNewHoliday(values)}>
          <i className={"fa fa-plus"} />
          &nbsp;&nbsp;New
        </Button>
      )}
    </>
  );
};

export default AddHolidaysForm;
