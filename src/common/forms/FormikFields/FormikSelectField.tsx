import React from 'react';
import { getIn } from 'formik';
import {Label} from 'reactstrap';
import Select from "react-select"


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

interface IFormikSelectField {
  field: IField,
  form: IFormikForm,
  classes: any,
  disabled: boolean,
  [key: string]: any,
  style: any
}

export const FormikSelectField = (
    props: IFormikSelectField) => {
    const {
        field,
        key,
        form,
        variant = "standard",
        disabled = false,
        style,
        className,
        options,
        endAdornment,
        fullWidth = false,
        isRequired,
        // virtualized = false,
        ...rest
    } = props
    const { name, value } = field
    const { touched, errors, isSubmitting, setFieldValue, setFieldTouched } = form
    const fieldError = getIn(errors, name)
    const showError = getIn(touched, name) && !!fieldError

    const handleChange = (option:any) => {
        setFieldValue(name, option, true)
        setFieldTouched(name, true, false)
    }

    let newLabel = props.label

    return (
        <div style={{ minWidth: 80, marginTop: "6px" }}>
          <Label htmlFor={name} >
            {newLabel}
          </Label>
          <Select
            fullwidth={fullWidth}
            onChange={rest.onChange || handleChange}
            isMulti={rest.isMulti || false}
            error={showError}
            className={className}
            id={key ? key :"react-select-single"}
            options={options ? options : []}
            value={rest.value || value}
            placeholder={props.placeholder}
            onBlur={rest.onBlur || form.handleBlur}
            variant={variant}
            arrowRenderer={null}
            isDisabled={isSubmitting || disabled}
            endAdornment={endAdornment || null}
            ignoreAccents={false}
            theme={rest.theme}
          />
        </div>
      )
}