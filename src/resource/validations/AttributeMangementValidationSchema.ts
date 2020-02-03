import * as Yup from 'yup';
import { IAttributeFormValues } from '../../interfaces';
import { languageTranslation } from '../../helpers';
import { alphaNumeric } from '../../config';

export const AttributeMangementValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  IAttributeFormValues
>> = Yup.object().shape<IAttributeFormValues>({
  newAttribute: Yup.string()
    .trim()
    .required(languageTranslation('REQUIRED_ATTRIBUTE_NAME'))
    .max(30)
  // .matches(alphaNumeric, languageTranslation('REGION_SPECIALCHAR'))
});
