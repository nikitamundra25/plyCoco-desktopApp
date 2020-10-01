import React, { FunctionComponent, useState, useEffect } from "react";
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  Table,
  UncontrolledTooltip,
  Button,
} from "reactstrap";
import moment from "moment";
import Dropzone from "react-dropzone";
import Select from "react-select";
import {
  languageTranslation,
  logger,
  formatFileSize,
  errorFormatter,
} from "../../../../helpers";
import {
  State,
  AcceptedDocumentFile,
  maxFileSize10MB,
  DocumentTempSelect,
} from "../../../../config";
import {
  IWorkingProofFormValues,
  IDocumentInputInterface,
  IReactSelectInterface,
  IQualifications,
} from "../../../../interfaces";
import displaydoc from "../../../assets/img/display-doc.svg";
import upload from "../../../assets/img/upload.svg";
// import locked_caregiver from "../../../assets/img/block-caregiver.svg";
import hideoldfile from "../../../assets/img/hide-old-file.svg";
// import hidemapped from "../../../assets/img/block-file.svg";
import delete_icon from "../../../assets/img/clear.svg";
import turn_left from "../../../assets/img/turn_left.svg";
import turn_right from "../../../assets/img/turn_right.svg";
import turn_180 from "../../../assets/img/turn_180.svg";
import "./index.scss";
import { FormikProps } from "formik";
import { useMutation, useLazyQuery, useQuery } from "@apollo/react-hooks";
import {
  DocumentUploadMutations,
  DocumentMutations,
  AppointmentMutations,
} from "../../../../graphql/Mutations";

import { toast } from "react-toastify";
import DocumentPreview from "./DocumentPreview";
import Loader from "../../containers/Loader/Loader";
import PerformedWork from "./PerformedWork";
import {
  AppointmentsQueries,
  GET_QUALIFICATION_ATTRIBUTE,
} from "../../../../graphql/queries";
import DisplayDifferentModal from "./DisplayDifferentModal";
const [ADD_DOCUMENT] = DocumentUploadMutations;
const [, , , , , , , , , GET_DOCUMENTS_FROM_OUTLOOK] = DocumentMutations;
const [, , , , , , , , MAP_WORKPROOF_WITH_APPOINTMENT] = AppointmentMutations;
const [
  ,
  ,
  ,
  ,
  ,
  GET_APPOINTMENT_DETAILS_BY_USERID,
  GET_APPOINTMENT_DETAILS_BY_ID,
] = AppointmentsQueries;
let toastId: any;

const WorkingProofForm: FunctionComponent<
  FormikProps<IWorkingProofFormValues> & any
> = (props: FormikProps<IWorkingProofFormValues> & any) => {
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
    setdocumentType,
  } = props;

  const handleSelect = (value: any) => {
    setdocumentType(value);
  };
  // qualifications list
  const { data: qualificationList } = useQuery<IQualifications>(
    GET_QUALIFICATION_ATTRIBUTE
  );
  // Mutation to upload document
  const [addUserDocuments] = useMutation<
    { addUserDocuments: IWorkingProofFormValues },
    { documentInput: IDocumentInputInterface }
  >(ADD_DOCUMENT);

  // To fetch appointment list by caregiver Id GET_APPOINTMENT_DETAILS_BY_ID
  const [
    getDataByCaregiverUserId,
    { data: caregiverData, loading: caregiverDataLoading },
  ] = useLazyQuery<any, any>(GET_APPOINTMENT_DETAILS_BY_USERID, {
    fetchPolicy: "no-cache",
    // notifyOnNetworkStatusChange: true
  });

  // To fetch appointment list by caregiver Id
  const [
    getAppointmentDataById,
    { data: appointmentDataById, loading: appointmentIdLoading },
  ] = useLazyQuery<any, any>(GET_APPOINTMENT_DETAILS_BY_ID, {
    fetchPolicy: "no-cache",
    // notifyOnNetworkStatusChange: true
  });

  // Mutation to upload document
  const [
    mapDocumentsWithAppointment,
    { loading: mapWorkproofLoading },
  ] = useMutation<
    { Appointment: any },
    { appointmentId: number | null; workProofId: number | null }
  >(MAP_WORKPROOF_WITH_APPOINTMENT, {
    onCompleted() {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation("MAP_WORKPROOF_SUCCESSFULLY")
        );
      }
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [documentSelectionId, setdocumentSelectionId] = useState<any>({});
  const [showModal, setshowModal] = useState<boolean>(false);

  // State for performed work section filter
  const [searchById, setsearchById] = useState<string>("");
  const [caregiverFilter, setcaregiverFilter] = useState<
    IReactSelectInterface | undefined
  >(undefined);
  const [appointmentData, setappointmentData] = useState<any>([]);
  const [checkboxMark, setcheckboxMark] = useState<any>([]);
  const [currentAngel, setcurrentAngel] = useState<number>(0);
  const [
    getWorkProofFromOutlookQuery,
    { data, loading: fetchingLWorkProof, error: outlookError },
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
          document: file,
        };

        await addUserDocuments({
          variables: {
            documentInput,
          },
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

  const handlePreview = async (
    document: string,
    index: number,
    id: string,
    item: any
  ) => {
    setcurrentAngel(0)
    setRowIndex(index);
    setdocumentSelectionId(item);
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
            documentType && documentType.value ? documentType.value : "",
        },
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

  // Call when select caregiver in performed work section
  useEffect(() => {
    if (caregiverFilter && caregiverFilter.value) {
      getDataByCaregiverUserId({
        variables: {
          userId:
            caregiverFilter && caregiverFilter.value
              ? parseInt(caregiverFilter.value)
              : null,
        },
      });
    }
  }, [caregiverFilter]);

  useEffect(() => {
    if (appointmentDataById && appointmentDataById.getAppointmentDetailsById) {
      setappointmentData([appointmentDataById.getAppointmentDetailsById]);
    }
  }, [appointmentDataById]);

  useEffect(() => {
    if (
      caregiverData &&
      caregiverData.getAppointmentDetailsByUserId &&
      caregiverData.getAppointmentDetailsByUserId.length
    ) {
      setappointmentData(caregiverData.getAppointmentDetailsByUserId);
    }
  }, [caregiverData]);

  const handleChange = (e: any, name: string) => {
    if (name === "id") {
      setsearchById(e.target.value);
      setcaregiverFilter(undefined);
    } else {
      setcaregiverFilter(e);
      setsearchById("");
    }
  };

  const onFilterById = (value: any) => {
    if (value) {
      getAppointmentDataById({
        variables: {
          id: searchById ? parseInt(searchById) : null,
        },
      });
    }
  };

  const handleSelectCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { target } = e;
    const { checked } = target;
    if (checked) {
      setcheckboxMark((selectedCareGiver: any) => [
        ...selectedCareGiver,
        parseInt(id),
      ]);
    } else {
      if (checkboxMark.indexOf(parseInt(id)) > -1) {
        checkboxMark.splice(checkboxMark.indexOf(parseInt(id)), 1);
        setcheckboxMark([...checkboxMark]);
      }
    }
  };

  const handleLinkDocument = async () => {
    const id = documentSelectionId ? documentSelectionId.id : null;
    try {
      await mapDocumentsWithAppointment({
        variables: {
          appointmentId: checkboxMark,
          workProofId: id,
        },
      });
    } catch (error) {
      const message = errorFormatter(error.message);
      if (!toast.isActive(toastId)) {
        toast.dismiss();
        toast.error(languageTranslation("SOMETHING_WENT_WRONG_"));
      }
      logger(error);
    }
  };

  const onhandleDisplayDifferent = async () => {
    if (documentSelectionId && documentSelectionId.id) {
      setshowModal(true);
    } else {
      toast.warn(languageTranslation("SELECT_DOCUMENT"));
    }
  };

  const onRotateFile = (name:string) => {
    let angle:number = currentAngel
    if(name==="turnLeft"){
        angle = currentAngel + 90
    }else if(name==="turnRight"){
      angle = currentAngel + (-90)

    }else if(name==="turn180"){
      angle = currentAngel + 180

    }
    console.log("angle",angle);
    setcurrentAngel(angle)
  }

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
              <div
                className="header-nav-item"
                onClick={() => onhandleDisplayDifferent()}
              >
                <span className="header-nav-icon">
                  <img src={displaydoc} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("DISPLAY_DIFFRENT_HEADER")}
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
              <div className="header-nav-item" 
                onClick={() => onRotateFile("turnLeft")}
              
              >
                <span className="header-nav-icon">
                  <img src={turn_left} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("TURN_LEFT")}
                </span>
              </div>
              <div className="header-nav-item"
             onClick={() => onRotateFile("turn180")}
              >
                <span className="header-nav-icon">
                  <img src={turn_180} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("TURN_180")}
                </span>
              </div>
              <div className="header-nav-item"
               onClick={() => onRotateFile("turnRight")}
              >
                <span className="header-nav-icon">
                  <img src={turn_right} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("TURN_RIGHT")}
                </span>
              </div>

              <div className="header-nav-item">
                <span className="header-nav-icon pr-0">
                  <img src={delete_icon} alt="" />
                </span>
              </div>
              <div className="ml-auto">
                <Button
                  color="primary"
                  onClick={handleLinkDocument}
                  className="btn-email-save ml-auto mr-2 btn btn-primary"
                  disabled={mapWorkproofLoading}
                >
                  {mapWorkproofLoading ? (
                    <i className="fa fa-spinner fa-spin mr-2" />
                  ) : (
                    ""
                  )}
                  <span>{languageTranslation("SUBMIT")}</span>
                </Button>
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
                            onDrop={(acceptedFiles) => {
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
                              rejectedFiles,
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
                                                  index,
                                                  item.id,
                                                  item
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
                      currentAngel={currentAngel}
                    />
                  </Col>
                  <Col lg={"4"}>
                    <PerformedWork
                      handleChange={handleChange}
                      appointmentList={
                        appointmentData && appointmentData.length
                          ? appointmentData
                          : []
                      }
                      caregiverDataLoading={
                        caregiverDataLoading
                          ? caregiverDataLoading
                          : appointmentIdLoading
                      }
                      qualificationList={
                        qualificationList &&
                        qualificationList.getQualifications &&
                        qualificationList.getQualifications.length
                          ? qualificationList.getQualifications
                          : []
                      }
                      onFilterById={onFilterById}
                      handleSelect={handleSelectCheckbox}
                      checkboxMark={checkboxMark}
                      caregiverFilter={caregiverFilter}
                    />
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <DisplayDifferentModal
        show={showModal}
        handleClose={() => setshowModal(false)}
        documentUrls={documentUrls}
        imageUrls={imageUrls}
        documentSelectionId={documentSelectionId}
      />
    </>
  );
};

export default WorkingProofForm;
