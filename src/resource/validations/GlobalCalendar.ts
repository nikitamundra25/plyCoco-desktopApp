import { IAddHolidaysFormValues } from "./../../interfaces/GlobalCalendar";
import * as Yup from "yup";
import { languageTranslation } from "../../helpers";

export const AddHolidayValidations: Yup.ArraySchema<Yup.Shape<
  object,
  IAddHolidaysFormValues
>> = Yup.array().of(
  Yup.object().shape<IAddHolidaysFormValues>({
    date: Yup.string().required(languageTranslation("USERNAME_REQUIRED")),
    note: Yup.string().required(languageTranslation("USERNAME_REQUIRED")),
    states: Yup.mixed().required(languageTranslation("USERNAME_REQUIRED"))
  })
);
