import * as Yup from "yup";
import { IRegionFormValue } from "../interfaces";
import { languageTranslation } from "../helpers";

export const RegionValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  IRegionFormValue
>> = Yup.object().shape<IRegionFormValue>({
  nameofRegion: Yup.string()
    .trim()
    .required(languageTranslation("REQUIRED_REGION"))
    .max(30, languageTranslation("REGION_MAXLENGTH"))
});
