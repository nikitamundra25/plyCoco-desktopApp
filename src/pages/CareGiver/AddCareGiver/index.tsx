import React, { Component, useState } from 'react';
import { CareGiverState, CareGiverValues } from '../../../interfaces';
import { FormikHelpers, Formik, FormikProps } from 'formik';
import CareGiverFormComponent from './CareGiverFormComponent';
import { CareGiverValidationSchema } from '../../../validations/CareGiverValidationSchema';
import { useMutation } from '@apollo/react-hooks';
import { ADD_CAREGIVER } from '../../../queries/CareGiver';

class CareGiverForm extends Component<any, CareGiverState>{

    handleSubmit = (values: CareGiverValues,
        { setSubmitting }: FormikHelpers<CareGiverValues>,
        saveFunc: any
    ): Promise<any> | void => {
        // todo call 
        const [addCareGiver, { error, data }] = useMutation<
            { addCareGiver: CareGiverState },
            { careGiverInput: CareGiverValues }
        >(ADD_CAREGIVER, {
            variables: { careGiverInput: { ...values } }
        });
        addCareGiver()
        setSubmitting(false);
    }

    render() {
        const initialValues: CareGiverValues = {
            salutation: '',
            firstName: '',
            lastName: '',
            address1: '',
            address2: '',
            street: '',
            city: '',
            state: '',
            country: '',
            postCode: '',
            email: '',
            dob: '',
            phone: '',
            fax: '',
            mobilePhone: '',
            username: '',
            bankName: '',
            qualification: [],
            leasing: '',
            driverLicenseNumber: '',
            driversLicense: false,
            vehicleavailable: false,
            legalForm: '',
            companyName: '',
            registrationNumber: '',
            registerCourt: '',
            executiveDirector: '',
            socialSecurityContribution: false,
            taxNumber: '',
            remarks: '',
            workZones: [],
            status: ''
        };


        return (
            <Formik
                initialValues={initialValues}
                onSubmit={(
                    values: CareGiverValues,
                    actions: FormikHelpers<CareGiverValues>,
                    saveFunc?: any)
                    : Promise<any> | void => this.handleSubmit(values, actions, saveFunc)}
                validationSchema={CareGiverValidationSchema}
                render={(props: FormikProps<CareGiverValues>) => {
                    return <CareGiverFormComponent {...props} />
                }}
            />
        )
    }

}

export default CareGiverForm;