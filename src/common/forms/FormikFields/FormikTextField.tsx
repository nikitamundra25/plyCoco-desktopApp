import React from 'react';
import { getIn } from 'formik';
import { Input } from 'reactstrap';
import { toLower } from "lodash";
import { getHelperText, handleChange, handleBlur } from './utils';


export const FormikTextField: any = (
    props: any) => {
    const {
        field,
        form,
        variant = "standard",
        disabled = false,
        inputStyle,
        classes,
        label,
        isRequired,
        onChange,
        InputLabelProps,
        alwaysShowHelperText = true,
        ...rest
    } = props
    const { name, value } = field
    const { touched, errors, isSubmitting } = form
    const fieldError = getIn(errors, name)
    const showError = getIn(touched, name) && !!fieldError
    const shrink = field.value !== null && toLower(field.value).length > 0
    let labelProps = { shrink, ...InputLabelProps }
    let newLabel = label
    return (
        <Input
            {...rest}
            {...field}
            label={newLabel}
            helperText={getHelperText(
                showError,
                fieldError,
                rest.helperText,
                alwaysShowHelperText
            )}
            value={value || value === 0 ? value : ""}
            error={showError}
            onChange={handleChange(props)}
            onClick={rest.onClick || null}
            onBlur={handleBlur(value, props)}
            disabled={isSubmitting || disabled}
            variant={variant}
            InputLabelProps={labelProps}
            fullwidth={true}
        />
    )
}