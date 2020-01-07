import React from 'react';
import { getIn } from 'formik';
import {Label} from 'reactstrap';
import Select, { components } from "react-select"


const DropdownIndicator = (props:any) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          >
        </components.DropdownIndicator>
      )
    )
  }

export const FormikSelectField: any = (
    props: any) => {
    const {
        field,
        form,
        variant = "standard",
        disabled = false,
        style,
        className,
        options,
        endAdornment,
        fullWidth,
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
          <Label shrink htmlFor={name} error={showError}>
            {newLabel}
          </Label>
          <Select
            fullwidth={fullWidth}
            onChange={rest.onChange || handleChange}
            isMulti={rest.isMulti}
            error={showError}
            className={className}
            id="react-select-single"
            options={options ? options : []}
            value={rest.value || value}
            placeholder={props.placeholder}
            onBlur={rest.onBlur || form.handleBlur}
            variant={variant}
            arrowRenderer={null}
            components={DropdownIndicator}
            isDisabled={isSubmitting || disabled}
            endAdornment={endAdornment || null}
            ignoreAccents={false}
            theme={rest.theme}
          />
        </div>
      )
}