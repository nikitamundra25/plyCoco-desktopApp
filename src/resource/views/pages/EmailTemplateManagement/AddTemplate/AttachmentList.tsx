import React, { FunctionComponent } from 'react';
import { Table, UncontrolledTooltip } from 'reactstrap';
import { languageTranslation, formatFileSize } from '../../../../../helpers';
import { IEmailAttachmentData } from '../../../../../interfaces';
import { fileSize, AppConfig } from '../../../../../config';

export const AttachmentList: FunctionComponent<{
  attachment: IEmailAttachmentData[];
  label?: string;
  onDelteDocument?: (attachmentId: string, attachmentIndex?: number) => void;
}> = ({
  attachment,
  label,
  onDelteDocument,
}: {
  attachment: IEmailAttachmentData[];
  label?: string;
  onDelteDocument?: (attachmentId: string, attachmentIndex?: number) => void;
}) => {
  return (
    <Table bordered hover responsive className='mail-table'>
      <thead className='thead-bg'>
        <tr>
          <th className='file-name'>{languageTranslation('FILE_NAME')}</th>
          {label !== 'preview' ? (
            <th className='size-col'>{languageTranslation('SIZE')}</th>
          ) : null}
        </tr>
      </thead>
      <tbody>
        {attachment.map((item: IEmailAttachmentData, index: number) => {
          return (
            <tr key={index}>
              <td className={`file-name`}>
                <div
                  className={`file-description ${
                    attachment.length === 1 ? 'my-2 py-2' : ''
                  }`}
                >
                  {typeof item.url === 'string' && item.url ? (
                    <>
                      <a
                        href={item.url}
                        target='_blank'
                        download={item.fileName}
                        className='word-wrap view-more-link'
                      >
                        {item.fileName}
                      </a>
                      <span className='new-tag d-inline-flex align-items-center justify-content-center'>
                        NEW
                      </span>
                    </>
                  ) : (
                    <span
                      onClick={() => {
                        let path = item.path;
                        // To concat base path in existing. In attachmetn full path are a;ready there
                        if (label !== 'preview') {
                          path = `${AppConfig.FILES_ENDPOINT}${item.path}`;
                        }
                        return window.open(path, '_blank');
                      }}
                      className='word-wrap view-more-link'
                    >
                      {item.fileName}
                    </span>
                  )}
                  {onDelteDocument ? (
                    <span
                      id={`delete${index}`}
                      className='trash-icon'
                      onClick={() =>
                        onDelteDocument(item.id ? item.id : '', index)
                      }
                    >
                      <UncontrolledTooltip
                        placement={'top'}
                        target={`delete${index}`}
                      >
                        {languageTranslation('ATTACHMENT_DELETE_INFO_MSG')}
                      </UncontrolledTooltip>
                      <i className='fa fa-trash'></i>
                    </span>
                  ) : null}
                </div>
              </td>
              {label !== 'preview' ? (
                <td className='size-col'>{formatFileSize(item.size)}</td>
              ) : null}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
