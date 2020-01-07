import React from "react"
import { get, identity, merge, noop } from "lodash"

export const getHelperText = (
  showError = false,
  fieldError = "",
  helperText = "",
  alwaysShowHelperText = true
) => {
  const message = showError ? fieldError : helperText

  if (message || alwaysShowHelperText) {
    return <div >{message} </div>
  }

  return null
}

export const handleBlur = (value:any, { form, field, onBlur, handleBlur }:any) => (event:any) => {
  const name = get(field, "name")

  const overrideDefaultBlur = onBlur || handleBlur

  const formikHandleBlur = () => get(form, "setFieldTouched", noop)(name)

  if (overrideDefaultBlur) {
    overrideDefaultBlur(event, { value, name, form, field, formikHandleBlur })
  } else {
    formikHandleBlur()
  }
}

export const handleChange = ({
  form,
  field,
  regex,
  onChange,
  handleChange,
  formatValue = identity
}:any) => (event:any) => {
  const value = formatValue(get(event, "target.value", ""))
  const name = get(field, "name")
  event.persist()

  const formikHandleChange = (x = value) => {
    get(form, "handleChange", noop)(merge(event, { target: { value: x } }))
    get(form, "setFieldTouched", noop)(name, true, false)
  }

  const overrideDefaultChange = onChange || handleChange

  if (overrideDefaultChange) {
    overrideDefaultChange(event, { value, name, form, field, formikHandleChange })

  } else if (regex) {
    if (regex.test(value) || value === "") {
      formikHandleChange()
    }
  } else {
    formikHandleChange()
  }
}
