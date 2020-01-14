import * as Yup from "yup";
import { IRegionFormValue } from "../interfaces";
import { languageTranslation } from "../helpers";

export const LoginValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  IRegionFormValue
>> = Yup.object().shape<IRegionFormValue>({
  nameOfRegion: Yup.string().required(languageTranslation("REQUIRED_REGION"))
});
