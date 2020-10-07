import React, { useState, useCallback, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useMutation, useLazyQuery, useQuery } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-client';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { DocumentMutations } from '../../../../../graphql/Mutations';
import {
  IDocumentUrls,
  IReactSelectInterface
} from '../../../../../interfaces';
import DocumentUploadModal from './DocumentModal';
import DocumentsList from './DocumentsList';
import {
  CareGiverQueries,
  DocumentQueries
} from '../../../../../graphql/queries';
import { errorFormatter, languageTranslation } from '../../../../../helpers';
import { ConfirmBox } from '../../../components/ConfirmBox';
import { regSinceDate } from '../../../../../config';

const [
  ADD_DOCUMENT,
  UPDATE_DOCUMENT_STATUS,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  APPROVE_DOCUMENT,
  DISAPPROVE_DOCUMENT
] = DocumentMutations;
const [, GET_CAREGIVER_BY_ID] = CareGiverQueries;
const [, GET_DOCUMENTS, GET_DOCUMENT_TYPES] = DocumentQueries;

let toastId: any = '';

const Documents = () => {
  const path = useLocation();
  const queryPath = path.pathname;
  const res = queryPath.split('/');
  const id = parseInt(res[3]);
  const [requiredDoc, setRequiredDoc] = useState<any>(null);
  const [showDocumentPopup, setShowDocumentPopup] = useState<boolean>(false);
  const [documentUrls, setDocumentUrl] = useState<IDocumentUrls | null>(null);
  const [fileObject, setFileObject] = useState<Object | null>(null);
  const [statusValue, setStatusValue] = useState<boolean>(true);
  const [remarkValue, setRemarkValue] = useState<string>('');
  const [documentType, setDocumentType] = useState<
    IReactSelectInterface | undefined
  >(undefined);
  const [documentIdUpdate, setDocumentIdUpdate] = useState<any>(null);
  const [fileName, setFilename] = useState<any>(null);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  // To set missing document type editable
  const [isMissingDocEditable, setIsMissingDocEditable] = useState<boolean>(
    false
  );
  const [unsupportedFile, setUnsupportedFile] = useState<string | null>(null);
  const [documentId, setDocumentId] = useState<{
    id: string;
    checked: boolean;
  } | null>(null);
  const [defaultDocument, setDefaultDocument] = useState<boolean | undefined>(
    undefined
  );
  const [fetchDocumentList, { data, loading, refetch, called }] = useLazyQuery<
    any
  >(GET_DOCUMENTS);
  const [
    fetchCaregiverDetails,
    {
      data: caregiverData,
      loading: caregiverDataLoading,
      refetch: careGiverDetailsRetch
    }
  ] = useLazyQuery<any>(GET_CAREGIVER_BY_ID);

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
      }
    }
  );
  // To fecth document type list
  const { data: documentTypeListData } = useQuery<any>(GET_DOCUMENT_TYPES, {
    variables: {
      userRole: "caregiver"
    }
  });

  // To set document type into label value pair
  const documentTypeList: IReactSelectInterface[] | undefined = [];
  if (documentTypeListData && documentTypeListData.getDocumentType) {
    documentTypeListData.getDocumentType.forEach((type: any) => {
      documentTypeList.push({
        label: type.type,
        value: type.id
      });
    });
  }

  //disapprove document
  const [
    disapprovedDocument,
    { data: disApprovedData, loading: disapproveLoading }
  ] = useMutation<any>(DISAPPROVE_DOCUMENT);

  //approve document
  const [
    approvedDocument,
    { data: ApprovedData, loading: approveLoading }
  ] = useMutation<any>(APPROVE_DOCUMENT);

  //update document status
  const [updateDocumentStatus] = useMutation<any>(UPDATE_DOCUMENT_STATUS);

  //delete document
  const [deleteDocument] = useMutation<any>(DELETE_DOCUMENT);

  //update document
  const [updateDocument, { loading: updateDocumentLoading }] = useMutation<any>(
    UPDATE_DOCUMENT,
    {
      onCompleted({ updateDocument }) {
        refetch();
        setIsSubmit(false);
        resetFormValue();
        setIsMissingDocEditable(false);
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
      }
    }
  );

  useEffect(() => {
    if (ApprovedData) {
      careGiverDetailsRetch();
    }
  }, [ApprovedData]);

  useEffect(() => {
    if (disApprovedData) {
      careGiverDetailsRetch();
    }
  }, [disApprovedData]);

  // useEffect(() => {
  //   const { getDocumentType = [] } = documentTypeListData
  //     ? documentTypeListData
  //     : {};
  //   if (getDocumentType && getDocumentType.length) {
  //     const result = getDocumentType.filter((docType: any) => {
  //       docType.type === languageTranslation('VARIOUS_DOCUMENTS');
  //     })[0];
  //     if (result) {
  //       setDocumentType();
  //     }
  //   }
  // }, [documentTypeListData]);

  // Get Care Giver Details
  const [isApproved, setisApproved] = useState<boolean>(false);

  useEffect(() => {
    if (caregiverData) {
      const { getCaregiver } = caregiverData;
      setisApproved(getCaregiver.isApproved);
    }
  }, [caregiverData]);

  //set state data null
  const setStateValueNull = () => {
    setRemarkValue('');
    setDocumentType(undefined);
    setDocumentUrl(null);
    setStatusValue(true);
    setDocumentIdUpdate(null);
    setFileObject(null);
    setFilename(null);
    setIsMissingDocEditable(false);
    setDefaultDocument(undefined);
    // setErrorMsg(null);
  };

  //Reset form
  const resetFormValue = () => {
    setRemarkValue('');
    setDocumentType(undefined);
    setDocumentUrl(null);
    setStatusValue(true);
    setDocumentIdUpdate(null);
    setFileObject(null);
    setFilename(null);
  };
  useEffect(() => {
    if (id) {
      fetchDocumentList({
        variables: {
          userId: id ? id : ''
        }
      });
      fetchCaregiverDetails({
        variables: {
          id: id ? id : ''
        }
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
      isDefault = null
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
    setRemarkValue('');
    setDocumentUrl(null);
    if (!isMissingDocEditable) {
      setRemarkValue(remarks);
      setDocumentUrl({
        url: document,
        name: fileName,
        date: createdAt
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
                date: moment().format(regSinceDate)
              };
              setDocumentUrl(temp);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    } else {
      setUnsupportedFile(languageTranslation('UNSUPPORTED_FILE_FORMAT'));
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
      )
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
            status: checked === true ? 'approve' : 'decline'
          }
        });
        setDocumentId(null);
        refetch();
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('DOCUMENT_STATUS_UPDATED_SUCCESS')
          );
        }
      } catch (error) {
        const message = errorFormatter(error);
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
      remarks: remarkValue ? remarkValue : ''
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
                  status: statusValue ? 'approve' : 'notrequested'
                }
              : documentInput
          }
        });
      }
    } else {
      if (fileObject !== null) {
        addDocument({
          variables: {
            documentInput: {
              userId: id ? id : '',
              documentTypeId: documentType ? documentType.value : '',
              document: fileObject ? fileObject : null,
              remarks: remarkValue,
              status: statusValue ? 'approve' : 'notrequested'
            }
          }
        });
      }
    }
  };

  //on delete document
  const onDeleteDocument = async (id: string) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation("DELETE_DOCUMENT")
    });
    if (!value) {
      return;
    } else {
      try {
        await deleteDocument({
          variables: {
            id: id ? parseInt(id) : null
          }
        });
        refetch();
        if (!toast.isActive(toastId)) {
          toastId = toast.success(languageTranslation("DELETE_DOCUMENT_SUCCESSFULLY"));
        }
      } catch (error) {
        const message = errorFormatter(error);
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
      text: languageTranslation('CG_PROFILE_APPROVE')
    });
    if (!value) {
      return;
    } else {
      try {
        await approvedDocument({
          variables: {
            userId: id ? id : '',
            isApproved: true
          }
        });
        refetch();
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('CG_PROFILE_APPROVE_SUCESS')
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
      text: languageTranslation('CG_PROFILE_DISAPPROVE')
    });
    if (!value) {
      return;
    } else {
      try {
        await disapprovedDocument({
          variables: {
            userId: id ? id : '',
            isApproved: false
          }
        });
        refetch();
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('CG_PROFILE_DISAPPROVE_SUCESS')
          );
        }
      } catch (error) {
        const message = errorFormatter(error);
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  };

  return (
    <div>
      <div className='document-upload-section mb-3'>
        <div className='d-flex align-items-center justify-content-between flex-wrap'>
          <h5 className='content-title mb-3'>
            {languageTranslation('CG_SUB_MENU_DOCUMENTS')}
          </h5>
          <div>
            {isApproved ? (
              <Button
                onClick={onDisapprove}
                className='btn-common btn-inactive mb-3 mr-3'
                color='link'
              >
                {disapproveLoading ? (
                  <>
                    <i className='fa fa-spinner fa-spin ' />{' '}
                    {languageTranslation('DISAPPROVE')}
                  </>
                ) : (
                  languageTranslation('DISAPPROVE')
                )}
              </Button>
            ) : (
              <Button
                onClick={onApprove}
                disabled={
                  (data &&
                    data.getDocuments &&
                    data.getDocuments.filter(
                      (document: any) =>
                        document.isDefault && document.status !== 'approve'
                    ).length) ||
                  loading
                    ? true
                    : false // If any of the required document in not approved by admin
                }
                className='btn-common btn-active mb-3 mr-3 '
                color='link'
              >
                {approveLoading ? (
                  <>
                    <i className='fa fa-spinner fa-spin ' />{' '}
                    {languageTranslation('APPROVE')}
                  </>
                ) : (
                  languageTranslation('APPROVE')
                )}
              </Button>
            )}
            <Button
              onClick={() => {
                setStateValueNull();
                setIsMissingDocEditable(false);
                setShowDocumentPopup(true);
                setDocumentType(
                  documentTypeList.filter(
                    (docType: any) =>
                       docType.value === "6"
                      //  languageTranslation('VARIOUS_DOCUMENTS')
                  )[0]
                );
              }}
              className='btn-common mb-3'
              color='primary'
            >
              <i className={'fa fa-upload'} />
              &nbsp;{languageTranslation('UPLOAD_DOCUMENT')}
            </Button>
          </div>
        </div>
        <DocumentsList
          documentListing={data}
          handleCheckElement={handleCheckElement}
          documentId={documentId}
          onDeleteDocument={onDeleteDocument}
          onUpdateDocument={onUpdateDocument}
          loading={!called || loading}
        />
      </div>
      <DocumentUploadModal
        // Functions
        handleClose={() => {
          setShowDocumentPopup(false);
          setStateValueNull();
        }}
        handleSaveDocument={handleSaveDocument}
        onUpdateDocument={onUpdateDocument}
        documentIdUpdate={documentIdUpdate}
        onDrop={onDrop}
        // States
        show={showDocumentPopup}
        documentUrls={documentUrls}
        handleChange={handleChange}
        documentType={documentType}
        setDocumentType={setDocumentType}
        remarkValue={remarkValue}
        statusValue={statusValue}
        fileName={fileName}
        isMissingDocEditable={isMissingDocEditable}
        isSubmit={isSubmit}
        loading={addDocumentLoading || updateDocumentLoading}
        documentTypeList={documentTypeList}
        unsupportedFile={unsupportedFile}
        defaultDocument={defaultDocument}
        setRequiredDoc={setRequiredDoc}
      />
    </div>
  );
};

export default Documents;
