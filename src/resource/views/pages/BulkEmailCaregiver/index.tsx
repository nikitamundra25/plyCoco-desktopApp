import React, { FunctionComponent, useEffect, useState } from "react";
import { FormGroup, Label, Input, Col, Row, Table, Button } from "reactstrap";
import Select from "react-select";
import {
  languageTranslation,
  HtmlToDraftConverter,
  stripHtml
} from "../../../../helpers";
import {
  CareGiverQueries,
  EmailTemplateQueries
} from "../../../../graphql/queries";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { State, AppConfig } from "../../../../config";
import filter from "../../../assets/img/filter.svg";
import refresh from "../../../assets/img/refresh.svg";
import send from "../../../assets/img/send.svg";
import "./index.scss";
import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "../../containers/Loader/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  IReactSelectInterface,
  IEmailTemplateData,
  INewEmailAttachments,
  IEmailAttachmentData,
  IAddEmailVariables
} from "../../../../interfaces";
import { EmailEditorComponent } from "./EmailFormComponent";
import { ConfirmBox } from "../../components/ConfirmBox";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { BulkEmailCareGivers } from "../../../../graphql/Mutations";
import { toast } from "react-toastify";
import { CareGiverListComponent } from "./CareGiverListComponent";
import { IBulkEmailVariables } from "../../../../interfaces/BulkEmailCaregiver";
import { ApolloError } from "apollo-client";
import { errorFormatter } from "../../../../helpers/ErrorFormatter";
import { log } from "util";
const [, , , GET_CAREGIVER_EMAIL_TEMPLATES] = EmailTemplateQueries;
const [, , , , , , GET_CAREGIVERS_FOR_BULK_EMAIL] = CareGiverQueries;
const [BULK_EMAILS] = BulkEmailCareGivers;
let toastId: any = null;

const BulkEmailCaregiver: FunctionComponent = () => {
  let [selectedCareGiver, setselectedCareGiver] = useState<any>([]);
  // To get caregiver list from db
  const [
    fetchCareGiverList,
    { data: careGivers, called, loading, refetch }
  ] = useLazyQuery<any, any>(GET_CAREGIVERS_FOR_BULK_EMAIL, {
    fetchPolicy: "no-cache"
  });

  // To get all the types of email template
  // const { data: typeList } = useQuery(GET_EMAIL_TEMPLATE_TYEPS);
  //To get all email templates of care giver addded in system
  const { data, loading: fetchTemplateListLoading } = useQuery<any>(
    GET_CAREGIVER_EMAIL_TEMPLATES,
    {
      variables: {
        type: languageTranslation("CAREGIVER_EMAIL_TEMPLATE_TYPE")
      }
    }
  );

  const [page, setPage] = useState<number>(1);
  const [template, setTemplate] = useState<any>(undefined);
  const [subject, setSubject] = useState<string>("");
  const [body, setBody] = useState<any>("");
  const [attachments, setAttachments] = useState<IEmailAttachmentData[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [bulkEmails, { loading: bulkEmailLoading }] = useMutation<{
    bulkEmailsInput: IBulkEmailVariables;
  }>(BULK_EMAILS, {
    onCompleted() {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation("EMAIL_SENT_SUCCESS"));
      }
      setSubject("");
      setBody(undefined);
      setAttachments([]);
      setIsSubmit(false);
      setTemplate({ label: "", value: "" });
      setselectedCareGiver([]);
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
  });

  useEffect(() => {
    // Fetch list of caregivers
    fetchCareGiverList({
      variables: {
        searchBy: "",
        sortBy: 3,
        limit: 30,
        page,
        isActive: ""
      }
    });
  }, []);

  const [careGiverData, setcareGiverData] = useState<Object[]>([]);
  useEffect(() => {
    let list: any = [...careGiverData];
    if (careGivers) {
      const { getCaregivers } = careGivers;
      const { result } = getCaregivers;
      if (result && result.length) {
        result.map((key: any) => {
          return (list = [...list, key]);
        });
      }
      setcareGiverData(list);
    }
  }, [careGivers]);

  const handleInfiniteScroll = () => {
    setPage(page + 1);
    fetchCareGiverList({
      variables: {
        searchBy: "",
        sortBy: 3,
        limit: 30,
        page: page + 1,
        isActive: ""
      }
    });
  };

  const handleSelectAll = async () => {
    if (careGiverData && careGiverData.length) {
      let list: any = [];
      if (selectedCareGiver && selectedCareGiver.length <= 0) {
        careGiverData.map((key: any) => {
          return (list = [...list, parseInt(key.id)]);
        });
        setselectedCareGiver(list);
      } else {
        setselectedCareGiver([]);
      }
    }
  };

  const handleCheckElement = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { target } = e;
    const { checked } = target;

    if (checked) {
      setselectedCareGiver((selectedCareGiver: any) => [
        ...selectedCareGiver,
        parseInt(id)
      ]);
      return;
    } else {
      if (selectedCareGiver.indexOf(parseInt(id)) > -1) {
        selectedCareGiver.splice(selectedCareGiver.indexOf(parseInt(id)), 1);
        setselectedCareGiver([...selectedCareGiver]);
      }
    }
  };

  const templateOptions: IReactSelectInterface[] | undefined = [];
  if (data && data.getEmailtemplate) {
    const {
      getEmailtemplate: { email_templates }
    } = data;
    if (email_templates && email_templates.length) {
      email_templates.map(({ menuEntry, id }: IEmailTemplateData) => {
        templateOptions.push({
          label: menuEntry,
          value: id ? id.toString() : ""
        });
      });
    }
  }

  // useEffect(() => {
  //   if (!templateType) {
  //     // To set default email type
  //     setTemplateType(typeListOptions[0]);
  //   }
  // }, [typeListOptions]);

  // set subject & body on template selection
  const onTemplateSelection = (selectedOption: any) => {
    const {
      getEmailtemplate: { email_templates }
    } = data;
    setTemplate(selectedOption);
    const templateData = email_templates.filter(
      ({ id }: IEmailTemplateData) => id === parseInt(selectedOption.value)
    )[0];
    if (templateData) {
      const { subject, body, attachments } = templateData;
      const editorState = body ? HtmlToDraftConverter(body) : "";
      setSubject(subject);
      setBody(editorState);
      setAttachments(
        attachments
          ? attachments.map(
              ({ name, id, path, size }: INewEmailAttachments) => ({
                fileName: name,
                id,
                path,
                size
              })
            )
          : []
      );
    }
  };

  const onEditorStateChange = (editorState: any): void => {
    setBody(editorState);
  };

  const handleChangeSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const onDelteDocument = async (
    attachmentId: string,
    attachmentIndex?: number
  ) => {
    const { value } = await ConfirmBox({
      title: languageTranslation("CONFIRM_LABEL"),
      text: languageTranslation("CONFIRM_EMAIL_ATTACHMENT_REMOVE_MSG")
    });
    if (!value) {
      return;
    } else {
      setAttachments((prevArray: any) =>
        prevArray.filter((_: any, index: number) => attachmentIndex !== index)
      );
    }
  };

  const uploadDocument = (data: IEmailAttachmentData) => {
    setAttachments((prevArray: any) => [data, ...prevArray]);
  };

  const handleSendEmail = (e: React.FormEvent<any>) => {
    e.preventDefault();
    let content = body
      ? draftToHtml(convertToRaw(body.getCurrentContent()))
      : "";
    const result = stripHtml(content);
    setIsSubmit(true);

    try {
      let careGiverIdList: any = [];

      if (selectedCareGiver && selectedCareGiver.length) {
        selectedCareGiver.map((careGiverId: number) => {
          careGiverIdList = [...careGiverIdList, { userId: careGiverId }];
        });
        if (subject && body && result && result.length >= 2) {
          const bulkEmailsInput: IBulkEmailVariables = {
            to: "caregiver",
            from: "plycoco",
            subject: subject /* .replace(/AW:/g, '') */,
            body: body ? content : "",
            parentId: null,
            status: "new",
            attachments:
              attachments && attachments.length
                ? attachments.filter((attachment: any) => attachment.path)
                : [],
            // attachments.map(
            //   ({ path, fileName }: IEmailAttachmentData) => ({
            //     path,
            //     fileName
            //   })
            // ),
            files:
              attachments && attachments.length
                ? attachments
                    .map((item: IEmailAttachmentData) => item.file)
                    .filter((file: File | null) => file)
                : null,
            caregiver: careGiverIdList
          };
          bulkEmails({ variables: { bulkEmailsInput } });
        }
      } else {
        if (!toast.isActive(toastId)) {
          toastId = toast.error(
            languageTranslation("EMAIL_SELECT_CARE_GIVERS")
          );
        }
      }
    } catch (error) {
      const message = error.message
        .replace("SequelizeValidationError: ", "")
        .replace("Validation error: ", "")
        .replace("GraphQL error: ", "");
      toast.error(message);
    }
  };
  console.log("====================================");
  console.log(attachments);
  console.log("====================================");
  return (
    <>
      <div className="common-detail-page">
        <div className="common-detail-section">
          <div className="sticky-common-header">
            <div className="common-topheader d-flex align-items-center px-2 mb-1">
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={refresh} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("REFRESH")}
                </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={filter} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("ATTRIBUTES")}
                </span>
              </div>
              <div className="ml-auto">
                <Button
                  color="primary"
                  onClick={handleSendEmail}
                  className="btn-email-save ml-auto mr-2 btn btn-primary"
                >
                  {bulkEmailLoading ? (
                    <i className="fa fa-spinner fa-spin loader" />
                  ) : (
                    <i
                      className="fa fa-paper-plane mr-2"
                      aria-hidden="true"
                    ></i>
                  )}
                  <span>{languageTranslation("SEND")}</span>
                </Button>
              </div>
              {/* <div
                className="header-nav-item ml-auto"
                onClick={handleSendEmail}
              >
                <span className="header-nav-icon">
                  <img src={send} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("SEND")}
                </span>
              </div> */}
            </div>
          </div>

          <div className="common-content flex-grow-1">
            <div className="bulk-email-section">
              <Row>
                <CareGiverListComponent
                  careGivers={careGivers}
                  handleSelectAll={handleSelectAll}
                  called={called}
                  loading={loading}
                  careGiverData={careGiverData}
                  selectedCareGiver={selectedCareGiver}
                  handleCheckElement={handleCheckElement}
                  handleInfiniteScroll={handleInfiniteScroll}
                  page={page}
                />

                <EmailEditorComponent
                  body={body}
                  templateOptions={templateOptions}
                  subject={subject}
                  onTemplateSelection={onTemplateSelection}
                  onEditorStateChange={onEditorStateChange}
                  template={template}
                  handleChangeSubject={handleChangeSubject}
                  attachments={attachments}
                  uploadDocument={uploadDocument}
                  onDelteDocument={onDelteDocument}
                  isSubmit={isSubmit}
                />
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkEmailCaregiver;
