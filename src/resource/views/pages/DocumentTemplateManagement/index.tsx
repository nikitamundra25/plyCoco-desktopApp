import React, { FunctionComponent, useState, useEffect } from 'react';
import WorkingProofForm from './WorkingProofForm';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { DocumentsUploadValidationSchema } from '../../../validations';
import { DocumentQueries, CareGiverQueries } from '../../../../graphql/queries';
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
import {
  deactivatedListColor,
  CaregiverTIMyoCYAttrId,
  leasingListColor,
  selfEmployesListColor
} from "../../../../config";
import DisplayDifferentModal from './DisplayDifferentModal';
import { Helmet } from "react-helmet";

const [, , , , , , , , GET_CAREGIVER_BY_NAME] = CareGiverQueries;
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
    value: 'workingProof',
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

 // To fetch the list of all caregiver
 const [fetchCareGivers, { data: careGivers }] = useLazyQuery<any>(
  GET_CAREGIVER_BY_NAME,
  {
    fetchPolicy: "no-cache",
  }
);
useEffect(() => {
  // Fetch list of caregivers
  fetchCareGivers({
    variables: {
      searchBy: "",
      limit: 500,
      page: 1,
    },
  });
}, []);

// set careGivers list options
const careGiversOptions: IReactSelectInterface[] | undefined = [];
if (
  careGivers &&
  careGivers.getCaregiverByName &&
  careGivers.getCaregiverByName.result
) {
  careGiversOptions.push({
    label: languageTranslation("NAME"),
    value: languageTranslation("ID"),
    color: "",
  });
  careGivers.getCaregiverByName.result.forEach(
    ({ id, firstName, lastName, isActive, caregiver }: any) => {
      let { attributes = [] } = caregiver ? caregiver : {};
      // To check null values
      attributes = attributes ? attributes : [];
      careGiversOptions.push({
        label: `${lastName}${" "}${firstName}`,
        value: id,
        color: !isActive
          ? deactivatedListColor
          : attributes.includes(CaregiverTIMyoCYAttrId)
          ? leasingListColor
          : attributes.includes("Plycoco")
          ? selfEmployesListColor
          : "",
      });
    }
  );
}

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
     <Helmet>
        <title>{languageTranslation("MENU_DOCUMENT_WORKING_PROOF")} </title>
      </Helmet>
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
              careGiversOptions={careGiversOptions}
            />
          );
        }}
      />
     
    </>
  );
};
export default WorkingProof;
