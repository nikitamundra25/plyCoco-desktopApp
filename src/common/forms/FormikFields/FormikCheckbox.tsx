import React from "react"
import { Input } from 'reactstrap';
import { getIn } from "formik"
import { IFormikCheckbox } from "../../../interfaces/FormikCheckbox";


const FormikCheckbox = (props: IFormikCheckbox) => {
    const { field, form, disabled = false, style, classes, ...rest } = props
    const { name } = field
    const { touched, errors, isSubmitting, setFieldTouched } = form

    const fieldError = getIn(errors, name)
    const showError = getIn(touched, name) && !!fieldError
    const handleChange = (e: any) => {
        field
        e.persist()
        form.handleChange(e)
        setFieldTouched(name, true, false)
    }
    return (
        <Input
            name={field.name}
            checked={field.value ? true : false}
            value={field.value ? "true" : "false"}
            error={showError ? fieldError : ""}
            onChange={rest.onChange || handleChange}
            disabled={isSubmitting || disabled}
            style={style}
            {...rest}
        />
    )
}

export default FormikCheckbox;
