interface IField {
    value: string,
    name: string
}

interface IFormikForm {
    touched: boolean,
    errors: any,
    value: any,
    isSubmitting: boolean,
    setFieldValue: (name: string, value: string) => void
    handleChange: (event: any) => void,
    setFieldTouched: (name: string, value: boolean, touched: boolean) => void
}

export interface IFormikTextField {
    field: IField,
    form: IFormikForm,
    classes: any,
    disabled: boolean,
    [key: string]: any,
    style: any
}