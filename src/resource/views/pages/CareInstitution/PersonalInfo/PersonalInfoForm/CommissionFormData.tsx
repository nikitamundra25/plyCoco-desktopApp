import React, { FunctionComponent } from "react";
import { FormGroup, Label, Input, Col, Row } from "reactstrap";
import Select from "react-select";
import { FormikProps } from "formik";
import { languageTranslation } from "../../../../../../helpers";
import {
  ICareInstitutionFormValues,
  IHandleSelectInterface
} from "../../../../../../interfaces";
import { CareInstLeasingPriceList,PlycocoInvoiceTax, LeasingInvoiceTax } from "../../../../../../config";

const CommissionFormData: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
> &
  IHandleSelectInterface> = (
  props: FormikProps<ICareInstitutionFormValues> & IHandleSelectInterface
) => {
  const {
    values: { careGiverCommission, doctorCommission, leasingPriceListId, leasingInvoiceTax, plycocoInvoiceTax },
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSelect
  } = props;

  return (
    <div className="form-card minheight-auto mb-2">
      <Row>
        <Col xs={"12"}>
          <FormGroup>
            <Row className="align-items-center">
              <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                <Label className="form-label col-form-label">
                  {languageTranslation("HEALTH_CARE_FEE")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <Row className="custom-col inner-no-padding-col">
                  <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                    <div className="required-input">
                      <Input
                        type="text"
                        name={"careGiverCommission"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={careGiverCommission}
                        className={
                          errors.careGiverCommission &&
                          touched.careGiverCommission
                            ? "width-common error"
                            : "width-common"
                        }
                      />
                      {errors.careGiverCommission &&
                        touched.careGiverCommission && (
                          <div className="required-tooltip bottom-tooltip">
                            {errors.careGiverCommission}
                          </div>
                        )}
                    </div>
                  </Col>
                  <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                    <FormGroup>
                      <Row className="custom-col inner-no-padding-col align-items-center">
                        <Col xs={"12"} sm={"6"} md={"6"} lg={"6"}>
                          <Label className="form-label col-form-label inner-label">
                            {languageTranslation("DOCTOR_FEE")}
                          </Label>
                        </Col>
                        <Col xs={"12"} sm={"6"} md={"6"} lg={"6"}>
                          <div className="required-input">
                            <Input
                              type="text"
                              name={"doctorCommission"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={doctorCommission}
                              className={
                                errors.doctorCommission &&
                                touched.doctorCommission
                                  ? "width-common error"
                                  : "width-common"
                              }
                            />
                            {errors.doctorCommission &&
                              touched.doctorCommission && (
                                <div className="required-tooltip bottom-tooltip">
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
        <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
          <FormGroup className="mb-0">
            <Row className="align-items-center">
              <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                <Label className="form-label col-form-label">
                  {languageTranslation("LEASING_PRICE_LIST")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Select
                    placeholder={languageTranslation("LEASING_PRICE_LIST")}
                    value={
                      leasingPriceListId && leasingPriceListId.value
                        ? leasingPriceListId
                        : undefined
                    }
                    onChange={(value: any) =>
                      handleSelect(value, "leasingPriceListId")
                    }
                    options={CareInstLeasingPriceList}
                    classNamePrefix="custom-inner-reactselect"
                    className={"custom-reactselect"}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>

        <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
          <FormGroup className="mb-0">
            <Row className="align-items-center">
              <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                <Label className="form-label col-form-label">
                  {languageTranslation("PLYCOCO_INVOICE_TAX")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Select
                    placeholder={languageTranslation("PLYCOCO_INVOICE_TAX")}
                    value={
                      plycocoInvoiceTax && plycocoInvoiceTax.value
                        ? plycocoInvoiceTax
                        : undefined
                    }
                    onChange={(value: any) =>
                      handleSelect(value, "plycocoInvoiceTax")
                    }
                    options={PlycocoInvoiceTax}
                    classNamePrefix="custom-inner-reactselect"
                    className={"custom-reactselect"}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>

        <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
          <FormGroup className="mb-0">
            <Row className="align-items-center">
              <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                <Label className="form-label col-form-label">
                  {languageTranslation("LEASING_INVOICE_TAX")}
                </Label>
              </Col>
              <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Select
                    placeholder={languageTranslation("LEASING_INVOICE_TAX")}
                    value={
                      leasingInvoiceTax && leasingInvoiceTax.value
                        ? leasingInvoiceTax
                        : undefined
                    }
                    onChange={(value: any) =>
                      handleSelect(value, "leasingInvoiceTax")
                    }
                    options={LeasingInvoiceTax}
                    classNamePrefix="custom-inner-reactselect"
                    className={"custom-reactselect"}
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
