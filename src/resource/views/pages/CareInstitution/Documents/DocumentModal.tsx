import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form
} from "reactstrap";
import Select from "react-select";
import { languageTranslation } from "../../../../../helpers";
import { useDropzone } from "react-dropzone";
import png from "../../../../assets/img/png.svg";
import jpg from "../../../../assets/img/jpg.svg";
import pdf from "../../../../assets/img/pdf.svg";
import xls from "../../../../assets/img/xls.svg";
import close from "../../../../assets/img/cancel.svg";
import doc from "../../../../assets/img/doc.svg";
import ppt from "../../../../assets/img/ppt.svg";
import txt from "../../../../assets/img/txt.svg";
import defaultExtention from "../../../../assets/img/no-extension.svg";
import closehover from "../../../../assets/img/cancel-hover.svg";
import {
  AcceptedFileFormat,
  AcceptedDocumentFile
} from "../../../../../config";

const DocumentUploadModal = (props: any) => {
  const {
    documentIdUpdate,
    documentUrls,
    fileName,
    isMissingDocEditable,
    remarkValue,
    handleChange,
    documentType,
    setDocumentType,
    isSubmit,
    statusValue,
    handleSaveDocument,
    onDrop,
    show,
    handleClose,
    addDocumentLoading,
    updateDocumentLoading,
    documentTypeList,
    unsupportedFile,
    defaultDocument
  } = props;
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    accept: AcceptedFileFormat,
    multiple: false
  });
  const externalCloseBtn = (
    <button className="close modal-close" onClick={() => handleClose()}>
      <img src={close} alt="close" className="main-img" />
      <img src={closehover} alt="close" className="hover-img" />
    </button>
  );

  // To get file extension
  let splitName =
    documentUrls && documentUrls.name ? documentUrls.name.split(".") : [];
  const extention = splitName && splitName[1];

  return (
    <div>
      <Modal isOpen={show} className="common-modal" size="lg" centered>
        <ModalHeader close={externalCloseBtn}>
          {!documentIdUpdate
            ? languageTranslation("ADD_DOCUMENT")
            : languageTranslation("UPDATE_DOCUMENT")}
        </ModalHeader>
        <ModalBody>
          <div className="">
            <Form className="form-section ">
              <Row>
                <Col lg={"12"}>
                  <FormGroup>
                    <Row
                      className={`${
                        !documentIdUpdate || isMissingDocEditable
                          ? ""
                          : "align-items-center"
                      }`}
                    >
                      <Col sm="2">
                        <Label className="form-label col-form-label">
                          {!documentIdUpdate
                            ? languageTranslation("FILE")
                            : languageTranslation("FILE_NAME")}
                        </Label>
                      </Col>
                      {!documentIdUpdate || isMissingDocEditable ? (
                        <Col sm="10">
                          <div
                            {...getRootProps()}
                            className="dropzone-preview mb-3"
                          >
                            <input
                              {...getInputProps()}
                              className="dropzone-input-preview"
                            />
                            <div className="icon-upload">
                              {extention === null ? (
                                <i className="cui-cloud-upload"></i>
                              ) : extention === "jpg" ||
                                extention === "jpeg" ? (
                                <img src={jpg} alt="" className="mb-2" />
                              ) : extention === "png" ? (
                                <img src={png} alt="" className="mb-2" />
                              ) : extention === "pdf" ? (
                                <img src={pdf} alt="" className="mb-2" />
                              ) : extention === "xlsx" ? (
                                <img src={xls} alt="" className="mb-2" />
                              ) : extention === "doc" ? (
                                <img src={doc} alt="" className="mb-2" />
                              ) : extention === "ppt" ? (
                                <img src={ppt} alt="" className="mb-2" />
                              ) : extention === "txt" ? (
                                <img src={txt} alt="" className="mb-2" />
                              ) : (
                                <img
                                  src={defaultExtention}
                                  alt=""
                                  className="mb-2"
                                />
                              )}
                            </div>

                            {documentUrls ? (
                              <span className="document-name">
                                {documentUrls.name}
                              </span>
                            ) : (
                              <span>
                                {languageTranslation(
                                  "PERSONAL_DOCUMENTS_UPLOAD"
                                )}
                              </span>
                            )}
                          </div>
                          {unsupportedFile ? (
                            <div className='required-error'>
                              {unsupportedFile}
                            </div>
                          ) : isSubmit && documentUrls === null ? (
                            <div className='required-error'>
                              Document is required
                            </div>
                          ) : null}
                        </Col>
                      ) : (
                        <Col sm="10">
                          <div>
                            <Input
                              type="text"
                              name="filename"
                              value={fileName}
                              onChange={handleChange}
                              maxLength={100}
                              className={
                                isSubmit && !fileName
                                  ? "text-input error my-2 my-sm-0"
                                  : "text-input my-2 my-sm-0"
                              }
                            />
                            {isSubmit && !fileName ? (
                              <div className="required-tooltip">
                                File name is required
                              </div>
                            ) : null}
                          </div>
                        </Col>
                      )}
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"12"}>
                  <FormGroup>
                    <Row className="align-items-center">
                      <Col sm="2">
                        <Label className="form-label col-form-label">
                          {languageTranslation("TYPE")}
                        </Label>
                      </Col>
                      <Col sm="10">
                        <Select
                          name="type"
                          value={documentType}
                          options={documentTypeList ? documentTypeList : ""}
                          // placeholder={'Select type'}
                          onChange={(type: any) => {
                            console.log("type", type);
                            setDocumentType(type);
                          }}
                          classNamePrefix="custom-inner-reactselect"
                          className={"custom-reactselect"}
                          isDisabled={isMissingDocEditable || defaultDocument}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"12"}>
                  <FormGroup>
                    <Row>
                      <Col sm="2">
                        <Label className="form-label col-form-label">
                          {languageTranslation("REMARKS")}
                        </Label>
                      </Col>
                      <Col sm="10">
                        <div>
                          <Input
                            type="textarea"
                            // placeholder={languageTranslation('REMARKS')}
                            className="textarea-custom"
                            rows="4"
                            name={"remarks"}
                            value={remarkValue}
                            onChange={handleChange}
                            maxLength={255}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                {!documentIdUpdate || isMissingDocEditable ? (
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row className="align-items-center">
                        <Col sm="2">
                          <Label className="form-label col-form-label">
                            {languageTranslation("CHECKED")}
                          </Label>
                        </Col>
                        <Col sm="10">
                          <div className=" checkbox-custom mb-0">
                            <input
                              id="check"
                              type="checkbox"
                              name="check"
                              checked={statusValue}
                              onChange={handleChange}
                            />
                            <Label for="check">
                              ( {languageTranslation("DOCUMENT_STATUS_LABEL")} )
                            </Label>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                ) : (
                  ""
                )}
                {/* <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='2'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation("OPTIMIZE")}
                        </Label>
                      </Col>
                      <Col sm='10'>
                       
                          <div className=" checkbox-custom mb-0">
                          <input
                            type="checkbox"
                            id="check"
                            className=""
                            name={"employed"}
                          />
                          <Label for="check" className="pl-3">
                            ( {languageTranslation("DOCUMENT_OPTIMIZE_LABEL")} )
                          </Label>
                        </div>
                       
                      </Col>
                    </Row>
                  </FormGroup>
                </Col> */}
              </Row>
            </Form>
          </div>
        </ModalBody>
        <ModalFooter>
          {/* {isSubmit ? } */}
          <Button
            color="primary"
            onClick={() => {
              console.log("inside save");
              handleSaveDocument();
            }}
            disabled={addDocumentLoading || updateDocumentLoading}
          >
            {addDocumentLoading || updateDocumentLoading ? (
              <>
                <i className="fa fa-spinner fa-spin " />{" "}
                {languageTranslation("SAVE_BUTTON")}
              </>
            ) : (
              languageTranslation("SAVE_BUTTON")
            )}
          </Button>

          <Button color="secondary" onClick={handleClose}>
            {languageTranslation("CANCEL")}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DocumentUploadModal;
