import * as Yup from 'yup';
import { IEmailTemplateValues } from '../../interfaces';
import { languageTranslation } from '../../helpers';

export const EmailTemplateValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  IEmailTemplateValues
>> = Yup.object().shape<IEmailTemplateValues>({
  type: Yup.object().shape({
    value: Yup.string()
      .trim()
      .required(languageTranslation('REQUIRED_TYPE')),
    label: Yup.string()
      .trim()
      .required(languageTranslation('REQUIRED_TYPE')),
  }),
  // .required(languageTranslation('REQUIRED_TYPE'))
  menuEntry: Yup.string()
    .trim()
    .required(languageTranslation('REQUIRED_MENU_ENTEY')),
  subject: Yup.string()
    .trim()
    .required(languageTranslation('REQUIRED_SUBJECT')),
  body: Yup.string()
    .trim()
    .required(languageTranslation('REQUIRED_BODY')),
});
