import React, { FunctionComponent, useState } from 'react';
import { Table, Button, Input, UncontrolledTooltip } from 'reactstrap';
import moment from 'moment';
import { languageTranslation, formatFileSize } from '../../../../../helpers';
import { AppConfig, defaultDateTimeFormat } from '../../../../../config';
import Loader from '../../../containers/Loader/Loader';
const DocumentsList: FunctionComponent<any> = (props: any) => {
  const {
    documentListing,
    setStateValueNull,
    setShowDocumentPopup,
    isApproved,
    onDisapprove,
    onApprove,
    documentId,
    handleCheckElement,
    onUpdateDocument,
    onDeleteDocument,
    approveLoading,
    disapproveLoading,
    loading,
    called
  } = props;
  let allDocDisApp: boolean = true;
  if (
    documentListing &&
    documentListing.getDocuments &&
    documentListing.getDocuments.length
  ) {
    documentListing.getDocuments.map((data: any) => {
      if (data && data.status === 'approve') {
        allDocDisApp = false;
      }
    });
  }

  return (
    <>
      <div className='document-upload-section mb-3'>
        <div className='d-flex align-items-center justify-content-between flex-wrap'>
          <h5 className='content-title mb-3'>
            {languageTranslation('CG_SUB_MENU_DOCUMENTS')}
          </h5>
          <div>
            {isApproved ? (
              <Button
                onClick={() => {
                  onDisapprove();
                }}
                // disabled={
                //   allDocDisApp ||
                //   (documentListing &&
                //     documentListing.getDocuments &&
                //     !documentListing.getDocuments.length)
                // }
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
                onClick={() => {
                  onApprove();
                }}
                disabled={
                  allDocDisApp ||
                  (documentListing &&
                    documentListing.getDocuments &&
                    !documentListing.getDocuments.length)
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
                setShowDocumentPopup(true);
              }}
              className='btn-common mb-3'
              color='primary'
            >
              <i className={'fa fa-upload'} />
              &nbsp;{languageTranslation('UPLOAD_DOCUMENT')}
            </Button>
          </div>
        </div>

        <Table bordered responsive>
          <thead className='thead-bg'>
            <tr>
              <th className='sno-th-column text-center'>
                {languageTranslation('S_NO')}
              </th>
              <th className='date-th-column'>{languageTranslation('DATE')}</th>
              <th className='file-th-column'>
                {languageTranslation('FILE_NAME')}
              </th>
              <th className='filetype-th-column'>
                {languageTranslation('TYPE')}
              </th>
              <th>{languageTranslation('REMARKS')}</th>
              <th className='checkbox-th-column '>
                {languageTranslation('CHECKED')}
              </th>
              <th className='filesize-th-column'>
                {languageTranslation('FILE_SIZE')}
              </th>
              <th className={'text-center action-th-column'}>
                {languageTranslation('TABEL_HEAD_CG_ACTION')}
              </th>
            </tr>
          </thead>
          <tbody>
            {!called || loading ? (
              <tr>
                <td className={'table-loader'} colSpan={8}>
                  <Loader />
                </td>
              </tr>
            ) : documentListing &&
              documentListing.getDocuments &&
              documentListing.getDocuments.length ? (
              documentListing.getDocuments.map((list: any, index: number) => {
                const documentLength = documentListing.getDocuments.length;
                const size = formatFileSize(list.fileSize);
                console.log('list', list);

                return (
                  <tr
                    key={index}
                    className={
                      list.status === 'approve' ? 'approve-bg' : 'table-danger'
                    }
                  >
                    <td className='sno-th-column text-center'>{index + 1}</td>
                    <td className='date-th-column'>
                      {list && list.createdAt
                        ? moment(list.createdAt).format(defaultDateTimeFormat)
                        : '-'}
                    </td>
                    <td>
                      <span
                        onClick={() =>
                          window.open(
                            `${AppConfig.FILES_ENDPOINT}${list.document}`,
                            '_blank'
                          )
                        }
                        className='view-more-link word-wrap'
                      >
                        {list && list.fileName ? list.fileName : '-'}
                      </span>
                    </td>
                    <td>
                      <span>
                        {list && list.document_type && list.document_type.type
                          ? list.document_type.type
                          : '-'}
                      </span>
                    </td>
                    <td className='remark-col'>
                      {list && list.remarks ? list.remarks : '-'}
                    </td>
                    <td className='text-center'>
                      <span className='checkboxli checkbox-custom checkbox-default'>
                        <input
                          type='checkbox'
                          checked={
                            documentId && documentId.id === list.id
                              ? documentId.checked
                              : list.status === 'approve'
                              ? true
                              : false
                          }
                          onChange={(e: any) => {
                            handleCheckElement(e, list.id, list.status);
                          }}
                          className=''
                        />
                        <label className=''></label>
                      </span>
                    </td>

                    <td>{size}</td>
                    <td>
                      <div
                        className={`action-btn ${
                          documentLength === 1 ? 'margin-tooltip' : ''
                        }`}
                      >
                        <span
                          id={`edit${index}`}
                          className='btn-icon mr-2'
                          onClick={() => onUpdateDocument(list)}
                          // disable={list.status === 'approve'}
                        >
                          <UncontrolledTooltip
                            placement={'top'}
                            target={`edit${index}`}
                          >
                            {languageTranslation('DOCUMENT_EDIT')}
                          </UncontrolledTooltip>
                          <i className='fa fa-pencil'></i>
                        </span>
                        <span
                          id={`delete${index}`}
                          className={`btn-icon mr-2 ${
                            list.status === 'approve' ? 'disbale' : ''
                          }`}
                          onClick={() =>
                            list.status === 'approve'
                              ? ''
                              : onDeleteDocument(list.id)
                          }
                        >
                          {list.status === 'approve' ? (
                            ''
                          ) : (
                            <UncontrolledTooltip
                              placement={'top'}
                              target={`delete${index}`}
                            >
                              {languageTranslation('DOCUMENT_DELETE')}
                            </UncontrolledTooltip>
                          )}
                          <i className='fa fa-trash'></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className={'text-center no-hover-row'}>
                <td colSpan={8} className={'pt-5 pb-5'}>
                  <div className='no-data-section'>
                    <div className='no-data-icon'>
                      <i className='icon-ban' />
                    </div>
                    <h4 className='mb-1'>
                      Currently there are no documents added.{' '}
                    </h4>
                    <p>Please click above button to add new document. </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default DocumentsList;
