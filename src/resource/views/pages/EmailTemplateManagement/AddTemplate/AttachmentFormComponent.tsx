import React, { FunctionComponent, useCallback } from 'react';
import { Col } from 'reactstrap';
import { useDropzone } from 'react-dropzone';

export const AttachmentFormComponent: FunctionComponent<any> = (props: any) => {
  // convert document to binary format
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      // setFileObject(file);
      if (file) {
        const reader = new FileReader();
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onloadend = () => {
          if (reader.result) {
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: props.onDrop,
    multiple: false,
  });
  return (
    <Col lg={'12'}>
      <div {...getRootProps()} className='dropzone-preview mb-0'>
        <input {...getInputProps()} className='dropzone-input-preview' />
        <div className='icon-upload'>
          <i className='cui-cloud-upload'></i>
        </div>
        <span>
          {props && props.documentUrls
            ? props.documentUrls.name
            : "Drag 'n' drop files here, or click here to upload files"}
        </span>
      </div>
    </Col>
  );
};
