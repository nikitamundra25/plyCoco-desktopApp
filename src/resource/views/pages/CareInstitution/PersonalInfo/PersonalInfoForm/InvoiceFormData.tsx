import React, { FunctionComponent } from 'react';
import { FormGroup, Label, Input, Col, Row } from 'reactstrap';
import Select from 'react-select';
import { FormikProps } from 'formik';
import { languageTranslation } from '../../../../../../helpers';
import {
  ICareInstitutionFormValues,
  IHandleSelectInterface
} from '../../../../../../interfaces';
import { InvoiceType, InvoiceInterval } from '../../../../../../config';

const InvoiceFormData: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
> &
  IHandleSelectInterface> = (
  props: FormikProps<ICareInstitutionFormValues> & IHandleSelectInterface
) => {
  const {
    values: { invoiceType, interval, emailInvoice, addressInvoice },
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
    <div className="form-card minheight-auto mb-2">
      <Row>
         <Col xs={"12"}>
          <FormGroup>
            <Row>
              <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                <Label className="form-label col-form-label">
                  {languageTranslation("INVOICE_TYPE")}
                </Label>
              </Col>
               <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Select
                    placeholder={languageTranslation("INVOICE_TYPE")}
                    value={invoiceType ? invoiceType : undefined}
                    onChange={(value: any) =>
                      handleSelect(value, "invoiceType")
                    }
                    options={InvoiceType}
                    classNamePrefix="custom-inner-reactselect"
                    className={"custom-reactselect"}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>
         <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
          <FormGroup>
            <Row>
              <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                <Label className="form-label col-form-label">
                  {languageTranslation("Interval")}
                </Label>
              </Col>
               <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Select
                    placeholder={languageTranslation("Interval")}
                    value={interval ? interval : undefined}
                    onChange={(value: any) => handleSelect(value, "interval")}
                    options={InvoiceInterval}
                    classNamePrefix="custom-inner-reactselect"
                    className={"custom-reactselect"}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>
         <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
          <FormGroup>
            <Row>
              <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                <Label className="form-label col-form-label">
                  {"Email Invoice"}
                </Label>
              </Col>
               <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
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
         <Col xs={"12"} sm={"12"} md={"12"} lg={"12"}>
          <FormGroup className="mb-0">
            <Row>
              <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                <Label className="form-label col-form-label">
                  {languageTranslation("ADRESS_INVOICE")} &nbsp;
                  {/* <small>You can enter upto 255 characters</small> */}
                </Label>
              </Col>
               <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                <div>
                  <Input
                    type="textarea"
                    name={"addressInvoice"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={addressInvoice}
                    placeholder={languageTranslation("ADRESS_INVOICE")}
                    className="textarea-custom"
                    rows="4"
                    maxLength={255}
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
export default InvoiceFormData;
