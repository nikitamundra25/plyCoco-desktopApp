import React, { Component } from 'react';
import { CareGiverState, CareGiverValues } from '../../../interfaces';
import { FormikHelpers, Formik, FormikProps } from 'formik';
import CareGiverFormComponent from './CareGiverFormComponent';

class CareGiverForm extends Component<any, CareGiverState>{

    handleSubmit = (values: CareGiverValues,
        { setSubmitting }: FormikHelpers<CareGiverValues>) => {
        // todo call 
        debugger
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
                onSubmit={this.handleSubmit}
                render={(props: FormikProps<CareGiverValues>) => {
                    return <CareGiverFormComponent {...props} />
                }}
            />
        )
    }

}

export default CareGiverForm;