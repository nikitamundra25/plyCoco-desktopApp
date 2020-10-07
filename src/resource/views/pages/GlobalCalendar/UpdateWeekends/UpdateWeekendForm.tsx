import React, { FunctionComponent } from "react";
import {
  IUpdateWeekendFormProps,
  IReactSelectInterface
} from "../../../../../interfaces";
import { FormGroup, Row, Col, Label } from "reactstrap";
import { languageTranslation, getYears } from "../../../../../helpers";
import Select, { ValueType } from "react-select";
import { Field } from "formik";
const UpdateWeekendForm: FunctionComponent<IUpdateWeekendFormProps> = ({
  fieldsInfo
}: IUpdateWeekendFormProps): JSX.Element => {
  const { values, setFieldValue } = fieldsInfo;
  const yearOptions: IReactSelectInterface[] = getYears(
    5
  ).map((year: number) => ({ label: year.toString(), value: year.toString() }));
  // get selected value for year
  const getSelectedValue = (): IReactSelectInterface | null => {
    let selectedValue: IReactSelectInterface | null = null;
    if (values.year) {
      selectedValue = {
        value: values.year.toString(),
        label: values.year.toString()
      };
    }
    return selectedValue;
  };
  // set year
  const onYearChange = (
    selectedValue?: ValueType<IReactSelectInterface>
  ): void => {
    setFieldValue(
      "year",
      selectedValue ? (selectedValue as IReactSelectInterface).value : ""
    );
  };

  return (
    <div className="form-section">
      <FormGroup>
        <Row>
          <Col sm="2">
            <Label className="form-label col-form-label">
              {languageTranslation("CHOOSE_YEAR")}{" "}
              <span className="required">*</span>
            </Label>
          </Col>
          <Col sm="10">
            <Field name={`year`}>
              {({ meta }: any) => (
                <div className="mb-2">
                  <Select
                    options={yearOptions}
                    classNamePrefix="custom-inner-reactselect"
                    className={"custom-reactselect"}
                    placeholder={languageTranslation("CHOOSE_YEAR_PLACEHOLDER")}
                    value={getSelectedValue()}
                    onChange={onYearChange}
                  />

                  {meta.touched && meta.error && (
                    <div className="required-tooltip text-danger">
                      {meta.error}
                    </div>
                  )}
                </div>
              )}
            </Field>

            <span className=" checkbox-custom ">
              <input
                type="checkbox"
                id="check"
                onChange={() => {
                  setFieldValue("overwriteExisting", !values.overwriteExisting);
                }}
                checked={values.overwriteExisting}
              />
              <Label for="check" className="">
                {languageTranslation("OVERWRITE_EXISTING_HOLIDAYS")}
              </Label>
            </span>
          </Col>
        </Row>
      </FormGroup>
    </div>
  );
};

export default UpdateWeekendForm;
