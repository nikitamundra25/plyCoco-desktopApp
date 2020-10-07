import React, { FunctionComponent,  useState } from 'react';
import { Col } from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import { languageTranslation } from '../../../../../helpers';
export const AttachmentFormComponent: FunctionComponent<any> = ({
  uploadDocument,
  newEmailPortion,
  attachment
}: any) => {
  const [fileSize, setfileSize] = useState<string | any>(null);
  //to get size of all the files
  let totalFileSize = attachment.reduce((a: any, b: any) => +a + +b.size, 0);

  // convert document to binary format
  // if (totalFileSize < 25)
  const onDrop = (acceptedFiles: File[]) => {
    setfileSize(null);
    if (acceptedFiles && acceptedFiles.length) {
      acceptedFiles.forEach((file: File) => {
        if (file) {
          totalFileSize += file.size;
          if (totalFileSize < 25000000) {
            const reader = new FileReader();
            reader.onloadend = () => {
              if (reader.result) {
                uploadDocument({
                  url: reader.result,
                  fileName: file.name,
                  size: file.size,
                  file,
                  path: ''
                });
              }
            };
            reader.readAsDataURL(file);
          } else {
            setfileSize(languageTranslation('FILE_MUST_BE_LESS_THAN_25_MB'));
          }
        }
      });
    } else {
      setfileSize(languageTranslation('FILE_MUST_BE_LESS_THAN_25_MB'));
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    minSize: 0,
    maxSize: 25000000
  });
  return (
    <Col lg={newEmailPortion ? '4' : '12'}>
      <div
        {...getRootProps()}
        className={
          newEmailPortion
            ? 'dropzone-preview email-dropzone-height mb-2'
            : 'dropzone-preview mb-2 '
        }
      >
        <input {...getInputProps()} className='dropzone-input-preview' />
        <div className='icon-upload'>
          <i className='cui-cloud-upload'></i>
        </div>
        <span>{languageTranslation("PERSONAL_DOCUMENTS_UPLOAD")} </span>
      </div>
      <div className='required-file-error'>{fileSize}</div>
    </Col>
  );
};
