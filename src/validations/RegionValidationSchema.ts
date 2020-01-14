import * as Yup from "yup";
import { IRegionFormValue } from "../interfaces";
import { languageTranslation } from "../helpers";

export const LoginValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  IRegionFormValue
>> = Yup.object().shape<IRegionFormValue>({
  nameOfRegion: Yup.string().required(languageTranslation("REQUIRED_EMAIL"))
  //   password: Yup.string()
  //     .min(6, languageTranslation("MIN_LENGTH_PASSWORD"))
  //     .required(languageTranslation("REQUIRED_PASSWORD")),
});
