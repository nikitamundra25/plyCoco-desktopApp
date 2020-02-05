import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { AppBreadcrumb } from '@coreui/react';

import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { DocumentMutations } from '../../../../../graphql/Mutations';
import routes from '../../../../../routes/routes';
import moment from 'moment';
import { IDocumentUrls } from '../../../../../interfaces';
import DocumentUploadModal from './DocumentModal';
import DocumentsList from './DocumentsList';
import { DocumentQueries } from '../../../../../graphql/queries';
import { languageTranslation } from '../../../../../helpers';
import { ConfirmBox } from '../../../components/ConfirmBox';
const [
  ADD_DOCUMENT,
  UPDATE_DOCUMENT_STATUS,
  UPDATE_DOCUMENT
] = DocumentMutations;
const [GET_DOCUMENT_LIST] = DocumentQueries;
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
  const [fetchDocumentList, { data, loading, refetch }] = useLazyQuery<any>(
    GET_DOCUMENT_LIST
  );
  const [documentId, setDocumentId] = useState<{
    id: string;
    checked: boolean;
  } | null>(null);

  //add document
  const [addDocument] = useMutation<any>(ADD_DOCUMENT, {
    onCompleted({ addDocument }) {
      refetch();
      setShowDocumentPopup(false);
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation('DOCUMENT_ADDED_SUCCESS'));
      }
    }
  });

  //update document status

  const [updateDocumentStatus] = useMutation<any>(UPDATE_DOCUMENT_STATUS);
  //   , {
  //   onCompleted({ updateDocumentStatus }) {
  //     refetch();
  //     if (!toast.isActive(toastId)) {
  //       toastId = toast.success(
  //         languageTranslation('DOCUMENT_STATUS_UPDATED_SUCCESS')
  //       );
  //     }
  //   }
  // });

  //update document
  const [updateDocument] = useMutation<any>(UPDATE_DOCUMENT, {
    onCompleted({ updateDocument }) {
      refetch();
      setShowDocumentPopup(false);
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation('DOCUMENT_UPDATED_SUCCESS')
        );
      }
    }
  });

  useEffect(() => {
    if (id) {
      fetchDocumentList({
        variables: {
          userId: id ? id : ''
        }
      });
    }
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { checked, name, value } = target;
    if (name === 'check') {
      setStatusValue(checked);
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
              path: reader.result,
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
        status === 'notrequested'
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
        console.log('id in upd', id);
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
    const queryPath = path.pathname;
    const res = queryPath.split('/');
    const id = parseInt(res[3]);
    if (id) {
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
  };
  console.log('fileObject in index', fileObject);

  return (
    <Card>
      <CardHeader>
        <AppBreadcrumb appRoutes={routes} className='w-100 mr-3' />
      </CardHeader>
      <CardBody>
        <div>
          <DocumentsList
            setShowDocumentPopup={setShowDocumentPopup}
            documentListing={data}
            handleCheckElement={handleCheckElement}
            documentId={documentId}
          />
          <DocumentUploadModal
            show={showDocumentPopup}
            handleClose={() => setShowDocumentPopup(false)}
            handleSaveDocument={handleSaveDocument}
            onDrop={onDrop}
            documentUrls={documentUrls}
            handleChange={handleChange}
            setDocumentType={setDocumentType}
            remarkValue={remarkValue}
            statusValue={statusValue}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default Documents;
