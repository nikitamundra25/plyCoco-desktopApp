interface IField {
  value: string;
  name: string;
}

interface IFormikForm {
  touched: boolean;
  errors: any;
  isSubmitting: boolean;
  handleChange: (event: any) => void;
  setFieldTouched: (name: string, value: boolean, touched: boolean) => void;
}

export interface IFormikCheckbox {
  field: IField;
  form: IFormikForm;
  classes?: any;
  disabled?: boolean;
  [key: string]: any;
  style?: any;
}
