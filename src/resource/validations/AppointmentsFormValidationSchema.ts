import * as Yup from 'yup';
import {
  ICaregiverValidationFormValue,
  ICareinstituionValidationFormValue,
  ITimeResponse,
  IDateResponse
} from '../../interfaces';
import { languageTranslation, timeValidator, dateValidator } from '../../helpers';
import { NumberWithCommaRegex } from '../../config';
import moment from 'moment';

export const CareGiverValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  ICaregiverValidationFormValue
>> = Yup.object().shape<ICaregiverValidationFormValue>({
  fee: Yup.mixed()
    .required(languageTranslation('FEE_REQUIRED'))
    .test(
      'check-num',
      languageTranslation('INVALID_NUMBER'),
      value => !value || NumberWithCommaRegex.test(value)
    ),
  nightFee: Yup.mixed()
    .required(languageTranslation('NIGHT_FEE_REQUIRED'))
    .test(
      'check-num',
      languageTranslation('INVALID_NUMBER'),
      value => !value || NumberWithCommaRegex.test(value)
    ),
  weekendAllowance: Yup.mixed()
    .required(languageTranslation('WEEKEND_ALLOWANCE_REQUIRED'))
    .test(
      'check-num',
      languageTranslation('INVALID_NUMBER'),
      value => !value || NumberWithCommaRegex.test(value)
    ),
  holidayAllowance: Yup.mixed()
    .required(languageTranslation('HOLIDAY_ALLOWANCE_REQUIRED'))
    .test(
      'check-num',
      languageTranslation('INVALID_NUMBER'),
      value => !value || NumberWithCommaRegex.test(value)
    ),
  distanceInKM: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  ),
  feePerKM: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  ),
  otherExpenses: Yup.mixed().test(
    'check-num',
    languageTranslation('INVALID_NUMBER'),
    value => !value || NumberWithCommaRegex.test(value)
  ),
  workingHoursFromTime: Yup.string()
  .test({
    name: 'validate-time',
    test: function(val) {
      const { path, createError } = this;
      const { isValid, message }: ITimeResponse = timeValidator(val);
      return !val || isValid || createError({ path, message });
    }
  }),
  workingHoursToTime:Yup.string()
  .test({
    name: 'validate-time',
    test: function(val) {
      const { path, createError } = this;
      const { isValid, message }: ITimeResponse = timeValidator(val);
      return !val || isValid || createError({ path, message });
    }
  }),
  breakFromTime: Yup.string()
  .test({
    name: 'validate-time',
    test: function(val) {
      const { path, createError } = this;
      const { isValid, message }: ITimeResponse = timeValidator(val);
      return !val || isValid || createError({ path, message });
    }
  }),
  breakToTime: Yup.string()
  .test({
    name: 'validate-time',
    test: function(val) {
      const { path, createError } = this;
      const { isValid, message }: ITimeResponse = timeValidator(val);
      return !val || isValid || createError({ path, message });
    }
  }),
  // workingHoursToDate: Yup.mixed().when('dateString', {
  //   is: dateString =>
  //   dateString ,
  //   then: Yup.mixed().test({
  //     name: 'validate-date',
  //     test: function(val) {
  //       const { path, createError } = this;
  //       const { isValid, message }: IDateResponse = dateValidator(val, {
  //         maxDate: moment()
  //           .format(),
  //         minDate: moment(dateString)
  //           .format()
  //       });
  //       return !val || isValid || createError({ path, message });
  //     }
  //   }),
  // })
});

export const CareInstitutionValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  ICareinstituionValidationFormValue
>> = Yup.object().shape<ICareinstituionValidationFormValue>({
  startTime: Yup.string()
    .required(languageTranslation('START_TIME_REQUIRED'))
    .test({
      name: 'validate-time',
      test: function(val) {
        const { path, createError } = this;
        const { isValid, message }: ITimeResponse = timeValidator(val);
        return !val || isValid || createError({ path, message });
      }
    }),
  endTime: Yup.string()
    .required(languageTranslation('END_TIME_REQUIRED'))
    .test({
      name: 'validate-time',
      test: function(val) {
        const { path, createError } = this;
        const { isValid, message }: ITimeResponse = timeValidator(val);
        return !val || isValid || createError({ path, message });
      }
    }),
  qualificationId: Yup.string().required(
    languageTranslation('QUALIFICATION_REQUIRED')
  ),
  department: Yup.mixed().when('careInstitutionDepartment', {
    is: careInstitutionDepartment =>
      careInstitutionDepartment && careInstitutionDepartment.length > 0,
    then: Yup.string().required(languageTranslation('DEPARTMENT_REQUIRED'))
  })
});
