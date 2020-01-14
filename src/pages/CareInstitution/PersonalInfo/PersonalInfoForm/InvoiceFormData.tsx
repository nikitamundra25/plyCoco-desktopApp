import React, { FunctionComponent } from "react";
import { FormGroup, Label, Input, Col, Row, Form } from "reactstrap";
import Select from "react-select";
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { languageTranslation, logger } from "../../../../helpers";
import { ICareInstitutionFormValues, IHandleSelectInterface } from "../../../../interfaces";
import { Region } from "../../../../config";

const InvoiceFormData: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
> & IHandleSelectInterface> = (props: FormikProps<ICareInstitutionFormValues> & IHandleSelectInterface) => {
  const {
    values: {
      invoiceType,
      interval,
      emailInvoice,
      addressInvoice
    },
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
                  {languageTranslation("INVOICE_TYPE")}
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Select
                    placeholder={languageTranslation("INVOICE_TYPE")}
                    isMulti
                    value={invoiceType ? invoiceType : undefined}
                    onChange={(value: any) =>
                      handleSelect(value, 'invoiceType')
                    }
                    options={Region}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>
        <Col lg={"12"}>
          <FormGroup>
            <Row>
              <Col sm="4">
                <Label className="form-label col-form-label">
                  {languageTranslation("Interval")}
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Select
                    placeholder={languageTranslation("Interval")}
                    isMulti
                    value={interval ? interval : undefined}
                    onChange={(value: any) =>
                      handleSelect(value, 'interval')
                    }
                    options={Region}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>
        <Col lg={"12"}>
          <FormGroup>
            <Row>
              <Col sm="4">
                <Label className="form-label col-form-label">
                  {"Email Invoice"}
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Input
                    name={"emailInvoice"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={emailInvoice}
                    placeholder={"Email Invoice"}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>
        <Col lg={"12"}>
          <FormGroup>
            <Row>
              <Col sm="4">
                <Label className="form-label col-form-label">
                  {languageTranslation("ADRESS_INVOICE")}
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Input
                    type="textarea"
                    name={"addressInvoice"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={addressInvoice}
                    placeholder={languageTranslation(
                      "ADRESS_INVOICE"
                    )}
                    className="textarea-custom"
                    rows="4"
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>
      </Row>
    </div>
  )
}
export default InvoiceFormData