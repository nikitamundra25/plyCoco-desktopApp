import * as Yup from 'yup';
import {
  languageTranslation,
  timeValidator,
  commentValidator
} from '../../helpers';
import {
  ICreateTodoFormValidationSchema,
  IDateResponse
} from '../../interfaces';

export const CreateTodoFormValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  ICreateTodoFormValidationSchema
>> = Yup.object().shape<ICreateTodoFormValidationSchema>({
  /* Yup.string() */
  time: Yup.string()
    // .max(250, languageTranslation('NAME_MAXLENGTH'))
    .required(languageTranslation('TIME_REQUIRED'))
    .test({
      name: 'time',
      test: function(val) {
        const { path, createError } = this;
        const { isValid, message }: IDateResponse = timeValidator(val);
        return !val || isValid || createError({ path, message });
      }
    }),
  comment: Yup.string()
    .required(languageTranslation('COMMENT_REQUIRED'))
    .test({
      name: 'comment',
      test: function(val) {
        const { path, createError } = this;
        const { isValid, message }: IDateResponse = commentValidator(val);
        return !val || isValid || createError({ path, message });
      }
    }),
  priority: Yup.string().required(languageTranslation('PRIORITY_REQUIRED')),
  juridiction: Yup.string().required(
    languageTranslation('JURIDICTION_REQUIRED')
  )
});
