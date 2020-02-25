import React, { FunctionComponent, useState, useEffect } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Select from 'react-select';
import { useParams, useLocation } from 'react-router';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import { toast } from 'react-toastify';
import { ApolloError } from 'apollo-client';
import htmlToDraft from 'html-to-draftjs';
import { languageTranslation, logger, stripHtml } from '../../../../../helpers';
import {
  EmailTemplateQueries,
  ProfileQueries,
  CareInstitutionQueries,
} from '../../../../../graphql/queries';
import {
  IReactSelectInterface,
  IAddEmailVariables,
  IEmailTemplateData,
  INewEmailProps,
  IEmailAttachmentData,
  INewEmailAttachments,
} from '../../../../../interfaces';
import { EmailFormComponent } from './EmailFormComponent';
import { CareGiverMutations } from '../../../../../graphql/Mutations';
import { AttachmentList } from '../../../components/Attachments';
import { ConfirmBox } from '../../../components/ConfirmBox';
import { errorFormatter } from '../../../../../helpers/ErrorFormatter';
import { client } from '../../../../../config';
import logo from '../../../../assets/img/plycoco-orange.png';

const [, , , , GET_CONTACT_LIST_BY_ID] = CareInstitutionQueries;
const [, , , GET_CAREGIVER_EMAIL_TEMPLATES] = EmailTemplateQueries;
const [, , , , , , NEW_EMAIL] = CareGiverMutations;
const [VIEW_PROFILE] = ProfileQueries;

let toastId: any = null;

const NewEmail: FunctionComponent<INewEmailProps> = ({
  emailData,
  selectedUserName,
  userRole,
}: INewEmailProps) => {
  const userData: any = client.readQuery({
    query: VIEW_PROFILE,
  });

  const { viewAdminProfile }: any = userData ? userData : {};

  const { firstName = '', lastName = '', id = '' } = viewAdminProfile
    ? viewAdminProfile
    : {};

  let { id: Id } = useParams();

  const [subject, setSubject] = useState<string>('');
  const [body, setBody] = useState<any>('');
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
        type: languageTranslation(
          userRole === 'canstitution'
            ? 'CAREINSTITUTION_EMAIL_TEMPLATE_TYPE'
            : 'CAREGIVER_EMAIL_TEMPLATE_TYPE',
        ),
      },
    },
  );

  //To get contact list by id
  const [
    fetchContactsByUserID,
    { data: contactList, loading: contactListLoading },
  ] = useLazyQuery<any>(GET_CONTACT_LIST_BY_ID);

  useEffect(() => {
    // Fetch contact details by care institution id
    if (Id && userRole === 'canstitution') {
      fetchContactsByUserID({
        variables: { userId: parseInt(Id) },
      });
    }
  }, []);

  const [addNewEmail, { loading: sending }] = useMutation<
    {
      addNewEmail: any;
    },
    {
      emailInput: IAddEmailVariables;
    }
  >(NEW_EMAIL, {
    onCompleted() {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation('EMAIL_SENT_SUCCESS'));
      }
      setSubject('');
      setBody(undefined);
      setAttachments([]);
      setParentId(null);
      setIsSubmit(false);
      setTemplate({ label: '', value: '' });
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    },
  });

  // set template list options
  const templateOptions: IReactSelectInterface[] | undefined = [];
  if (data && data.getEmailtemplate) {
    const {
      getEmailtemplate: { email_templates },
    } = data;
    if (email_templates && email_templates.length) {
      email_templates.map(({ menuEntry, id }: IEmailTemplateData) => {
        templateOptions.push({
          label: menuEntry,
          value: id ? id.toString() : '',
        });
      });
    }
  }

  // set contact list options
  const contactOptions: IReactSelectInterface[] | undefined = [];
  if (contactList && contactList.getContactsByUserID) {
    const { getContactsByUserID } = contactList;
    if (getContactsByUserID && getContactsByUserID.length) {
      getContactsByUserID.map((list: any) => {
        return contactOptions.push({
          label: `${list.firstName} ${list.surName} (${list.contactType})`,
          value: list.id ? list.id : '',
        });
      });
    }
  }

  const setDefaultSignature = (body: any) => {
    const contentBlock = htmlToDraft(
      `<div><span style="font-size:15px;">Hello ${selectedUserName}</span>${body}<div><span style="font-size:13px; margin:0px 0px;">${languageTranslation(
        'BEST_WISHES',
      )}</span><br><span style="font-size:13px; margin:0px 0px;">${firstName} ${lastName}</span><br><span style="text-align:left;"><a href="https://www.plycoco.de/"><img alt="" src="${logo}" style="height: auto; width: 180px; margin:0px;"></a></span></div><div><span><strong>Tel:</strong> <a href="tel:+49-30-644 99 444" style="color: #000; text-decoration: none;">+49-30-644 99 444</a></span><br><span><strong>Fax:</strong> <a href="fax:+49-30-644 99 445" style="color: #000; text-decoration: none;">+49-30-644 99 445</a></span><br><span><strong>E-Mail:</strong> <a href="mailto:kontakt@plycoco.de" style="color: #000; text-decoration: none;">kontakt@plycoco.de</a></span><br><span><a href="https://www.plycoco.de/" style="color: #000; text-decoration: none;">www.plycoco.de</a></span></div><div><span style="font-size: 12px;color: #b5b4b4;">Plycoco GmbH, Welfenallee 3-7, 13465 Berlin</span><br><span style="font-size: 12px;color: #b5b4b4;">Vertreten durch: Maren Krusch</span><br><span style="font-size: 12px;color: #b5b4b4;">Eintragung im Handelsregister Amtsgericht Berlin-Charlottenburg, Registernummer: HRB 150746</span><br><span style="font-size: 12px;color: #b5b4b4;">Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz DE290375287</span></div></div>`,
    );
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      const editorState = EditorState.createWithContent(contentState);
      return editorState;
    }
  };

  // To set default salutation & signature while composing the newemail
  useEffect(() => {
    let body = '<br /><br /><br /><br /><br /><br />';
    const updatedContent: any = setDefaultSignature(body);
    setBody(updatedContent);
  }, [Id]);

  // To set subject & body on reply
  useEffect(() => {
    if (emailData) {
      let { id = null, subject = '' } = emailData ? emailData : {};
      setParentId(id);
      setSubject(`${subject.includes('AW:') ? '' : 'AW: '}${subject}`);
      // body = body + '<br></br>------------------------';
      // const editorState = body ? HtmlToDraftConverter(body) : '';
      // setBody(HtmlToDraftConverter(''));
    }
  }, [emailData]);

  // on new email click
  const onNewEmail = () => {
    setSubject('');
    let body = '<br /><br /><br /><br /><br /><br />';
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
      getEmailtemplate: { email_templates },
    } = data;
    setTemplate(selectedOption);
    const templateData = email_templates.filter(
      ({ id }: IEmailTemplateData) => id === parseInt(selectedOption.value),
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
                size,
              }),
            )
          : [],
      );
    }
  };

  //Contact selection
  const onContactSelection = (selectedOption: any) => {
    setContact(selectedOption);
  };

  // Function to send new email
  const sendEmail = (e: React.FormEvent<any>) => {
    e.preventDefault();
    let content = body
      ? draftToHtml(convertToRaw(body.getCurrentContent()))
      : '';
    const result = stripHtml(content);
    setIsSubmit(true);
    try {
      if (subject && body && result && result.length >= 2) {
        const emailInput: IAddEmailVariables = {
          senderUserId: id ? parseInt(id) : 0,
          receiverUserId: Id ? parseInt(Id) : 0,
          to: userRole === 'canstitution' ? 'careinstitution' : 'caregiver',
          from: 'plycoco',
          subject: subject /* .replace(/AW:/g, '') */,
          body: body ? content : '',
          parentId,
          status: 'unread',
          attachments:
            attachments && attachments.length
              ? attachments.filter(
                  (attachment: IEmailAttachmentData) => attachment.path,
                )
              : [],
          files:
            attachments && attachments.length
              ? attachments
                  .map((item: IEmailAttachmentData) => item.file)
                  .filter((file: File | null) => file)
              : null,
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
    logger(editorState, 'editorState');
    setBody(editorState);
  };

  const onDelteDocument = async (
    attachmentId: string,
    attachmentIndex?: number,
  ) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_EMAIL_ATTACHMENT_REMOVE_MSG'),
    });
    if (!value) {
      return;
    } else {
      setAttachments((prevArray: any) =>
        prevArray.filter((_: any, index: number) => attachmentIndex !== index),
      );
    }
  };
  const uploadDocument = (data: IEmailAttachmentData) => {
    setAttachments((prevArray: any) => [data, ...prevArray]);
  };

  return (
    <div className='email-section'>
      {/* <EmailMenus {...this.props} /> */}
      <div className='email-content'>
        <Form className='form-section'>
          <Row>
            <Col lg={'12'}>
              <div className='email-inbox-section'>
                <div className='email-row-wrap align-items-md-center email-attributes-wrap flex-column flex-md-row'>
                  {/* <div
                    className="email-attributes-content d-flex align-items-center"
                    onClick={onNewEmail}
                  >
                    <i className="fa fa-envelope mr-1" aria-hidden="true"></i>
                    <span> {languageTranslation("NEW_EMAIL")}</span>
                  </div> */}
                  <div
                    className='email-attributes-content btn-primary new-email-btn mr-2'
                    onClick={onNewEmail}
                  >
                    <i className='icon-note mr-2' aria-hidden='true'></i>
                    <span> {languageTranslation('NEW_EMAIL')}</span>
                  </div>
                  {userRole === 'canstitution' ? (
                    <div className='email-attributes-content new-email-select-wrap ml-0 mr-2'>
                      <div className='form-section w-100'>
                        <FormGroup className='mb-0 '>
                          <Select
                            placeholder='Select Department'
                            options={contactOptions}
                            classNamePrefix='custom-inner-reactselect'
                            className={'custom-reactselect'}
                            onChange={onContactSelection}
                            value={
                              contact && contact.value !== '' ? contact : null
                            }
                          />
                        </FormGroup>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                  <div className='email-attributes-content input-wrap '>
                    <FormGroup className='d-flex align-items-center m-0 '>
                      <Label className='d-flex align-items-center m-0 mr-1'>
                        {languageTranslation('SUBJECT')}:{' '}
                      </Label>
                      <div className={'position-relative'}>
                        <Input
                          type='text'
                          placeholder={languageTranslation('SUBJECT')}
                          name={'subject'}
                          value={subject}
                          className={`width-common ${
                            isSubmit && !subject ? 'error' : ''
                          }`}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSubject(e.target.value)
                          }
                          maxLength={255}
                        />
                        {isSubmit && !subject ? (
                          <div className='required-tooltip'>
                            {languageTranslation('REQUIRED_SUBJECT')}
                          </div>
                        ) : null}
                      </div>
                    </FormGroup>
                  </div>
                  <div className='email-attributes-content new-email-select-wrap'>
                    <div className='form-section w-100'>
                      <FormGroup className='mb-0 '>
                        <Select
                          placeholder='Select Template'
                          options={templateOptions}
                          classNamePrefix='custom-inner-reactselect'
                          className={'custom-reactselect'}
                          onChange={onTemplateSelection}
                          value={
                            template && template.value !== '' ? template : null
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
            <div className='employee-document-list custom-scrollbar mb-3'>
              <AttachmentList
                attachment={attachments}
                onDelteDocument={onDelteDocument}
              />
            </div>
          ) : null}

          <div className='d-flex align-items-center justify-content-end '>
            <div>
              <Button
                color='primary'
                type='submit'
                className='btn-submit'
                onClick={sendEmail}
                disabled={sending}
              >
                {sending ? (
                  <i className='fa fa-spinner fa-spin mr-2' />
                ) : (
                  <i className='fa fa-paper-plane mr-2' aria-hidden='true'></i>
                )}
                <span>{languageTranslation('SEND')}</span>
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default NewEmail;
