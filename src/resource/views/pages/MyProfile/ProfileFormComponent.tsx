import React, { FunctionComponent } from 'react';
import { Button, Form, FormGroup, Input, Label, Col, Row } from 'reactstrap';
import { FormikProps } from 'formik';
import { languageTranslation } from '../../../../helpers';
import { IProfileValues } from '../../../../interfaces';

export const ProfileFormComponent: FunctionComponent<FormikProps<
  IProfileValues
> & { loading: boolean }> = (
  props: FormikProps<IProfileValues> & { loading: boolean },
) => {
  const {
    errors,
    values: { firstName, lastName, email },
    touched,
    handleChange,
    handleSubmit,
    loading,
  } = props;
  return (
    <Col lg={'6'}>
      <h5 className='content-title '>{languageTranslation('MY_PROFILE')}</h5>
      <div className='form-section'>
        <div className='form-card minheight-auto'>
          <Row>
            <Form onSubmit={handleSubmit}>
              <Col lg={'12'}>
                <FormGroup>
                  <Row>
                    <Col sm='4'>
                      <Label className='form-label col-form-label '>
                        {languageTranslation('FIRST_NAME')}
                      </Label>
                    </Col>
                    <Col sm='8'>
                      <div>
                        <Input
                          type='text'
                          name={'firstName'}
                          value={firstName}
                          placeholder={languageTranslation('FIRST_NAME')}
                          onChange={handleChange}
                          className={
                            errors.firstName && touched.firstName
                              ? 'text-input error my-2 my-sm-0'
                              : 'text-input my-2 my-sm-0'
                          }
                        />
                        {errors.firstName && touched.firstName && (
                          <div className='required-tooltip'>
                            {errors.firstName}
                          </div>
                        )}
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
                        {languageTranslation('SURNAME')}
                      </Label>
                    </Col>
                    <Col sm='8'>
                      <div>
                        <Input
                          type='text'
                          name={'lastName'}
                          value={lastName}
                          placeholder={languageTranslation('SURNAME')}
                          onChange={handleChange}
                          className={
                            errors.lastName && touched.lastName
                              ? 'text-input error my-2 my-sm-0'
                              : 'text-input my-2 my-sm-0'
                          }
                        />
                        {errors.lastName && touched.lastName && (
                          <div className='required-tooltip'>
                            {errors.lastName}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              <Col lg={'12'}>
                <FormGroup>
                  <Row>
                    <Col sm='4'>
                      <Label className='form-label col-form-label '>
                        {languageTranslation('EMAIL')}
                      </Label>
                    </Col>
                    <Col sm='8'>
                      <div>
                        <Input
                          type='text'
                          name={'email'}
                          value={email}
                          placeholder={languageTranslation('EMAIL')}
                          disabled={true}
                          className={
                            errors.email && touched.email
                              ? 'text-input error my-2 my-sm-0'
                              : 'text-input my-2 my-sm-0'
                          }
                        />
                        {errors.email && touched.email && (
                          <div className='required-tooltip'>{errors.email}</div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              <Col lg={'4'}></Col>
              <Col lg={'8'}>
                <FormGroup>
                  <Button
                    color={'primary'}
                    className={'btn-save'}
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <i className='fa fa-spinner fa-spin loader' />
                    ) : null}
                    {languageTranslation('UPDATE_BUTTON')}
                  </Button>
                </FormGroup>
              </Col>
            </Form>
          </Row>
        </div>
      </div>
    </Col>
  );
};
