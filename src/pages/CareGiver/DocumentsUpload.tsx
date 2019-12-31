import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { Col, Row } from "reactstrap";
class DocumentsUpload extends Component {
  render() {
    return (
      <>
        <div className="document-upload-section">
          <h5 className="content-title">Documents Upload</h5>
          <Row>
            <Col md={"3"} lg={"2"}>
              <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                )}
              </Dropzone>
            </Col>
            <Col md={"9"} lg={"10"}></Col>
          </Row>
        </div>
      </>
    );
  }
}
export default DocumentsUpload;
