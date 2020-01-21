interface IField {
    value: string,
    name: string
  }
  
  interface IFormikForm {
    touched: boolean,
    errors: any,
    isSubmitting: boolean,
    handleChange: (event: any) => void,
    setFieldTouched: (name: string, value: boolean, touched: boolean) => void,
    handleBlur: (name: string, value: boolean, touched: boolean) => void,
    setFieldValue: (name: string, value: boolean, touched: boolean) => void
  }
  
  export interface IFormikSelectField {
    field: IField,
    form: IFormikForm,
    classes: any,
    disabled: boolean,
    [key: string]: any,
    style: any
  }
  