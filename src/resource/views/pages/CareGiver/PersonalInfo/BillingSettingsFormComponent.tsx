import React from 'react';
import Select from 'react-select';
import { Label, Col, Row, FormGroup } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import {
  NightAllowancePerHour,
  InvoiceInterval,
  LeasingPriceList,
} from '../../../../../config';
import { FormikProps, Field } from 'formik';
import {
  CareGiverValues,
  IReactSelectInterface,
} from '../../../../../interfaces';
import { FormikTextField } from '../../../components/forms/FormikFields';
import { logger } from '../../../../../helpers';

const BillingSettingsFormComponent: any = (
  props: FormikProps<CareGiverValues>,
) => {
  const {
    values: { nightAllowance, invoiceInterval, leasingPricingList },
    setFieldValue,
    errors,
  } = props;
  logger(props.values, 'values');
  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    logger(selectOption, 'selectOptionvalue');
    setFieldValue(name, selectOption);
  };
  return (
    <div className='form-card minheight-auto mb-2'>
      <Row>
        <Col lg={'12'}>
          <FormGroup>
            <Row>
              <Col sm='4'>
                <Label className='form-label col-form-label'>Fee</Label>
              </Col>
              <Col sm='8'>
                <Row className='custom-col inner-no-padding-col'>
                  <Col sm='5'>
                    <div className='required-input'>
                      <Field
                        component={FormikTextField}
                        name={'fee'}
                        className='width-common'
                      />
                    </div>
                  </Col>
                  <Col sm='7'>
                    <FormGroup>
                      <Row className='custom-col inner-no-padding-col'>
                        <Col sm='5'>
                          <Label className='form-label col-form-label inner-label'>
                            Night
                          </Label>
                        </Col>
                        <Col sm='7'>
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
        <Col lg={'12'}>
          <FormGroup>
            <Row>
              <Col sm='4'>
                <Label className='form-label col-form-label'>Weekend</Label>
              </Col>
              <Col sm='8'>
                <Row className='custom-col inner-no-padding-col'>
                  <Col sm='5'>
                    <div className='required-input'>
                      <Field
                        component={FormikTextField}
                        name={'weekendAllowance'}
                        className='width-common'
                      />
                    </div>
                  </Col>
                  <Col sm='7'>
                    <FormGroup>
                      <Row className='custom-col inner-no-padding-col'>
                        <Col sm='5'>
                          <Label className='form-label col-form-label inner-label'>
                            Holiday
                            {/* <span className="required">*</span> */}
                          </Label>
                        </Col>
                        <Col sm='7'>
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
        <Col lg={'12'}>
          <FormGroup>
            <Row>
              <Col sm='4'>
                <Label className='form-label col-form-label'>
                  Night Allowance
                </Label>
              </Col>
              <Col sm='8'>
                <div>
                  <Select
                    placeholder={'Night Allowance'}
                    options={NightAllowancePerHour}
                    onChange={(value: any) =>
                      handleSelect(value, 'nightAllowance')
                    }
                    value={nightAllowance}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>

        <Col lg={'12'}>
          <FormGroup>
            <Row>
              <Col sm='4'>
                <Label className='form-label col-form-label'>
                  Invoice interval
                </Label>
              </Col>
              <Col sm='8'>
                <div>
                  <Select
                    placeholder='Invoice interval'
                    options={InvoiceInterval}
                    onChange={(value: any) =>
                      handleSelect(value, 'invoiceInterval')
                    }
                    value={invoiceInterval}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>
        <Col lg={'12'}>
          <FormGroup className='mb-0'>
            <Row>
              <Col sm='4'>
                <Label className='form-label col-form-label'>
                  Leasing Price List
                </Label>
              </Col>
              <Col sm='8'>
                <div>
                  <Select
                    placeholder='Leasing Price List'
                    options={LeasingPriceList}
                    onChange={(value: any) =>
                      handleSelect(value, 'leasingPricingList')
                    }
                    value={leasingPricingList}
                    // value={leasingPriceListId ? leasingPriceListId : undefined}
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