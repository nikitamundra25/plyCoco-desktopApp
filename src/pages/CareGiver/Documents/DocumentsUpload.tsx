import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { Col, Row, UncontrolledCollapse, Table } from "reactstrap";
class DocumentsUpload extends Component {
  render() {
    return (
      <>
        <div className="document-upload-section mb-3">
          <Table bordered hover responsive>
            <thead className="thead-bg">
              <tr>
                <th>Date</th>
                <th>File Name</th>
                <th>Type</th>
                <th>Remarks</th>
                <th>Action</th>
                <th>File Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploama/Exam</td>
                <td></td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
              <tr>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploama/Exam</td>
                <td></td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
              <tr>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploama/Exam</td>
                <td></td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
              <tr>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploama/Exam</td>
                <td></td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
              <tr>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploama/Exam</td>
                <td></td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
              <tr>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploama/Exam</td>
                <td></td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
              <tr>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploama/Exam</td>
                <td></td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
            </tbody>
          </Table>
        </div>
        {/* <div className="document-upload-section mb-3">
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
                <p className="sub-title " id="toggler1">
                  <span>
                    {" "}
                    <i className="fa fa-chevron-right mr-2"></i>
                  </span>
                  How do I get this document
                </p>
                <UncontrolledCollapse toggler="#toggler1">
                  <div className="document-text">
                    Health damage can result in lifelong expensive treatments.
                    In order for a mistake not to ruin your life financially,
                    you need professional liability insurance. Almost every
                    insurance company has something like this on offer. Make
                    sure that it applies to "self-employed / freelancers" and
                    "outpatient and inpatient". Insurance policy / policy,
                    provisional cover letter is temporarily sufficient if the
                    insurance policy is replenished. One application is not
                    enough.
                  </div>
                </UncontrolledCollapse>
              </Col>
            </Row>
          </div>
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
                <h5>CV / Vita</h5>
                <p className="sub-title " id="toggler2">
                  <span>
                    {" "}
                    <i className="fa fa-chevron-right mr-2"></i>
                  </span>
                  How do I get this document
                </p>
                <UncontrolledCollapse toggler="#toggler2">
                  <div className="document-text">
                    You already created a resume with your last application.
                    Update it and send us a copy. The CV helps us to find the
                    right jobs for you.
                  </div>
                </UncontrolledCollapse>
              </Col>
            </Row>
          </div>
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
                <h5>User agreement (all 5 pages)</h5>
                <p className="sub-title " id="toggler3">
                  <span>
                    {" "}
                    <i className="fa fa-chevron-right mr-2"></i>
                  </span>
                  How do I get this document
                </p>
                <UncontrolledCollapse toggler="#toggler3">
                  <div className="document-text">
                    You already created a resume with your last application.
                    Update it and send us a copy. The CV helps us to find the
                    right jobs for you.
                  </div>
                </UncontrolledCollapse>
              </Col>
            </Row>
          </div>
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
                <h5>Criminal record certificate</h5>
                <p className="sub-title " id="toggler4">
                  <span>
                    {" "}
                    <i className="fa fa-chevron-right mr-2"></i>
                  </span>
                  How do I get this document
                </p>
                <UncontrolledCollapse toggler="#toggler4">
                  <div className="document-text">
                    You can get the police certificate of good conduct from your
                    nearest residents 'registration office, citizens' office or
                    registration office. You can send us a copy of the
                    application and then hand in the certificate of good
                    conduct. The certificate of good conduct must not be older
                    than 6 months (> 07/01/2019). Extended police clearance
                    certificate Clinics and institutions concerned with the care
                    of children are increasingly asking for an expanded police
                    clearance certificate. The sad reason for this was sexual
                    assault by medical professionals on underage patients.
                    Therefore, it can be an advantage if you apply for an
                    extended police clearance certificate .
                  </div>
                </UncontrolledCollapse>
              </Col>
            </Row>
          </div>
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
                <h5>Certificate / diploma / exam</h5>
                <p className="sub-title " id="toggler5">
                  <span>
                    {" "}
                    <i className="fa fa-chevron-right mr-2"></i>
                  </span>
                  How do I get this document
                </p>
                <UncontrolledCollapse toggler="#toggler5">
                  <div className="document-text">
                    Send us a copy of your exam and any additional
                    qualifications. Also enter your qualifications in the
                    profile so that you get attractive offers.
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
        </div> */}
      </>
    );
  }
}
export default DocumentsUpload;
