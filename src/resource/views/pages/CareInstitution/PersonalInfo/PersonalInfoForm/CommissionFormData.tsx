import React, { FunctionComponent } from 'react';
import { FormGroup, Label, Input, Col, Row } from 'reactstrap';
import Select from 'react-select';
import { FormikProps } from 'formik';
import { languageTranslation } from '../../../../../../helpers';
import {
  ICareInstitutionFormValues,
  IHandleSelectInterface,
} from '../../../../../../interfaces';
import { CareInstLeasingPriceList } from '../../../../../../config';

const CommissionFormData: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
> &
  IHandleSelectInterface> = (
  props: FormikProps<ICareInstitutionFormValues> & IHandleSelectInterface,
) => {
  const {
    values: { careGiverCommission, doctorCommission, leasingPriceListId },
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSelect,
  } = props;

  return (
    <div className='form-card minheight-auto mb-2'>
      <Row>
        <Col lg={'12'}>
          <FormGroup>
            <Row>
              <Col sm='4'>
                <Label className='form-label col-form-label'>
                  {languageTranslation('HEALTH_CARE_FEE')}
                </Label>
              </Col>
              <Col sm='8'>
                <Row className='custom-col inner-no-padding-col'>
                  <Col sm='4'>
                    <div className='required-input'>
                      <Input
                        type='text'
                        name={'careGiverCommission'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={careGiverCommission}
                        className={
                          errors.careGiverCommission &&
                          touched.careGiverCommission
                            ? 'width-common error'
                            : 'width-common'
                        }
                      />
                      {errors.careGiverCommission &&
                        touched.careGiverCommission && (
                          <div className='required-tooltip bottom-tooltip'>
                            {errors.careGiverCommission}
                          </div>
                        )}
                    </div>
                  </Col>
                  <Col sm='8'>
                    <FormGroup>
                      <Row className='custom-col inner-no-padding-col'>
                        <Col sm='6'>
                          <Label className='form-label col-form-label inner-label'>
                            {languageTranslation('DOCTOR_FEE')}
                          </Label>
                        </Col>
                        <Col sm='6'>
                          <div className='required-input'>
                            <Input
                              type='text'
                              name={'doctorCommission'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={doctorCommission}
                              className={
                                errors.doctorCommission &&
                                touched.doctorCommission
                                  ? 'width-common error'
                                  : 'width-common'
                              }
                            />
                            {errors.doctorCommission &&
                              touched.doctorCommission && (
                                <div className='required-tooltip bottom-tooltip'>
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
        <Col lg={'12'}>
          <FormGroup className='mb-0'>
            <Row>
              <Col sm='4'>
                <Label className='form-label col-form-label'>
                  {languageTranslation('LEASING_PRICE_LIST')}
                </Label>
              </Col>
              <Col sm='8'>
                <div>
                  <Select
                    placeholder={languageTranslation('LEASING_PRICE_LIST')}
                    value={
                      leasingPriceListId && leasingPriceListId.value
                        ? leasingPriceListId
                        : undefined
                    }
                    onChange={(value: any) =>
                      handleSelect(value, 'leasingPriceListId')
                    }
                    options={CareInstLeasingPriceList}
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
