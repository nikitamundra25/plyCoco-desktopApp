import React, { FunctionComponent } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  CustomInput
} from 'reactstrap';
import Select from 'react-select';
import DayPicker from 'react-day-picker';
import { languageTranslation } from '../../../../helpers';
import { Priority, TimeMask } from '../../../../config';
import 'react-day-picker/lib/style.css';
import close from '../../../assets/img/cancel.svg';
import closehover from '../../../assets/img/cancel-hover.svg';
import { FormikProps, Field } from 'formik';
import {
  ICreateTodoFormValues,
  IReactSelectInterface
} from '../../../../interfaces';
import moment from 'moment';
import MaskedInput from 'react-text-mask';

const CreateTodoForm: FunctionComponent<FormikProps<ICreateTodoFormValues> &
  any> = (props: FormikProps<ICreateTodoFormValues> & any) => {
  const {
    values: { time, comment, date, priority, juridiction, contact },
    isLoading,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    show,
    handleClose,
    name,
    userRole,
    contactOptions,
    editToDo
  } = props;

  const modifiers = {
    sundays: { daysOfWeek: [0] },
    saturdays: { daysOfWeek: [6] }
  };
  const modifiersStyles = {
    sundays: {
      color: '#ff2d2d',
      backgroundColor: 'transparent'
    },
    saturdays: {
      color: '#ff2d2d',
      backgroundColor: 'transparent'
    },
    outside: { backgroundColor: 'transparent' }
  };
  const externalCloseBtn = (
    <button className='close modal-close' onClick={() => handleClose()}>
      <img src={close} alt='close' className='main-img' />
      <img src={closehover} alt='close' className='hover-img' />
    </button>
  );

  const handleDayClick = (day: any) => {
    // let date = moment(day).format('DD/MM/YY');
    setFieldValue('date', day);
  };

  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    setFieldValue(name, selectOption);
  };
  const ContactError: any = errors.contact;
  const PriorityError: any = errors.priority;
  let temp = moment()
    .add(1, 'days')
    .format('L');

  return (
    <div>
      <Modal isOpen={show} className='reminder-modal' size='lg' centered>
        <ModalHeader close={externalCloseBtn}>
          {' '}
          {!editToDo
            ? languageTranslation('CG_MENU_CREATE_TODO')
            : languageTranslation('CG_MENU_EDIT_TODO')}{' '}
          {''}
          for {name}{' '}
        </ModalHeader>
        <ModalBody>
          <div className=''>
            <div className='calender-wrapper mb-4'>
              <Row>
                <Col lg={'4'}>
                  <div>
                    <DayPicker
                      selectedDays={date ? date : new Date()}
                      modifiers={modifiers}
                      modifiersStyles={modifiersStyles}
                      onDayClick={handleDayClick}
                      disabledDays={{ before: new Date() }}
                    />
                  </div>
                </Col>
                <Col lg={'4'}>
                  <div>
                    <DayPicker
                      initialMonth={new Date(2020, 2)}
                      selectedDays={date ? date : new Date()}
                      modifiers={modifiers}
                      modifiersStyles={modifiersStyles}
                      onDayClick={handleDayClick}
                    />
                  </div>
                </Col>
                <Col lg={'4'}>
                  <div>
                    <DayPicker
                      initialMonth={new Date(2020, 3)}
                      selectedDays={date ? date : new Date()}
                      modifiers={modifiers}
                      modifiersStyles={modifiersStyles}
                      onDayClick={handleDayClick}
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <Form className='form-section forms-main-section'>
              <Row>
                <Col lg={'6'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('TIME_OF_DAY')}
                          <span className='required'>*</span>
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div>
                          <Field
                            name={'time'}
                            render={({ field }: any) => (
                              <MaskedInput
                                {...field}
                                placeholder={languageTranslation('TIME_OF_DAY')}
                                mask={TimeMask}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={time}
                                className={
                                  errors.time && touched.time
                                    ? 'error form-control'
                                    : 'form-control'
                                }
                              />
                            )}
                          />

                          {errors.time && touched.time && (
                            <div className='required-tooltip'>
                              {errors.time}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'6'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('JURIDICTION')}
                          <span className='required'>*</span>
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div className='custom-radio-block'>
                          <FormGroup check inline>
                            <CustomInput
                              type='radio'
                              id='yes'
                              name='juridiction'
                              label={languageTranslation('INTERNALLY')}
                              value={'internally'}
                              checked={
                                juridiction === 'internally' ? true : false
                              }
                              onChange={handleChange}
                            />
                          </FormGroup>
                          <FormGroup check inline>
                            <CustomInput
                              type='radio'
                              id='no'
                              name='juridiction'
                              label={languageTranslation('EXTERNALLY')}
                              value={'externally'}
                              checked={
                                juridiction === 'externally' ? true : false
                              }
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </div>
                        {errors.juridiction && touched.juridiction && (
                          <div className='required-tooltip'>
                            {errors.juridiction}
                          </div>
                        )}
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                {userRole === 'careInstitution' ? (
                  <Col lg={'6'}>
                    <FormGroup>
                      <Row>
                        <Col sm='4'>
                          <Label className='form-label col-form-label'>
                            {languageTranslation('CONTACT')}
                            <span className='required'>*</span>
                          </Label>
                        </Col>
                        <Col sm='8'>
                          <div className='required-input'>
                            <Select
                              options={contactOptions}
                              classNamePrefix='custom-inner-reactselect'
                              onChange={(value: any) =>
                                handleSelect(value, 'contact')
                              }
                              className={
                                errors.contact && touched.contact
                                  ? 'error custom-reactselect'
                                  : 'custom-reactselect'
                              }
                              value={
                                contact && contact.value !== '' ? contact : null
                              }
                            />
                            {errors.contact && touched.contact && (
                              <div className='required-tooltip'>
                                {ContactError}
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                ) : null}
                <Col lg={'6'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('PRIORITY')}
                          <span className='required'>*</span>
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div className='required-input'>
                          <Select
                            placeholder={languageTranslation('PRIORITY')}
                            options={Priority}
                            value={priority && priority.value ? priority : null}
                            onChange={(value: any) =>
                              handleSelect(value, 'priority')
                            }
                            classNamePrefix='custom-inner-reactselect'
                            className={
                              errors.priority && touched.priority
                                ? 'custom-reactselect error'
                                : 'custom-reactselect'
                            }
                          />
                          {errors.priority && touched.priority && (
                            <div className='required-tooltip'>
                              {PriorityError}
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
                      <Col sm='2'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('COMMENT')}{' '}
                          <span className='required'>*</span>
                        </Label>
                      </Col>
                      <Col sm='10'>
                        <div>
                          <Input
                            type='textarea'
                            name={'comment'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={comment ? comment : undefined}
                            placeholder={languageTranslation('COMMENT')}
                            rows='4'
                            maxLength={250}
                            className={
                              errors.comment && touched.comment
                                ? 'textarea-custom error'
                                : 'textarea-custom'
                            }
                          />
                          {errors.comment && touched.comment && (
                            <div className='required-tooltip'>
                              {errors.comment}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={isSubmitting}
            color='primary'
            onClick={handleSubmit}
          >
            {isSubmitting ? <i className='fa fa-spinner fa-spin loader' /> : ''}
            {!editToDo
              ? languageTranslation('ADD_REMINDER')
              : languageTranslation('EDIT_REMINDER')}
          </Button>
          <Button color='secondary' onClick={handleClose}>
            {languageTranslation('CANCEL')}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateTodoForm;
