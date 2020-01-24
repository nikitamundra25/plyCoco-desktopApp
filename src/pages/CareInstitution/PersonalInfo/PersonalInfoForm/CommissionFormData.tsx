import React, { FunctionComponent } from "react";
import { FormGroup, Label, Input, Col, Row, Form } from "reactstrap";
import Select from "react-select";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { languageTranslation, logger } from "../../../../helpers";
import {
  ICareInstitutionFormValues,
  IHandleSelectInterface
} from "../../../../interfaces";
import { Region, LeasingPriceList } from "../../../../config";

const CommissionFormData: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
> &
  IHandleSelectInterface> = (
  props: FormikProps<ICareInstitutionFormValues> & IHandleSelectInterface
) => {
  const {
    values: { careGiverCommission, doctorCommission, leasingPriceListId },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    handleSelect
  } = props;

  return (
    <div className="form-card minheight-auto">
      <Row>
        <Col lg={"12"}>
          <FormGroup>
            <Row>
              <Col sm="4">
                <Label className="form-label col-form-label">
                  {languageTranslation("HEALTH_CARE_FEE")}
                </Label>
              </Col>
              <Col sm="8">
                <Row className="custom-col inner-no-padding-col">
                  <Col sm="4">
                    <div>
                      <Input
                        type="text"
                        name={"careGiverCommission"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={careGiverCommission}
                        placeholder={languageTranslation("HEALTH_CARE_FEE")}
                        className="width-common"
                      />
                      {errors.careGiverCommission &&
                        touched.careGiverCommission && (
                          <div className="required-error left">
                            {errors.careGiverCommission}
                          </div>
                        )}
                    </div>
                  </Col>
                  <Col sm="8">
                    <FormGroup>
                      <Row className="custom-col inner-no-padding-col">
                        <Col sm="6">
                          <Label className="form-label col-form-label inner-label">
                            {languageTranslation("DOCTOR_FEE")}
                          </Label>
                        </Col>
                        <Col sm="6">
                          <div>
                            <Input
                              type="text"
                              name={"doctorCommission"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={doctorCommission}
                              placeholder={languageTranslation("DOCTOR_FEE")}
                              className="width-common"
                            />
                            {errors.doctorCommission &&
                              touched.doctorCommission && (
                                <div className="required-error left">
                                  {errors.doctorCommission}
                                </div>
                              )}
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </FormGroup>
        </Col>
        <Col lg={"12"}>
          <FormGroup>
            <Row>
              <Col sm="4">
                <Label className="form-label col-form-label">
                  {languageTranslation("LEASING_PRICE_LIST")}
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Select
                    placeholder={languageTranslation("LEASING_PRICE_LIST")}
                    value={leasingPriceListId ? leasingPriceListId : undefined}
                    onChange={(value: any) =>
                      handleSelect(value, "leasingPriceListId")
                    }
                    options={LeasingPriceList}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};

export default CommissionFormData;
