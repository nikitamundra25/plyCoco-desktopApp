import React, { FunctionComponent } from 'react';
import { Table, UncontrolledTooltip } from 'reactstrap';
import { languageTranslation, formatFileSize } from '../../../../../helpers';
import { IEmailAttachmentData } from '../../../../../interfaces';
import { fileSize, AppConfig } from '../../../../../config';

export const AttachmentList: FunctionComponent<{
  attachment: IEmailAttachmentData[];
  onDelteDocument: (attachmentId: string, attachmentIndex?: number) => void;
}> = ({
  attachment,
  onDelteDocument,
}: {
  attachment: IEmailAttachmentData[];
  onDelteDocument: (attachmentId: string, attachmentIndex?: number) => void;
}) => {
  return (
    <Table bordered hover responsive className='mail-table'>
      <thead className='thead-bg'>
        <tr>
          <th className='file-name'>{languageTranslation('FILE_NAME')}</th>
          <th className='size-col'>{languageTranslation('SIZE')}</th>
        </tr>
      </thead>
      <tbody>
        {attachment.map((item: IEmailAttachmentData, index: number) => {
          return (
            <tr key={index}>
              <td className='file-name'>
                {typeof item.url === 'string' && item.url ? (
                  <a href={item.url} target='_blank' download={item.fileName}>
                    {item.fileName}
                  </a>
                ) : (
                  <span
                    onClick={() =>
                      window.open(
                        `${AppConfig.FILES_ENDPOINT}${item.path}`,
                        '_blank',
                      )
                    }
                  >
                    {item.fileName}
                  </span>
                )}
                <span
                  id={`delete${index}`}
                  className='list-item-icon'
                  onClick={() => onDelteDocument(item.id ? item.id : '', index)}
                >
                  <UncontrolledTooltip
                    placement={'top'}
                    target={`delete${index}`}
                  >
                    {languageTranslation('ATTACHMENT_DELETE_INFO_MSG')}
                  </UncontrolledTooltip>
                  <i className='fa fa-trash'></i>
                </span>
              </td>
              <td className='size-col'>{formatFileSize(item.size)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
