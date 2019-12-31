import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { Col, Row, UncontrolledCollapse } from "reactstrap";
class DocumentsUpload extends Component {
  render() {
    return (
      <>
        <div className="document-upload-section mb-3">
          <h5 className="content-title">Documents Upload</h5>
          <div className="document-item ">
            <Row>
              <Col md={"3"} lg={"2"}>
                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "dropzone-wrapper" })}>
                      <input {...getInputProps()} />
                      <div className="file-text">Drag the document here</div>
                    </div>
                  )}
                </Dropzone>
              </Col>
              <Col md={"9"} lg={"10"}>
                <h5>Professional liability insurance (no application)</h5>
                <p className="sub-title " id="toggler">
                  <span>
                    {" "}
                    <i className="fa fa-chevron-right mr-2"></i>
                  </span>
                  How do I get this document
                </p>
                <UncontrolledCollapse toggler="#toggler">
                  <div className="document-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nesciunt magni, voluptas debitis similique porro a molestias
                    consequuntur earum odio officiis natus, amet hic, iste sed
                    dignissimos esse fuga! Minus, alias.
                  </div>
                </UncontrolledCollapse>
              </Col>
            </Row>
          </div>
        </div>
        <div>
          <h5 className="content-title">General documents</h5>
          <div className="d-flex align-items-center file-section">
            <div className="file-icon">
              <i className="fa fa-file-pdf-o"></i>
            </div>
            <div className="file-content">
              <h5>Dienstleistungsnachweis.pdf</h5>
              <div className="sub-title ">
                there is a pre-filled one in the appointment overview!
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default DocumentsUpload;
