import React, { useState, useCallback, useEffect } from 'react';
import { useMutation, useLazyQuery, useQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { DocumentMutations } from '../../../../../graphql/Mutations';
import moment from 'moment';
import {
  IDocumentUrls,
  IReactSelectInterface,
} from '../../../../../interfaces';
import DocumentUploadModal from './DocumentModal';
import DocumentsList from './DocumentsList';
import { DocumentQueries } from '../../../../../graphql/queries';
import { languageTranslation } from '../../../../../helpers';
import { ConfirmBox } from '../../../components/ConfirmBox';
import { CareInstitutionQueries } from '../../../../../graphql/queries';
import ExplicitDocument from './ExplicitDocument';
import { ApolloError } from 'apollo-client';
import { errorFormatter } from '../../../../../helpers/ErrorFormatter';

const [
  ADD_DOCUMENT,
  UPDATE_DOCUMENT_STATUS,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  APPROVE_DOCUMENT,
  DISAPPROVE_DOCUMENT,
  ,
  DELETE_DOCUMENT_TYPE_CAREINST,
  UPDATE_CAREINST_DOC,
] = DocumentMutations;
const [, GET_CARE_INSTITUION_BY_ID] = CareInstitutionQueries;
const [
  ,
  GET_DOCUMENTS,
  GET_DOCUMENT_TYPES,
  GET_REQUIRED_DOCUMENT_TYPES,
] = DocumentQueries;

let toastId: any = '';

const Documents = () => {
  const path = useLocation();
  const queryPath = path.pathname;
  const res = queryPath.split('/');
  const id = parseInt(res[3]);
  const [showDocumentPopup, setShowDocumentPopup] = useState<boolean>(false);
  const [documentUrls, setDocumentUrl] = useState<IDocumentUrls | null>(null);
  const [fileObject, setFileObject] = useState<Object | null>(null);
  const [statusValue, setStatusValue] = useState<boolean>(true);
  const [remarkValue, setRemarkValue] = useState<any>(null);
  const [documentType, setDocumentType] = useState<any>(null);
  const [documentData, setDocumentData] = useState<any>(null);
  const [documentIdUpdate, setDocumentIdUpdate] = useState<any>(null);
  const [fileName, setFilename] = useState<any>(null);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [addedDocumentType, setaddedDocumentType] = useState<any>(null);
  // To set missing document type editable
  const [isMissingDocEditable, setIsMissingDocEditable] = useState<boolean>(
    false
  );
  const [unsupportedFile, setUnsupportedFile] = useState<string | null>(null);
  const [documentId, setDocumentId] = useState<{
    id: string;
    checked: boolean;
  } | null>(null);
  const [defaultDocument, setDefaultDocument] = useState<boolean | null>(null);

  const [fetchDocumentList, { data, loading, refetch, called }] = useLazyQuery<
    any
  >(GET_DOCUMENTS);

  const [
    fetchCareInstDetails,
    {
      data: careInstData,
      loading: caregiverDataLoading,
      refetch: careInstDetailsRetch,
    },
  ] = useLazyQuery<any>(GET_CARE_INSTITUION_BY_ID);

  // To fetch the explicitly required document of careinstitution by id
  const [
    fetchAddedDocumentList,
    {
      data: explicitDocument,
      loading: addedDocumentListLoading,
      refetch: addedDocumentListRefetch,
    },
  ] = useLazyQuery<any>(GET_REQUIRED_DOCUMENT_TYPES);
  //add document
  const [addDocument, { loading: addDocumentLoading }] = useMutation<any>(
    ADD_DOCUMENT,
    {
      onCompleted({ addDocument }) {
        setIsSubmit(false);
        refetch();
        setShowDocumentPopup(false);
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('DOCUMENT_ADDED_SUCCESS')
          );
        }
      },
      onError: (error: ApolloError) => {
        const message = errorFormatter(error);
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      },
    }
  );

  // To fecth document type list
  const { data: documentTypeListData } = useQuery<any>(GET_DOCUMENT_TYPES, {
    variables: {
      userRole: 'careinstitution',
    },
  });
  // To set document type into label value pair
  const documentTypeList: IReactSelectInterface[] | undefined = [];
  if (documentTypeListData && documentTypeListData.getDocumentType) {
    documentTypeListData.getDocumentType.forEach((type: any) => {
      documentTypeList.push({
        label: type.type,
        value: type.id,
      });
    });
  }

  //disapprove document
  const [
    disapprovedDocument,
    { data: disApprovedData, loading: disapproveLoading },
  ] = useMutation<any>(DISAPPROVE_DOCUMENT);

  //approve document
  const [
    approvedDocument,
    { data: ApprovedData, loading: approveLoading },
  ] = useMutation<any>(APPROVE_DOCUMENT);

  //update document status
  const [updateDocumentStatus] = useMutation<any>(UPDATE_DOCUMENT_STATUS);

  //delete document
  const [deleteDocument] = useMutation<any>(DELETE_DOCUMENT);

  //delete explicit document types
  const [deleteDocumentTypes] = useMutation<any>(DELETE_DOCUMENT_TYPE_CAREINST);

  //update document
  const [updateDocument, { loading: updateDocumentLoading }] = useMutation<any>(
    UPDATE_CAREINST_DOC,
    {
      onCompleted({ updateDocument }) {
        refetch();
        setIsSubmit(false);
        setFileObject(null);
        setShowDocumentPopup(false);
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('DOCUMENT_UPDATED_SUCCESS')
          );
        }
      },
      onError: (error: ApolloError) => {
        const message = errorFormatter(error);
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      },
    }
  );
  //to fetch added document lest
  useEffect(() => {
    fetchAddedDocumentList({
      variables: {
        userId: id ? id : '',
      },
    });
  }, []);

  useEffect(() => {
    const { getRequiredDocuments = {} } = explicitDocument
      ? explicitDocument
      : {};
    const { document_types = [] } = getRequiredDocuments
      ? getRequiredDocuments
      : {};
    // To set added documents into label value pair
    setaddedDocumentType(
      document_types.map((document: any) => ({
        label: document.type,
        value: document.id,
      }))
    );
  }, [explicitDocument]);

  useEffect(() => {
    if (ApprovedData) {
      careInstDetailsRetch();
    }
  }, [ApprovedData]);

  useEffect(() => {
    if (disApprovedData) {
      careInstDetailsRetch();
    }
  }, [disApprovedData]);

  // Get Care Giver Details
  const [isApproved, setisApproved] = useState<boolean>(false);

  useEffect(() => {
    if (careInstData) {
      const { getCareInstitution } = careInstData;
      setisApproved(getCareInstitution.isApproved);
    }
  }, [careInstData]);

  //set state data null
  const setStateValueNull = () => {
    setRemarkValue(null);
    setDocumentType(undefined);
    setDocumentUrl(null);
    setStatusValue(true);
    setDocumentIdUpdate(null);
    setFileObject(null);
    setFilename(null);
    setIsMissingDocEditable(false);
    setUnsupportedFile(null);
    setDefaultDocument(null);
  };
  useEffect(() => {
    if (id) {
      fetchDocumentList({
        variables: {
          userId: id ? id : '',
        },
      });
      fetchCareInstDetails({
        variables: {
          careInstitutionId: id ? id : '',
        },
      });
    }
  }, [id]);

  //on update document
  const onUpdateDocument = (data: any, isMissingDocEditable: boolean) => {
    const {
      id = '',
      remarks = '',
      document_type = {},
      document = '',
      fileName = '',
      createdAt = '',
      isDefault = null,
    } = data ? data : {};
    //To set data in case of edit uploaded document
    setIsMissingDocEditable(isMissingDocEditable);
    setShowDocumentPopup(true);
    setDocumentIdUpdate(id);
    setDefaultDocument(isDefault);
    setDocumentType(
      document_type && document_type.type
        ? { label: document_type.type, value: document_type.id }
        : undefined
    );
    setRemarkValue(null);
    setDocumentUrl(null);
    if (!isMissingDocEditable) {
      setRemarkValue(remarks);
      setDocumentUrl({
        url: document,
        name: fileName,
        date: createdAt,
      });
      setFilename(fileName);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { checked, name, value } = target;
    if (name === 'check') {
      setStatusValue(checked);
    } else if (name === 'filename') {
      setFilename(value);
    } else {
      setRemarkValue(value);
    }
  };

  //convert document to binary format
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUnsupportedFile(null);
    let temp: any = documentUrls ? documentUrls : {};
    if (acceptedFiles && acceptedFiles.length) {
      acceptedFiles.forEach((file: File) => {
        setFileObject(file);
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              temp = {
                url: reader.result,
                name: file.name,
                date: moment().format('DD.MM.YYYY'),
              };
              setDocumentUrl(temp);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    } else {
      setUnsupportedFile(languageTranslation('SELECT_SINGLE_DOCUMENT'));
    }
  }, []);

  //approve disapprove checkbox
  const handleCheckElement = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    status: string
  ) => {
    const { target } = e;
    const { checked } = target;
    setDocumentId({ id, checked });
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation(
        status !== languageTranslation('APPROVE_STATUS')
          ? 'CONFIRM_CAREGIVER_DOCUMENT_STATUS_APPROVE_MSG'
          : 'CONFIRM_CAREGIVER_DOCUMENT_STATUS_NOTREQUESTED_MSG'
      ),
    });
    if (!value) {
      setDocumentId(null);
      return;
    } else {
      try {
        // toast.dismiss();
        await updateDocumentStatus({
          variables: {
            id: id ? parseInt(id) : null,
            status: checked === true ? 'approve' : 'decline',
          },
        });
        setDocumentId(null);
        refetch();
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('DOCUMENT_STATUS_UPDATED_SUCCESS')
          );
        }
      } catch (error) {
        const message = error.message
          .replace('SequelizeValidationError: ', '')
          .replace('Validation error: ', '')
          .replace('GraphQL error: ', '');
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  };
  //on save document detatils
  const handleSaveDocument = () => {
    setIsSubmit(true);
    const queryPath = path.pathname;
    const res = queryPath.split('/');
    const id = parseInt(res[3]);
    let documentInput = {
      fileName: fileName ? fileName : '',
      documentTypeId: documentType ? documentType.value : '',
      remarks: remarkValue ? remarkValue : '',
    };
    if (documentIdUpdate) {
      if ((isMissingDocEditable && fileObject) || fileName) {
        // To validate file name shoulb not be empty or is the missing document
        updateDocument({
          variables: {
            id: documentIdUpdate ? parseInt(documentIdUpdate) : '',
            documentInput: isMissingDocEditable
              ? {
                  ...documentInput,
                  document: fileObject ? fileObject : null,
                  status: statusValue ? 'approve' : 'notrequested',
                }
              : documentInput,
          },
        });
      }
    } else {
      if (fileObject !== null) {
        addDocument({
          variables: {
            documentInput: {
              userId: id ? id : '',
              document: fileObject ? fileObject : null,
              remarks: remarkValue,
              status: statusValue ? 'approve' : 'notrequested',
              documentTypeId: documentType ? documentType.value : '',
            },
          },
        });
      }
    }
  };

  //on delete document types
  const onDeleteDocumentTypes = async (documentId: string) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('DOCUMENT_TYPE_DELETED'),
    });
    if (!value) {
      return;
    } else {
      try {
        await deleteDocumentTypes({
          variables: {
            id: id ? id : null,
            requiredDocuments: [documentId],
          },
        });
        addedDocumentListRefetch();
        toast.dismiss();
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('DOCUMENT_DELETED_SUCCESSFULLY')
          );
        }
      } catch (error) {
        const message = error.message
          .replace('SequelizeValidationError: ', '')
          .replace('Validation error: ', '')
          .replace('GraphQL error: ', '');
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  };
  //on delete document
  const onDeleteDocument = async (id: string) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('DOCUMENT_TYPE_DELETED'),
    });
    if (!value) {
      return;
    } else {
      try {
        await deleteDocument({
          variables: {
            id: id ? parseInt(id) : null,
          },
        });
        refetch();
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('DOCUMENT_DELETED_SUCCESSFULLY')
          );
        }
      } catch (error) {
        const message = error.message
          .replace('SequelizeValidationError: ', '')
          .replace('Validation error: ', '')
          .replace('GraphQL error: ', '');
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  };

  //on approve document
  const onApprove = async () => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CI_PROFILE_APPROVE'),
    });
    if (!value) {
      return;
    } else {
      try {
        await approvedDocument({
          variables: {
            userId: id ? id : '',
            isApproved: true,
          },
        });
        refetch();
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('CI_PROFILE_APPROVE_SUCESS')
          );
        }
      } catch (error) {
        const message = error.message
          .replace('SequelizeValidationError: ', '')
          .replace('Validation error: ', '')
          .replace('GraphQL error: ', '');
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  };

  //on disapprove document
  const onDisapprove = async () => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CI_PROFILE_DISAPPROVE'),
    });
    if (!value) {
      return;
    } else {
      try {
        await disapprovedDocument({
          variables: {
            userId: id ? id : '',
            isApproved: false,
          },
        });
        refetch();
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('CI_PROFILE_DISAPPROVE_SUCESS')
          );
        }
      } catch (error) {
        const message = error.message
          .replace('SequelizeValidationError: ', '')
          .replace('Validation error: ', '')
          .replace('GraphQL error: ', '');
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  };
  return (
    <div>
      <DocumentsList
        setShowDocumentPopup={setShowDocumentPopup}
        setDocumentData={setDocumentData}
        documentListing={data}
        handleCheckElement={handleCheckElement}
        documentId={documentId}
        onDeleteDocument={onDeleteDocument}
        onUpdateDocument={onUpdateDocument}
        setStateValueNull={setStateValueNull}
        onApprove={onApprove}
        isApproved={isApproved}
        onDisapprove={onDisapprove}
        loading={loading}
        called={called}
        approveLoading={approveLoading}
        disapproveLoading={disapproveLoading}
        documentTypeList={documentTypeList}
        userId={id}
        onDeleteDocumentTypes={onDeleteDocumentTypes}
        addedDocumentType={addedDocumentType}
        setaddedDocumentType={setaddedDocumentType}
        setDocumentType={setDocumentType}
      />
      <DocumentUploadModal
        documentIdUpdate={documentIdUpdate}
        show={showDocumentPopup}
        handleClose={() => setShowDocumentPopup(false)}
        handleSaveDocument={handleSaveDocument}
        onDrop={onDrop}
        documentUrls={documentUrls}
        handleChange={handleChange}
        documentType={documentType}
        setDocumentType={setDocumentType}
        isMissingDocEditable={isMissingDocEditable}
        remarkValue={remarkValue}
        statusValue={statusValue}
        setDocumentData={setDocumentData}
        fileName={fileName}
        onUpdateDocument={onUpdateDocument}
        isSubmit={isSubmit}
        setIsSubmit={setIsSubmit}
        setShowDocumentPopup={setShowDocumentPopup}
        addDocumentLoading={addDocumentLoading}
        updateDocumentLoading={updateDocumentLoading}
        documentTypeList={documentTypeList}
        unsupportedFile={unsupportedFile}
        defaultDocument={defaultDocument}
      />
    </div>
  );
};

export default Documents;
