import React, { FunctionComponent } from 'react';
import { Col } from 'reactstrap';
import { useDropzone } from 'react-dropzone';

export const AttachmentFormComponent: FunctionComponent<any> = (props: any) => {
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
