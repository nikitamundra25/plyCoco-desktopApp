import React, { useCallback, useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  CustomInput
} from "reactstrap";
import Select from "react-select";
import { languageTranslation } from "../../../../../helpers";
import { DocumentTypes } from "../../../../../config";
import { useDropzone } from "react-dropzone";
import {
  IDocumentUrls,
  IDocumentSubmitValues
} from "../../../../../interfaces";
import moment from "moment";
import { DocumentMutations } from "../../../../../graphql/Mutations";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import png from "../../../../assets/img/png.svg";
import jpg from "../../../../assets/img/jpg.svg";
import pdf from "../../../../assets/img/pdf.svg";
import close from "../../../../assets/img/cancel.svg";
import closehover from "../../../../assets/img/cancel-hover.svg";

const [ADD_DOCUMENT] = DocumentMutations;
let toastId: any = "";

const DocumentUploadModal = (props: any) => {
  const path = useLocation();
  // useEffect(() => {
  //   const queryPath = path.pathname;
  //   const res = queryPath.split('/');
  //   const id = parseInt(res[3]);
  // }, []);
  const [addDocument] = useMutation<any>(ADD_DOCUMENT, {
    onCompleted({ addDocument }) {
      if (!toast.isActive(toastId)) {
        toastId = toast.success("DOCUMENT_ADDED_SUCCESS");
      }
    }
  });
  const [documentUrls, setDocumentUrl] = useState<IDocumentUrls | null>(null);
  const { show, handleClose } = props;
  const onDrop = useCallback((acceptedFiles: File[]) => {
    let temp: any = documentUrls ? documentUrls : {};
    acceptedFiles.forEach((file: File) => {
      console.log(file, "file details");
      if (file) {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onloadend = () => {
          if (reader.result) {
            temp = {
              path: reader.result,
              name: file.name,
              date: moment().format("DD.MM.YYYY")
            };
            setDocumentUrl(temp);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);
  console.log("documentUrls", documentUrls);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false
  });

  const handleSaveDocument = () => {
    const queryPath = path.pathname;
    const res = queryPath.split("/");
    const id = parseInt(res[3]);
    console.log(id, "id");

    if (id) {
      addDocument({
        variables: {
          documentInput: {
            userId: id ? id : "",
            document: documentUrls ? documentUrls : null
          }
        }
      });
    }
  };
  console.log("documentUrls", documentUrls);
  const externalCloseBtn = (
    <button className="close modal-close" onClick={() => handleClose()}>
      <img src={close} alt="close" className="main-img" />
      <img src={closehover} alt="close" className="hover-img" />
    </button>
  );
  return (
    <div>
      <Modal isOpen={show} className="reminder-modal" size="lg" centered>
        <ModalHeader close={externalCloseBtn}>
          {languageTranslation("ADD_DOCUMENT")}
        </ModalHeader>
        <ModalBody>
          <div className="">
            <Form className="form-section forms-main-section">
              <Row>
                <Col lg={"12"}>
                  <FormGroup>
                    <Row>
                      <Col sm="2">
                        <Label className="form-label col-form-label">
                          {languageTranslation("FILE")}
                        </Label>
                      </Col>
                      <Col sm="10">
                        <div
                          {...getRootProps()}
                          className="dropzone-preview mb-0"
                        >
                          <input
                            {...getInputProps()}
                            className="dropzone-input-preview"
                          />
                          {console.log("documentUrls", documentUrls)}
                          <div className="icon-upload">
                            <i className="cui-cloud-upload"></i>
                            <img src={png} alt="" className="mb-2" />
                            <img src={jpg} alt="" className="mb-2" />
                            <img src={pdf} alt="" className="mb-2" />
                          </div>
                          <span>
                            {documentUrls
                              ? documentUrls.name
                              : "Drag 'n' drop files here, or click here to upload files"}
                          </span>
                        </div>

                        {/* {documentUrls ? documentUrls.name : null} */}
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"12"}>
                  <FormGroup>
                    <Row>
                      <Col sm="2">
                        <Label className="form-label col-form-label">
                          {languageTranslation("TYPE")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="10">
                        <Select
                          options={DocumentTypes}
                          placeholder={"Select type"}
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
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="10">
                        <div>
                          <Input
                            type="textarea"
                            name={"remarks"}
                            placeholder={languageTranslation("REMARKS")}
                            className="textarea-custom"
                            rows="4"
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"12"}>
                  <FormGroup>
                    <Row>
                      <Col sm="2">
                        <Label className="form-label col-form-label">
                          {languageTranslation("CHECKED")}
                        </Label>
                      </Col>
                      <Col sm="10">
                        <div className=" checkbox-custom mb-0">
                          <input
                            type="checkbox"
                            id="check"
                            className=""
                            name={"employed"}
                          />
                          <Label for="check" className="pl-3">
                            ( {languageTranslation("DOCUMENT_STATUS_LABEL")} )
                          </Label>
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"12"}>
                  <FormGroup>
                    <Row>
                      <Col sm="2">
                        <Label className="form-label col-form-label">
                          {languageTranslation("OPTIMIZE")}
                        </Label>
                      </Col>
                      <Col sm="10">
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
                </Col>
              </Row>
            </Form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveDocument}>
            {languageTranslation("SAVE_BUTTON")}
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
