import React, { FunctionComponent, useState, useEffect } from 'react';
import WorkingProofForm from './WorkingProofForm';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { DocumentsUploadValidationSchema } from '../../../validations';
import { DocumentQueries } from '../../../../graphql/queries';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import {
  IWorkingProofFormValues,
  IDocumentInterface,
  IReactSelectInterface
} from '../../../../interfaces';
import { languageTranslation } from '../../../../helpers';
import { ConfirmBox } from '../../components/ConfirmBox';
import { toast } from 'react-toastify';
import { DocumentMutations } from '../../../../graphql/Mutations';

const [GET_DOCUMENT_TEMPLATE] = DocumentQueries;
const [, , , DELETE_DOCUMENT] = DocumentMutations;

let toastId: any = '';

const WorkingProof: FunctionComponent = () => {
  // Query to get uploaded documents
  const [
    getDocumentTemplates,
    { data: documents, loading, refetch }
  ] = useLazyQuery<any>(GET_DOCUMENT_TEMPLATE, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true
  });

  // Mutation to delete document template
  const [deleteDocument] = useMutation<{ deleteDocument: any }, { id: number }>(
    DELETE_DOCUMENT
  );

  const [documentType, setdocumentType] = useState<IReactSelectInterface>({
    value: 'Working Proof',
    label: 'Working Proof'
  });

  useEffect(() => {
    if (documentType && refetch) {
      getDocumentTemplates({
        variables: {
          isDocumentTemplate: true,
          documentUploadType:
            documentType && documentType.value ? documentType.value : ''
        }
      });
    }
  }, [documentType]);

  const [documentList, setDocumentList] = useState<IDocumentInterface | []>([]);
  const [imageUrls, setImageUrl] = useState<string>('');
  const [documentUrls, setDocumentUrl] = useState<string>('');
  const [rowIndex, setRowIndex] = useState<number>(-1);

  useEffect(() => {
    // Fetch all document templates
    getDocumentTemplates({
      variables: {
        isDocumentTemplate: true,
        documentUploadType:
          documentType && documentType.value ? documentType.value : ''
      }
    });
  }, [getDocumentTemplates]);

  useEffect(() => {
    if (documents) {
      const { getDocumentTemplates } = documents;
      if (getDocumentTemplates.length > 0) {
        setDocumentList(getDocumentTemplates);
      } else {
        setDocumentList([]);
      }
    }
  }, [documents]);

  const handleSubmit = async (
    values: IWorkingProofFormValues,
    { setSubmitting }: FormikHelpers<IWorkingProofFormValues>
  ) => {};

  const initialValues: IWorkingProofFormValues = {
    document: null
  };

  const onDelete = async (id: string) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_DOCUMENT_DELETE_MSG')
    });
    if (!value) {
      return;
    } else {
      await deleteDocument({
        variables: {
          id: parseInt(id)
        }
      });
      refetch();
      setImageUrl('');
      setDocumentUrl('');
      setRowIndex(-1);
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation('DOCUMENT_DELETE_SUCCESS_MSG')
        );
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={DocumentsUploadValidationSchema}
        render={(props: FormikProps<IWorkingProofFormValues>) => {
          return (
            <WorkingProofForm
              {...props}
              documentList={documentList}
              refetch={refetch}
              onDelete={onDelete}
              imageUrls={imageUrls}
              setImageUrl={setImageUrl}
              documentUrls={documentUrls}
              setDocumentUrl={setDocumentUrl}
              rowIndex={rowIndex}
              documentType={documentType}
              setdocumentType={setdocumentType}
              setRowIndex={setRowIndex}
              loadingData={loading}
            />
          );
        }}
      />
    </>
  );
};
export default WorkingProof;
