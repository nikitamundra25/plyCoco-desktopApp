import * as Yup from 'yup';
import { languageTranslation } from '../../helpers';
import { IWorkingProofFormValues } from '../../interfaces';

export const DocumentsUploadValidationSchema: Yup.ObjectSchema<Yup.Shape<
  object,
  IWorkingProofFormValues
>> = Yup.object().shape<IWorkingProofFormValues>({
  document: Yup.mixed()
    .required(languageTranslation('REQUIRED_DOCUMENT'))
});
