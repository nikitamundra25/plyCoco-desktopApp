import React, { FunctionComponent, useState } from "react";
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  Table,
  UncontrolledTooltip
} from "reactstrap";
import moment from "moment";
import Dropzone from "react-dropzone";
import Select from "react-select";
import {
  languageTranslation,
  logger,
  formatFileSize,
  errorFormatter
} from "../../../../helpers";
import {
  State,
  AcceptedDocumentFile,
  maxFileSize10MB,
  DocumentTempSelect
} from "../../../../config";
import {
  IWorkingProofFormValues,
  IDocumentInputInterface
} from "../../../../interfaces";
import displaydoc from "../../../assets/img/display-doc.svg";
import upload from "../../../assets/img/upload.svg";
import locked_caregiver from "../../../assets/img/block-caregiver.svg";
import hideoldfile from "../../../assets/img/hide-old-file.svg";
import hidemapped from "../../../assets/img/block-file.svg";
import "./index.scss";
import { FormikProps } from "formik";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import {
  DocumentUploadMutations,
  DocumentMutations
} from "../../../../graphql/Mutations";

import { toast } from "react-toastify";
import DocumentPreview from "./DocumentPreview";
import Loader from "../../containers/Loader/Loader";
const [ADD_DOCUMENT] = DocumentUploadMutations;
const [, , , , , , , , , GET_DOCUMENTS_FROM_OUTLOOK] = DocumentMutations;

let toastId: any;

const WorkingProofForm: FunctionComponent<FormikProps<IWorkingProofFormValues> &
  any> = (props: FormikProps<IWorkingProofFormValues> & any) => {
  const {
    documentList,
    refetch,
    onDelete,
    imageUrls,
    setImageUrl,
    documentUrls,
    setDocumentUrl,
    rowIndex,
    setRowIndex,
    documentType,
    setdocumentType
  } = props;

  const handleSelect = (value: any) => {
    setdocumentType(value);
  };
  // Mutation to upload document
  const [addUserDocuments] = useMutation<
    { addUserDocuments: IWorkingProofFormValues },
    { documentInput: IDocumentInputInterface }
  >(ADD_DOCUMENT);

  const [loading, setLoading] = useState<boolean>(false);
  const [
    getWorkProofFromOutlookQuery,
    { data, loading: fetchingLWorkProof, error: outlookError }
  ] = useMutation<
    {
      getWorkProofFromOutlookQuery: any;
    },
    any
  >(GET_DOCUMENTS_FROM_OUTLOOK);
  const handleUpload = async (file: any) => {
    try {
      if (file.length > 0) {
        file = file[0];
        setLoading(true);

        let documentInput: any = {
          isDocumentTemplate: true,
          documentUploadType:
            documentType && documentType.value ? documentType.value : "",
          document: file
        };

        await addUserDocuments({
          variables: {
            documentInput
          }
        });
        if (!toast.isActive(toastId)) {
          toast.dismiss();
          toast.success(languageTranslation("DOCUMENT_UPLOAD_SUCCESS"));
        }
        setLoading(false);
        refetch();
      } else {
        return;
      }
    } catch (error) {
      const message = error.message
        .replace("SequelizeValidationError: ", "")
        .replace("Validation error: ", "")
        .replace("GraphQL error: ", "");
      toast.dismiss();
      toast.error(message);
      logger(error);
      setLoading(false);
    }
  };

  const handlePreview = async (document: string, index: number) => {
    setRowIndex(index);
    let sampleFileUrl = "";
    if (process.env.NODE_ENV === "production") {
      sampleFileUrl = document;
    } else {
      sampleFileUrl = process.env.REACT_APP_FILES_ENDPOINT + document;
    }
    if (document.split(".").pop() === "pdf") {
      setDocumentUrl(sampleFileUrl);
      setImageUrl("");
    } else {
      setImageUrl(sampleFileUrl);
      setDocumentUrl("");
    }
  };
  /**
   *
   * @param e
   */
  const getWorkProofFromOutlook = async (e: any): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      await getWorkProofFromOutlookQuery({
        variables: {
          documentType:
            documentType && documentType.value ? documentType.value : ""
        }
      });
      if (!toast.isActive(toastId)) {
        toast.dismiss();
        toast.success(languageTranslation("DOCUEMENT_FETCHED_SUCCESS"));
      }
      refetch();
    } catch (error) {
      const message = errorFormatter(error.message);
      toast.dismiss();
      toast.error(message);
      logger(error);
    }
    setLoading(false);
  };
  return (
    <>
      <div className="common-detail-page">
        <div className="common-detail-section">
          <div className="sticky-common-header">
            <div className="common-topheader d-flex align-items-center px-2 mb-1">
              <div
                className="header-nav-item"
                onClick={getWorkProofFromOutlook}
              >
                <span className="header-nav-icon">
                  <img src={upload} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("RETRIVE_WORK_PROOF")}
                </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={displaydoc} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("DISPLAY_DIFFRENT_HEADER")}
                </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={hidemapped} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("HIDE_MAPPED_HEADER")}
                </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={locked_caregiver} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("HIDE_LOCKED_CAREGIVER_HEADER")}
                </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={hideoldfile} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("HIDE_OLD_FILES_HEADER")}
                </span>
              </div>
            </div>
          </div>
          <div className="common-content flex-grow-1">
            <div>
              <Form className="form-section ">
                <Row>
                  <Col lg={"4"}>
                    <div>
                      <div className="align-items-center d-flex justify-content-between">
                        <h5 className="content-title">
                          {languageTranslation("MENU_DOCUMENT_UPLOADS")}
                        </h5>
                        {/* <div className="user-select">
                          <Select
                            placeholder="Select Type"
                            options={DocumentTempSelect}
                            value={documentType}
                            onChange={(value: any) => {
                              handleSelect(value);
                              setRowIndex(-1);
                              setImageUrl("");
                              setDocumentUrl("");
                            }}
                            classNamePrefix="custom-inner-reactselect"
                            className={"custom-reactselect"}
                          />
                        </div> */}
                      </div>

                      <div className="working-height">
                        <div className="form-section pt-2 px-3">
                          <FormGroup>
                            <Row className="align-items-center">
                              <Col sm="4">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("DOCUMENT_TYPE_LABEL")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div>
                                  <Select
                                    placeholder="Select Type"
                                    options={DocumentTempSelect}
                                    value={documentType}
                                    onChange={(value: any) => {
                                      handleSelect(value);
                                      setRowIndex(-1);
                                      setImageUrl("");
                                      setDocumentUrl("");
                                    }}
                                    classNamePrefix="custom-inner-reactselect"
                                    className={"custom-reactselect"}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>

                          {loading ? (
                            <div>
                              <Loader />
                            </div>
                          ) : null}
                          <Dropzone
                            onDrop={acceptedFiles => {
                              handleUpload(acceptedFiles);
                            }}
                            maxSize={maxFileSize10MB}
                            accept={AcceptedDocumentFile.join()}
                            multiple={false}
                          >
                            {({
                              getRootProps,
                              getInputProps,
                              isDragActive,
                              isDragReject,
                              rejectedFiles
                            }) => {
                              let isValidFile = true;
                              if (rejectedFiles.length > 0) {
                                isValidFile = AcceptedDocumentFile.includes(
                                  rejectedFiles[0].type
                                );
                              }
                              const isFileTooLarge =
                                rejectedFiles.length > 0 &&
                                rejectedFiles[0].size > maxFileSize10MB;

                              return (
                                <section>
                                  <div
                                    {...getRootProps()}
                                    className="dropzone-preview"
                                  >
                                    <input
                                      {...getInputProps()}
                                      className="dropzone-input-preview"
                                    />
                                    <div className="icon-upload">
                                      <i className="cui-cloud-upload"></i>
                                    </div>
                                    <span>
                                      {!isDragActive &&
                                        languageTranslation(
                                          "PERSONAL_DOCUMENTS_UPLOAD"
                                        )}
                                    </span>
                                    {isDragActive &&
                                      !isDragReject &&
                                      languageTranslation(
                                        "PERSONAL_DOCUMENTS_DROP_HERE"
                                      )}
                                    {isDragReject || !isValidFile ? (
                                      <>
                                        {(isDragReject || !isValidFile) && (
                                          <div className="text-danger mt-2">
                                            {languageTranslation(
                                              "VALIDATE_DOCUMENT_TYPE"
                                            )}
                                          </div>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {isFileTooLarge && (
                                          <div className="text-danger mt-2">
                                            {languageTranslation(
                                              "VALIDATE_DOCUMENT_SIZE_MAX_10MB"
                                            )}
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </section>
                              );
                            }}
                          </Dropzone>
                        </div>
                        <div className="workingproof-list custom-scrollbar position-relative">
                          <div className="archieve-table-minheight ">
                            <Table bordered hover responsive className="mb-0">
                              <thead className="thead-bg thead-sticky">
                                <tr>
                                  <th className="date-column">
                                    {languageTranslation("DATE")}
                                  </th>
                                  <th className="file-col">
                                    {languageTranslation("FILE_NAME")}
                                  </th>
                                  <th className="filesize-th-column">
                                    {languageTranslation("FILE_SIZE")}
                                  </th>
                                  <th className={"text-center"}>
                                    {languageTranslation(
                                      "TABEL_HEAD_CG_ACTION"
                                    )}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {!props.loadingData ? (
                                  documentList.length > 0 ? (
                                    documentList.map(
                                      (item: any, index: number) => {
                                        return (
                                          <tr
                                            key={index}
                                            className={
                                              rowIndex === index ? "active" : ""
                                            }
                                          >
                                            <td className="date-column ">
                                              {moment(item.createdAt).format(
                                                "DD.MM.YYYY"
                                              )}{" "}
                                            </td>
                                            <td
                                              className="file-col cursor-pointer"
                                              onClick={() => {
                                                handlePreview(
                                                  item.document,
                                                  index
                                                );
                                              }}
                                            >
                                              <div className="view-more-link word-wrap">
                                                {item.fileName}
                                              </div>
                                            </td>
                                            <td>
                                              {formatFileSize(item.fileSize)}
                                            </td>
                                            <td>
                                              <div className={"action-btn"}>
                                                <span
                                                  id={`delete${index}`}
                                                  className={"btn-icon mr-2"}
                                                  onClick={() => {
                                                    onDelete(item.id);
                                                  }}
                                                >
                                                  {item.status === "approve" ? (
                                                    ""
                                                  ) : (
                                                    <UncontrolledTooltip
                                                      placement={"top"}
                                                      target={`delete${index}`}
                                                    >
                                                      {languageTranslation(
                                                        "DOCUMENT_DELETE"
                                                      )}
                                                    </UncontrolledTooltip>
                                                  )}
                                                  <i className="fa fa-trash"></i>
                                                </span>
                                              </div>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )
                                  ) : null
                                ) : (
                                  <tr>
                                    <td className={"table-loader"} colSpan={4}>
                                      <Loader />
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={"4"} className="px-lg-0">
                    <DocumentPreview
                      documentUrls={documentUrls}
                      imageUrls={imageUrls}
                    />
                  </Col>
                  <Col lg={"4"}>
                    <div>
                      <h5 className="content-title">
                        {languageTranslation("PERFORMED_WORK_HEADING")}
                      </h5>
                      <div className="working-height">
                        <div className="document-form py-2 px-3">
                          <Row>
                            <Col lg={"12"}>
                              <FormGroup>
                                <Row className="align-items-center">
                                  <Col sm="4">
                                    <Label className="form-label col-form-label">
                                      {languageTranslation("ID")}
                                    </Label>
                                  </Col>
                                  <Col sm="8">
                                    <div>
                                      <Input
                                        type="text"
                                        name={"lastName"}
                                        placeholder={languageTranslation("ID")}
                                        className="width-common"
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                            <Col lg={"12"}>
                              <FormGroup>
                                <Row className="align-items-center">
                                  <Col sm="4">
                                    <Label className="form-label col-form-label">
                                      {languageTranslation("MENU_CAREGIVER")}
                                    </Label>
                                  </Col>
                                  <Col sm="8">
                                    <div>
                                      <Select
                                        placeholder={languageTranslation("SELECT_CAREGIVER")}
                                        options={State}
                                        classNamePrefix="custom-inner-reactselect"
                                        className={"custom-reactselect"}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                        <Table bordered hover responsive>
                          <thead className="thead-bg">
                            <tr>
                              <td>Begin</td>
                              <td>Facility</td>
                              <td>Department</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className=" checkbox-custom  mr-2">
                                    <input
                                      type="checkbox"
                                      id="checkAll"
                                      className=""
                                    />
                                    <label className=""></label>
                                  </span>
                                  <div>20.08.2019</div>
                                </div>
                              </td>
                              <td>Nursing</td>
                              <td>central department</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className=" checkbox-custom  mr-2">
                                    <input
                                      type="checkbox"
                                      id="checkAll"
                                      className=""
                                    />
                                    <label className=""></label>
                                  </span>
                                  <div>20.08.2019</div>
                                </div>
                              </td>
                              <td>Nursing</td>
                              <td>central department</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className=" checkbox-custom  mr-2">
                                    <input
                                      type="checkbox"
                                      id="checkAll"
                                      className=""
                                    />
                                    <label className=""></label>
                                  </span>
                                  <div>20.08.2019</div>
                                </div>
                              </td>
                              <td>Nursing</td>
                              <td>central department</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className=" checkbox-custom  mr-2">
                                    <input
                                      type="checkbox"
                                      id="checkAll"
                                      className=""
                                    />
                                    <label className=""></label>
                                  </span>
                                  <div>20.08.2019</div>
                                </div>
                              </td>
                              <td>Nursing</td>
                              <td>central department</td>
                            </tr>
                          </tbody>
                        </Table>
                        <div className="d-flex align-items-center justify-content-center  py-3 document-preview">
                          <span>Above data is static</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkingProofForm;
