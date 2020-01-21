import * as Yup from "yup";
import { IRegionFormValue } from "../interfaces";
import { languageTranslation } from "../helpers";
import { alphaNumeric } from "../config";

export const RegionValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  IRegionFormValue
>> = Yup.object().shape<IRegionFormValue>({
  regionName: Yup.string()
    .trim()
    .required(languageTranslation("REQUIRED_REGION"))
    .max(30, languageTranslation("REGION_MAXLENGTH"))
    .matches(alphaNumeric, languageTranslation("REGION_SPECIALCHAR"))
});
