import React from "react";

export default ({ form, field }: any) => (
  <input
    name={field.name}
    type="file"
    accept="image/*"
    onChange={(e: any) => form.setFieldValue(field.name, e.target.files[0])}
  />
);
