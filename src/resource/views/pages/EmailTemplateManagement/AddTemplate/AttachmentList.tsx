import React, { FunctionComponent } from 'react';
import { Table } from 'reactstrap';
import { languageTranslation, FormatFileSize } from '../../../../../helpers';
import { IEmailAttachmentData } from '../../../../../interfaces';

export const AttachmentList: FunctionComponent<{
  attachment: IEmailAttachmentData[];
}> = ({ attachment }: { attachment: IEmailAttachmentData[] }) => {
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
              <td className='file-name'>{item.fileName}</td>
              <td className='size-col'>{FormatFileSize(item.size)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
