import React, { Component } from "react";
import Dropzone from "react-dropzone";
class Signature extends Component {
  render() {
    return (
        <>
        <h5>Signatute</h5><br/>
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
export default Signature