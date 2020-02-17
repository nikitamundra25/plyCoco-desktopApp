import React, { FunctionComponent, useState, useEffect } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";
import { Col, Row, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Select from "react-select";
import { useParams } from "react-router";
import draftToHtml from "draftjs-to-html";
import { convertToRaw, ContentState, EditorState } from "draft-js";
import { toast } from "react-toastify";
import { ApolloError } from "apollo-client";
import htmlToDraft from "html-to-draftjs";
import {
  languageTranslation,
  HtmlToDraftConverter,
  logger,
  stripHtml
} from "../../../../../helpers";
import {
  EmailTemplateQueries,
  ProfileQueries
} from "../../../../../graphql/queries";
import {
  IReactSelectInterface,
  IAddEmailVariables,
  IEmailTemplateData,
  INewEmailProps,
  IEmailAttachmentData,
  INewEmailAttachments
} from "../../../../../interfaces";
import { EmailFormComponent } from "./EmailFormComponent";
import { CareGiverMutations } from "../../../../../graphql/Mutations";
import { AttachmentList } from "../../../components/Attachments";
import { ConfirmBox } from "../../../components/ConfirmBox";
import { errorFormatter } from "../../../../../helpers/ErrorFormatter";
import { AppConfig, client } from "../../../../../config";
import logo from "../../../../assets/img/plycoco-orange.png";

const [, , , GET_CAREGIVER_EMAIL_TEMPLATES] = EmailTemplateQueries;
const [, , , , , , NEW_EMAIL] = CareGiverMutations;
const [VIEW_PROFILE] = ProfileQueries;

let toastId: any = null;

const NewEmail: FunctionComponent<INewEmailProps> = ({
  emailData,
  selectedUserName,
  userRole
}: INewEmailProps) => {
  const userData: any = client.readQuery({
    query: VIEW_PROFILE
  });

  const { viewAdminProfile }: any = userData ? userData : {};
  const { firstName = "", lastName = "" } = viewAdminProfile
    ? viewAdminProfile
    : {};

  let { id } = useParams();
  const [subject, setSubject] = useState<string>("");
  const [body, setBody] = useState<any>("");
  const [parentId, setParentId] = useState<number | null>(null);
  const [template, setTemplate] = useState<any>(undefined);
  const [contact, setContact] = useState<any>(undefined);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<IEmailAttachmentData[]>([]);
  //To get all email templates of care giver addded in system
  const { data, loading: fetchTemplateListLoading } = useQuery<any>(
    GET_CAREGIVER_EMAIL_TEMPLATES,
    {
      variables: {
        type: languageTranslation("CAREGIVER_EMAIL_TEMPLATE_TYPE")
      }
    }
  );

  //To get contact list by id
  //  const [
  //   fetchContactListById,
  //   { data: contactList, loading: contactListLoading }
  // ] = useLazyQuery<any>(GET_CONTACT_LIST_BY_ID);

  const [addNewEmail, { loading: adding }] = useMutation<
    {
      addNewEmail: any;
    },
    {
      emailInput: IAddEmailVariables;
    }
  >(NEW_EMAIL, {
    onCompleted() {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation("EMAIL_SENT_SUCCESS"));
      }
      setSubject("");
      setBody(undefined);
      setAttachments([]);
      setParentId(null);
      setIsSubmit(false);
      setTemplate({ label: "", value: "" });
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
  });

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

  const setDefaultSignature = (body: any) => {
    const contentBlock = htmlToDraft(
      `<div><p style="font-size:16px; padding:12px 0px;">Hello ${selectedUserName}</p>${body}<p style="font-size:14px; margin:0px 0px;">${languageTranslation(
        "BEST_WISHES"
      )}</p><p style="font-size:14px; margin:0px 0px;">${firstName} ${lastName}</p><div><div style="text-align:left;"><a href="https://www.plycoco.de/"><img src=${logo} alt="" style="height: auto; width: 180px;"/></a></div><p style="padding:2px 0px;"><strong>Tel:</strong><a href="tel:+49-30-377 07 67 20" style="color: #000; text-decoration: none;"> +49-30-377 07 67 20</a></p><p style="padding:2px 0px;"><strong>Fax:</strong> <a href="fax:+49-30-377 07 67 21" style="color: #000; text-decoration: none;">+49-30-377 07 67 21</a></p><p style="padding:2px 0px;"><strong>E-Mail:</strong><a href="#" style="color: #000; text-decoration: none;"> kontakt@solona.de</a></p><p style="padding:2px 0px;"><a href="www.solona.de" style="color: #000; text-decoration: none;">www.solona.de</a></p></div><div style="padding:20px 0px"><p style="padding: 2px 0px;font-size: 13px;color: #b5b4b4;;">Solona Personal list ein der Essenz Personal Agency GmbH, Weststr, 1, 13405 Berlin, Deutschland</p><p style="padding: 2px 0px;font-size: 13px;color: #b5b4b4;;">Eintragung im Handelsrigester; Registergericht Berlin-Charlottenburg, Registernumber:HRB 188828 B, Geschaftsfuhrer: Michael Krusch</p><p style="padding: 2px 0px;font-size: 13px;color: #b5b4b4;;">Tel: +49-30-577 07 67 20 Fax: +49-30-577 07 67 21 </p><p style="padding: 2px 0px;font-size: 13px;color: #b5b4b4;;">Aufsichtsbehorde: Agentur fur Arbeit Kiel Tel: 0431 709 1010 </p></div></div>`
    );
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      return editorState;
    }
  };
  // To set default salutation & signature while composing the newemail
  useEffect(() => {
    let body = "<br /><br /><br /><br /><br /><br />";
    const updatedContent: any = setDefaultSignature(body);
    setBody(updatedContent);
  }, []);
  // To set subject & body on reply
  useEffect(() => {
    if (emailData) {
      let { id = null, subject = "" } = emailData ? emailData : {};
      setParentId(id);
      setSubject(`AW: ${subject}`);
      // body = body + '<br></br>------------------------';
      // const editorState = body ? HtmlToDraftConverter(body) : '';
      // setBody(HtmlToDraftConverter(''));
    }
  }, [emailData]);

  // on new email click
  const onNewEmail = () => {
    setSubject("");
    let body = "<br /><br /><br /><br /><br /><br />";
    const updatedContent: any = setDefaultSignature(body);
    setBody(updatedContent);
    // setBody(undefined);
    setAttachments([]);
    setParentId(null);
    setIsSubmit(false);
  };
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
      // let body = '<br /><br /><br /><br /><br /><br />';
      const updatedContent: any = setDefaultSignature(`${body}<br /><br />`);
      setBody(updatedContent);
      // const editorState = body ? HtmlToDraftConverter(body) : '';
      setSubject(subject);
      // setBody(editorState);
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

  //Contact selection
  const onContactSelection = (selectedOption: any) => {
    // fetchTemplateById({
    //   variables: {
    //     id
    //   }
    // });
    setContact(selectedOption);
  };

  // Function to send new email
  const sendEmail = (e: React.FormEvent<any>) => {
    e.preventDefault();
    let content = body
      ? draftToHtml(convertToRaw(body.getCurrentContent()))
      : "";
    const result = stripHtml(content);
    setIsSubmit(true);
    try {
      if (subject && body && result && result.length >= 2) {
        const emailInput: IAddEmailVariables = {
          userId: id ? parseInt(id) : 0,
          to: "caregiver",
          from: "plycoco",
          subject: subject /* .replace(/AW:/g, '') */,
          body: body ? content : "",
          parentId,
          status: "unread",
          attachments:
            attachments && attachments.length
              ? attachments.filter(
                  (attachment: IEmailAttachmentData) => attachment.path
                )
              : [],
          files:
            attachments && attachments.length
              ? attachments
                  .map((item: IEmailAttachmentData) => item.file)
                  .filter((file: File | null) => file)
              : null
        };
        addNewEmail({ variables: { emailInput } });
      }
    } catch (error) {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
  };

  const onEditorStateChange = (editorState: any): void => {
    logger(editorState, "editorState");
    setBody(editorState);
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

  return (
    <div className="email-section">
      {/* <EmailMenus {...this.props} /> */}
      <div className="email-content">
        <Form className="form-section">
          <Row>
            <Col lg={"12"}>
              <div className="email-inbox-section">
                <div className="email-row-wrap align-items-md-center email-attributes-wrap flex-column flex-md-row">
                  <div
                    className="email-attributes-content btn-primary new-email-btn mr-2"
                    onClick={onNewEmail}
                  >
                    <i className="icon-note mr-2" aria-hidden="true"></i>
                    <span> {languageTranslation("NEW_EMAIL")}</span>
                  </div>
                  {userRole === "canstitution" ? (
                    <div className="email-attributes-content new-email-select-wrap ml-0 mr-2">
                      <div className="form-section w-100">
                        <FormGroup className="mb-0 ">
                          <Select
                            placeholder="Select Department"
                            options={templateOptions}
                            classNamePrefix="custom-inner-reactselect"
                            className={"custom-reactselect"}
                            onChange={onContactSelection}
                            value={
                              contact && contact.value !== "" ? contact : null
                            }
                          />
                        </FormGroup>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="email-attributes-content input-wrap ">
                    <FormGroup className="d-flex align-items-center m-0 ">
                      <Label className="d-flex align-items-center m-0 mr-1">
                        {languageTranslation("SUBJECT")}:{" "}
                      </Label>
                      <div className={"position-relative"}>
                        <Input
                          type="text"
                          placeholder={languageTranslation("SUBJECT")}
                          name={"subject"}
                          value={subject}
                          className={`width-common ${
                            isSubmit && !subject ? "error" : ""
                          }`}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSubject(e.target.value)
                          }
                          maxLength={255}
                        />
                        {isSubmit && !subject ? (
                          <div className="required-tooltip">
                            {languageTranslation("REQUIRED_SUBJECT")}
                          </div>
                        ) : null}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="email-attributes-content new-email-select-wrap">
                    <div className="form-section w-100">
                      <FormGroup className="mb-0 ">
                        <Select
                          placeholder="Select Template"
                          options={templateOptions}
                          classNamePrefix="custom-inner-reactselect"
                          className={"custom-reactselect"}
                          onChange={onTemplateSelection}
                          value={
                            template && template.value !== "" ? template : null
                          }
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>
              <EmailFormComponent
                subject={subject}
                body={body}
                isSubmit={isSubmit}
                onEditorStateChange={onEditorStateChange}
                sendEmail={sendEmail}
                attachments={attachments}
                uploadDocument={uploadDocument}
              />
            </Col>
          </Row>
          {attachments && attachments.length ? (
            <AttachmentList
              attachment={attachments}
              onDelteDocument={onDelteDocument}
            />
          ) : null}

          <div className="d-flex align-items-center justify-content-end">
            <div>
              <Button
                color="primary"
                type="submit"
                className="btn-submit"
                onClick={sendEmail}
              >
                {adding ? (
                  <i className="fa fa-spinner fa-spin loader" />
                ) : (
                  <i className="fa fa-paper-plane mr-2" aria-hidden="true"></i>
                )}
                <span>{languageTranslation("SEND")}</span>
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default NewEmail;
