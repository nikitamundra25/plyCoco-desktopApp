import React, { FunctionComponent } from 'react';
import { Table, UncontrolledTooltip } from 'reactstrap';
import { languageTranslation, formatFileSize } from '../../../../../helpers';
import { IEmailAttachmentData } from '../../../../../interfaces';

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
  const showPdfInNewTab = (
    base64Data: any,
    fileName: string,
    fileType: string,
  ) => {
    let pdfWindow: any = window.open('');
    pdfWindow.document.body.style.margin = '0px';
    pdfWindow.document.body.innerHTML = `<html><head><title>Order Invoice</title></head><body><embed width='100%' height='100%' name='plugin' data='pdf' type=${fileType} src=${base64Data}></embed></body></html>`;
    // pdfWindow.document.write(
    //   '<html<head><title>' +
    //     fileName +
    //     '</title><style>body{margin: 0px;}iframe{border-width: 0px;}</style></head>',
    // );
    // pdfWindow.document.write(
    //   "<body><embed width='100%' height='100%' src='data:application/pdf;base64, " +
    //     encodeURI(base64Data) +
    //     "#toolbar=0&navpanes=0&scrollbar=0'></embed></body></html>",
    // );
  };
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
              <td
                className='file-name'
                // onClick={() =>
                //   showPdfInNewTab(
                //     item.url,
                //     item.fileName,
                //     item.file ? item.file.type : 'application/pdf',
                //   )
                // }
              >
                <span>{item.fileName}</span>
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
