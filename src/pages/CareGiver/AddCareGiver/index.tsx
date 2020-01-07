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

    render(){
        const initialValues: CareGiverValues ={
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            bankName: '',
            qualification: [],
            leasing:'',
            status:''
        }
        return(
            <Formik
                initialValues={initialValues}
                onSubmit={(values: any, action: any)=>{
                    this.handleSubmit(values, action);
                }}
                children={(props: FormikProps<CareGiverValues>)=>{
                   return <CareGiverFormComponent {...props}/>
                }}
            />
        )
    }

}

export default CareGiverForm;