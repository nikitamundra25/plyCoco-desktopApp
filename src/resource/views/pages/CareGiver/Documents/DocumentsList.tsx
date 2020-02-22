import React, { FunctionComponent, useState } from 'react';
import { Table, UncontrolledTooltip } from 'reactstrap';
import moment from 'moment';
import { languageTranslation, formatFileSize } from '../../../../../helpers';
import { AppConfig, defaultDateTimeFormat } from '../../../../../config';
import Loader from '../../../containers/Loader/Loader';
const DocumentsList: FunctionComponent<any> = (props: any) => {
  const {
    documentListing,
    documentId,
    handleCheckElement,
    onUpdateDocument,
    onDeleteDocument,
    loading,
  } = props;
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [activeRow, setActiveRow] = useState<number>(-1);
  const expandedText = (index: number) => {
    setIsExpand(activeRow === index || activeRow === -1 ? !isExpand : isExpand);
    setActiveRow(activeRow === index ? -1 : index);
  };
  return (
    <div className='archieve-table-minheight '>
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
          {loading ? (
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
              return list ? (
                <tr
                  key={index}
                  className={
                    list.fileName && list.status === 'approve'
                      ? 'approve-bg'
                      : 'table-danger'
                  }
                >
                  <td className='sno-th-column text-center'>{index + 1}</td>
                  <td className='date-th-column'>
                    {list.createdAt && list.fileName // filename condition to manage missing document
                      ? moment(list.createdAt).format(defaultDateTimeFormat)
                      : '-'}
                  </td>
                  <td>
                    <span
                      onClick={() =>
                        list.fileName
                          ? window.open(
                              `${AppConfig.FILES_ENDPOINT}${list.document}`,
                              '_blank'
                            )
                          : ''
                      }
                      className={`word-wrap ${
                        list.fileName
                          ? 'view-more-link'
                          : 'text-black-50 font-weight-bold cursor-notallowed'
                      }`}
                    >
                      {list.fileName
                        ? list.fileName
                        : `---${languageTranslation('DOCUMENT_MISSING')}---`}
                    </span>
                  </td>
                  <td>
                    <span>
                      {list.document_type && list.document_type.type
                        ? list.document_type.type
                        : '-'}
                    </span>
                  </td>
                  <td className='remark-col'>
                    {list.remarks ? (
                      list.remarks.length <= 100 ? (
                        list.remarks
                      ) : (
                        <p className='mb-0'>
                          {isExpand && activeRow === index
                            ? list.remarks
                            : list.remarks.substr(0, 100)}
                          ...
                          <span
                            className='view-more-link'
                            onClick={() => expandedText(index)}
                          >
                            {isExpand && activeRow === index
                              ? 'Read less'
                              : 'Read more'}
                          </span>
                        </p>
                      )
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className='text-center'>
                    <span className=' checkbox-custom '>
                      <input
                        type='checkbox'
                        checked={
                          documentId && documentId.id === list.id
                            ? documentId.checked
                            : list.status === 'approve'
                            ? true
                            : false
                        }
                        disabled={!list.fileName}
                        onChange={(e: any) => {
                          handleCheckElement(e, list.id, list.status);
                        }}
                        className=''
                      />
                      <label className=''></label>
                    </span>
                  </td>

                  <td>{list.fileSize ? formatFileSize(list.fileSize) : '-'}</td>
                  <td>
                    <div className={`action-btn`}>
                      <span
                        id={`edit${index}`}
                        className='btn-icon mr-2'
                        onClick={() =>
                          onUpdateDocument(
                            list,
                            list.fileName ? false : true, // To ensure user try to edit missing document
                          )
                        }
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
                          list.status === 'approve' || !list.fileName
                            ? 'disabled-class'
                            : ''
                        }`}
                        onClick={() =>
                          !list.fileName || list.status === 'approve'
                            ? null
                            : onDeleteDocument(list.id)
                        }
                      >
                        {!list.fileName || list.status === 'approve' ? null : (
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
              ) : null;
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
  );
};
export default DocumentsList;
