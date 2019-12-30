import React, { Component } from "react";
import Dropzone from "react-dropzone";
class DocumentsUpload extends Component {
  render() {
    return (
        <>
        <div><h5>Documents Upload</h5></div>
      <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      </>
    );
  }
}
export default DocumentsUpload