import React, { Component } from 'react';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { EmployeeValidationSchema } from '../../../validations/EmployeeValidationSchema';
import { IEmployeeFormValues, IEmployeeState } from '../../../interfaces';
import AddEmployee from './AddEmployeeComponent';

class EmployeeForm extends Component<any, IEmployeeState> {
  handleSubmit = (
    values: IEmployeeFormValues,
    { setSubmitting }: FormikHelpers<IEmployeeFormValues>,
  ) => {
    console.log('values in employeee', values);
    //to set submit state to false after successful signup
    setSubmitting(false);
  };

  render() {
    const values: IEmployeeFormValues = {
      email: '',
      firstName: '',
      lastName: '',
      userName: '',
      telephoneNumber: '',
      accountHolderName: '',
      bankName: '',
      IBAN: '',
      BIC: '',
      additionalText: '',
      address1: '',
      address2: '',
      country: '',
      zip: '',
      joiningDate: '',
      // date:new Date()
    };
    return (
      <Formik
        initialValues={values}
        onSubmit={this.handleSubmit}
        children={(props: FormikProps<IEmployeeFormValues>) => (
          <EmployeeFormComponent {...props} />
        )}
        validationSchema={EmployeeValidationSchema}
      />
    );
  }
}

export default EmployeeForm;
