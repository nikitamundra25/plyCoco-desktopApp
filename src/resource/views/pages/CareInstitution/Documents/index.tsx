import React, { useState, useCallback, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { DocumentMutations } from '../../../../../graphql/Mutations';
import moment from 'moment';
import { IDocumentUrls } from '../../../../../interfaces';
import DocumentUploadModal from './DocumentModal';
import DocumentsList from './DocumentsList';
import { DocumentQueries } from '../../../../../graphql/queries';
import { languageTranslation } from '../../../../../helpers';
import { ConfirmBox } from '../../../components/ConfirmBox';
import { CareGiverQueries } from '../../../../../graphql/queries';

const [
  ADD_DOCUMENT,
  UPDATE_DOCUMENT_STATUS,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  APPROVE_DOCUMENT,
  DISAPPROVE_DOCUMENT
] = DocumentMutations;
const [, GET_CAREGIVER_BY_ID] = CareGiverQueries;
const [, GET_DOCUMENTS] = DocumentQueries;
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
  // const [errorMsg, setErrorMsg] = useState<string | null>(
  //   'Document is required'
  // );
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [documentId, setDocumentId] = useState<{
    id: string;
    checked: boolean;
  } | null>(null);

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
      }
    }
  );

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
        setShowDocumentPopup(false);
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('DOCUMENT_UPDATED_SUCCESS')
          );
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
    setRemarkValue(null);
    setDocumentType({ value: 'Various documents', label: 'Various documents' });
    setDocumentUrl(null);
    setStatusValue(true);
    setDocumentIdUpdate(null);
    setFileObject(null);
    setFilename(null);
    // setErrorMsg(null);
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
  }, []);

  //on update document
  const onUpdateDocument = (data: any) => {
    //set data in all states
    setDocumentData(data);
    setShowDocumentPopup(true);
    setRemarkValue(data.remarks);
    setDocumentType(
      data.documentType
        ? { label: data.documentType, value: data.documentType }
        : undefined
    );
    setDocumentUrl({
      url: data.document,
      name: data.fileName,
      date: data.createdAt
    });
    setFilename(data.fileName);
    setDocumentIdUpdate(data.id);
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
    let temp: any = documentUrls ? documentUrls : {};
    acceptedFiles.forEach((file: File) => {
      setFileObject(file);
      if (file) {
        const reader = new FileReader();
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onloadend = () => {
          if (reader.result) {
            temp = {
              url: reader.result,
              name: file.name,
              date: moment().format('DD.MM.YYYY')
            };
            setDocumentUrl(temp);
          }
        };
        reader.readAsDataURL(file);
      }
    });
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
    if (documentIdUpdate) {
      if (fileName) {
        updateDocument({
          variables: {
            id: documentIdUpdate ? parseInt(documentIdUpdate) : '',
            documentInput: {
              fileName: fileName ? fileName : '',
              documentType: documentType ? documentType.value : '',
              remarks: remarkValue ? remarkValue : ''
            }
          }
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
              documentType: documentType ? documentType.value : ''
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
      text: 'This document will be deleted'
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
          toastId = toast.success('Document deleted successfully');
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
      text: languageTranslation('CI_PROFILE_APPROVE')
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
      text: languageTranslation('CI_PROFILE_DISAPPROVE')
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
        // setErrorMsg={setErrorMsg}
        // errorMsg={errorMsg}
      />
    </div>
  );
};

export default Documents;
