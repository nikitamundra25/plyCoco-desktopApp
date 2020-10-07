import React from 'react';
import Select from 'react-select';
import { Label, Col, Row, FormGroup } from 'reactstrap';
import { FormikProps, Field } from 'formik';
import {
  NightAllowancePerHour,
  InvoiceInterval,
  LeasingPriceList
} from '../../../../../config';
import {
  CareGiverValues,
  IReactSelectInterface
} from '../../../../../interfaces';
import { FormikTextField } from '../../../components/forms/FormikFields';
import { logger, languageTranslation } from '../../../../../helpers';

const BillingSettingsFormComponent: any = (
  props: FormikProps<CareGiverValues>
) => {
  const {
    values: { nightAllowance, invoiceInterval, leasingPricingList, caregiverInvoiceTax, defaultTaxValue },
    setFieldValue,
    errors
  } = props;
  logger(props.values, 'values');
  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    setFieldValue(name, selectOption);
  };
  return (
    <div className='form-card minheight-auto mb-2'>
      <Row>
        <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
          <FormGroup>
            <Row className='align-items-center'>
              <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                <Label className='form-label col-form-label'>
                  {languageTranslation('FEE')}
                </Label>
              </Col>
              <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
                <Row className='custom-col inner-no-padding-col'>
                  <Col xs={'12'} sm={'5'} md={'5'} lg={'5'}>
                    <div className='required-input'>
                      <Field
                        component={FormikTextField}
                        name={'fee'}
                        className='width-common'
                      />
                    </div>
                  </Col>
                  <Col xs={'12'} sm={'7'} md={'7'} lg={'7'}>
                    <FormGroup>
                      <Row className='custom-col inner-no-padding-col align-items-center'>
                        <Col xs={'12'} sm={'5'} md={'5'} lg={'5'}>
                          <Label className='form-label col-form-label inner-label'>
                            {languageTranslation('NIGHT')}
                          </Label>
                        </Col>
                        <Col xs={'12'} sm={'7'} md={'7'} lg={'7'}>
                          <div className='required-input'>
                            <Field
                              component={FormikTextField}
                              name={'night'}
                              className='width-common'
                            />
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
        <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
          <FormGroup>
            <Row className='align-items-center'>
              <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                <Label className='form-label col-form-label'>
                  {languageTranslation('WEEKEND')}
                </Label>
              </Col>
              <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
                <Row className='custom-col inner-no-padding-col'>
                  <Col xs={'12'} sm={'5'} md={'5'} lg={'5'}>
                    <div className='required-input'>
                      <Field
                        component={FormikTextField}
                        name={'weekendAllowance'}
                        className='width-common'
                      />
                    </div>
                  </Col>
                  <Col xs={'12'} sm={'7'} md={'7'} lg={'7'}>
                    <FormGroup>
                      <Row className='custom-col inner-no-padding-col align-items-center'>
                        <Col xs={'12'} sm={'5'} md={'5'} lg={'5'}>
                          <Label className='form-label col-form-label inner-label'>
                            {languageTranslation('HOLIDAY')}
                            {/* <span className="required">*</span> */}
                          </Label>
                        </Col>
                        <Col xs={'12'} sm={'7'} md={'7'} lg={'7'}>
                          <div className='required-input'>
                            <Field
                              component={FormikTextField}
                              name={'holiday'}
                              className='width-common'
                            />
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
        <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
          <FormGroup>
            <Row className='align-items-center'>
              <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                <Label className='form-label col-form-label'>
                  {languageTranslation('NIGHT_ALLOWANCE')}
                </Label>
              </Col>
              <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
                <div>
                  <Select
                    placeholder={languageTranslation('NIGHT_ALLOWANCE')}
                    options={NightAllowancePerHour}
                    onChange={(value: any) =>
                      handleSelect(value, 'nightAllowance')
                    }
                    value={nightAllowance}
                    classNamePrefix='custom-inner-reactselect'
                    className={'custom-reactselect'}
                    defaultValue={NightAllowancePerHour[0]}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>

        <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
          <FormGroup>
            <Row className='align-items-center'>
              <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                <Label className='form-label col-form-label'>
                  {languageTranslation('INVOICE_INTERVAL')}
                </Label>
              </Col>
              <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
                <div>
                  <Select
                    placeholder='Invoice interval'
                    options={InvoiceInterval}
                    onChange={(value: any) =>
                      handleSelect(value, 'invoiceInterval')
                    }
                    value={invoiceInterval}
                    classNamePrefix='custom-inner-reactselect'
                    className={'custom-reactselect'}
                    defaultValue={InvoiceInterval[0]}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>
        <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
          <FormGroup >
            <Row className='align-items-center'>
              <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                <Label className='form-label col-form-label'>
                  {languageTranslation('LEASING_PRICE_LIST')}
                </Label>
              </Col>
              <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
                <div>
                  <Select
                    placeholder='Leasing Price List'
                    options={LeasingPriceList}
                    onChange={(value: any) =>
                      handleSelect(value, 'leasingPricingList')
                    }
                    value={leasingPricingList}
                    // value={leasingPriceListId ? leasingPriceListId : undefined}
                    classNamePrefix='custom-inner-reactselect'
                    className={'custom-reactselect'}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>
      

          <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
              <FormGroup className='mb-0'>
          <Row className="align-items-center">
          <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                <Label className='form-label col-form-label'>
                  {languageTranslation('CAREGIVER_INVOICE_TAX')}
                </Label>
              </Col>
                  <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
                    <div className='required-input'>
                      <Field
                        component={FormikTextField}
                        name={'caregiverInvoiceTax'}
                        className='width-common'
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

export default BillingSettingsFormComponent;
