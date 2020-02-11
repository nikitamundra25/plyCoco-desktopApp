import React, { FunctionComponent, useState, useEffect } from 'react';
import { Row } from 'reactstrap';
import { FormikHelpers } from 'formik';
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { toast } from 'react-toastify';
import { ApolloError } from 'apollo-client';
import {
  IEmailTemplateValues,
  IReactSelectInterface,
  IEmailTemplateSubmitValues,
  IEmailAttachmentData,
} from '../../../../interfaces';
import { EmailTemplateQueries } from '../../../../graphql/queries';
import { EmailTemplateMenu } from './Menu';
import { EmailTemplateList } from './List';
import { AddTemplate } from './AddTemplate';
import { languageTranslation } from '../../../../helpers';
import { EmailTemplateMutations } from '../../../../graphql/Mutations';
import { ConfirmBox } from '../../components/ConfirmBox';
import { errorFormatter } from '../../../../helpers/ErrorFormatter';
import './index.scss';

const [
  GET_EMAIL_TEMPLATE_TYEPS,
  GET_EMAIL_TEMPLATE,
  GET_EMAIL_TEMPLATE_BY_ID,
] = EmailTemplateQueries;

const [
  ADD_EMAIL_TEMPLATE,
  UPDATE_EMAIL_TEMPLATE,
  DELETE_EMAIL_TEMPLATE,
  DELETE_EMAIL_TEMPLATE_ATTACHMENT,
] = EmailTemplateMutations;

let toastId: any = '';

export const EmailTemplateManagement: FunctionComponent = () => {
  let submitMyForm: any = null;
  const [typeId, setTypeId] = useState<number | null>(null);
  const [attachment, setAttachment] = useState<IEmailAttachmentData[]>([]);
  // To set email template data at the time of edit
  const [templateData, setTemplateData] = useState<IEmailTemplateValues | null>(
    null,
  );
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [
    templateType,
    setTemplateType,
  ] = useState<IReactSelectInterface | null>(null);
  // To get all the types of email template
  const { data: typeList, loading, refetch } = useQuery(
    GET_EMAIL_TEMPLATE_TYEPS,
  );
  const typeListOptions: IReactSelectInterface[] | undefined = [];
  // To convert types into react select compatible options
  if (
    !loading &&
    typeList &&
    typeList.getEmailtemplateTypes &&
    typeList.getEmailtemplateTypes.length
  ) {
    const { getEmailtemplateTypes } = typeList;
    getEmailtemplateTypes.forEach(
      ({ type, id }: { type: string; id: number }) =>
        typeListOptions.push({
          label: type,
          value: id.toString(),
        }),
    );
  }
  useEffect(() => {
    if (!templateType) {
      // To set default email type
      setTemplateType(typeListOptions[0]);
    }
  }, [typeListOptions]);
  // To add email template into db
  const [addEmail, { loading: addEmailLoading }] = useMutation<
    {
      addEmail: any;
    },
    {
      emailTemplateInput: IEmailTemplateSubmitValues;
    }
  >(ADD_EMAIL_TEMPLATE, {
    onCompleted({ addEmail }) {
      setTemplateData(null);
      setAttachment([]);
      refetch();
      listRefetch();
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation('EMAIL_ADDED_SUCCESS'));
      }
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toast.error(message);
      }
    },
  });
  // To update email template into db
  const [updateEmailTemplate, { loading: updateLoading }] = useMutation<
    {
      updateEmailTemplate: any;
    },
    {
      id: number;
      emailTemplateInput: IEmailTemplateSubmitValues;
    }
  >(UPDATE_EMAIL_TEMPLATE, {
    onCompleted({ updateEmailTemplate }) {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation('EMAIL_UPDATION_SUCCESS'));
      }
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toast.error(message);
      }
    },
  });
  // To delete email template from db
  const [deleteEmailTemplate] = useMutation<
    { deleteEmailTemplate: any },
    { id: number }
  >(DELETE_EMAIL_TEMPLATE, {
    onCompleted() {
      setTemplateData(null);
      setActiveTemplate(null);
      setAttachment([]);
      listRefetch();
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation('EMAIL_TEMPLATE_DELETION_SUCCESS'),
        );
      }
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toast.error(message);
      }
    },
  });

  // To delete email template attachments from db
  const [deleteEmailAttachment] = useMutation<
    { deleteEmailAttachment: any },
    { id: number; attachmentId: string }
  >(DELETE_EMAIL_TEMPLATE_ATTACHMENT, {
    onCompleted({ deleteEmailAttachment }) {
      console.log(deleteEmailAttachment, 'deleteEmailAttachment');
      const { attachmentId } = deleteEmailAttachment;
      setAttachment((prevArray: any) =>
        prevArray.filter((item: any) => item.id !== attachmentId),
      );
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation('EMAIL_TEMPLATE_ATTACHMENT_DELETION_SUCCESS'),
        );
      }
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toast.error(message);
      }
    },
  });

  //To get email templates by type
  const [
    fetchTemplateList,
    { data, loading: fetchTemplateListLoading, called, refetch: listRefetch },
  ] = useLazyQuery<any>(GET_EMAIL_TEMPLATE);

  //To get email templates by id
  const [
    fetchTemplateById,
    { data: emailTemplate, loading: emailTemplateLoading },
  ] = useLazyQuery<any>(GET_EMAIL_TEMPLATE_BY_ID);

  //view a particular template by clicking on its menu entry
  useEffect(() => {
    if (!emailTemplateLoading && emailTemplate) {
      const { viewEmailTemplate = {} } = emailTemplate ? emailTemplate : {};
      const {
        id = null,
        menuEntry = '',
        subject = '',
        body = '',
        email_template_type = {},
        attachments = [],
      } = viewEmailTemplate ? viewEmailTemplate : {};
      const { type = '' } = email_template_type ? email_template_type : {};
      const contentBlock = body ? htmlToDraft(body) : '';
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks,
        );
        const editorState = EditorState.createWithContent(contentState);
        const typeIdIndex: number = typeListOptions.findIndex(
          (item: IReactSelectInterface) => item.label === type,
        );
        const replaceType: any = {
          label: type,
          value: type,
        };
        if (typeIdIndex > -1) {
          setTypeId(parseInt(typeListOptions[typeIdIndex].value));
        }
        let temp: IEmailAttachmentData[] = [];
        if (attachments && attachments.length) {
          attachments.forEach(
            ({
              path,
              name,
              size,
              id,
            }: {
              path: string;
              name: string;
              size: number;
              id: string;
            }) => {
              temp.push({
                path,
                fileName: name,
                size,
                file: null,
                url: '',
                id,
              });
            },
          );
        }
        setTemplateData({
          type: replaceType,
          menuEntry: menuEntry,
          subject: subject,
          body: editorState,
          id: parseInt(id),
        });
        setAttachment(temp);
      }
    }
  }, [emailTemplate]);

  useEffect(() => {
    // call query
    //when template type changes it will be called
    if (templateType) {
      fetchTemplateList({
        variables: {
          type: templateType && templateType.label ? templateType.label : '',
        },
      });
    }
  }, [templateType]);

  // Submit handler
  const handleSubmit = async (
    {
      type,
      menuEntry,
      subject,
      body,
      id,
      typeId: templateTypeId,
    }: IEmailTemplateValues,
    { resetForm, setSubmitting }: FormikHelpers<IEmailTemplateValues>,
  ) => {
    setSubmitting(true);
    // It convert into raw before send it out
    const text = body
      ? draftToHtml(convertToRaw(body.getCurrentContent()))
      : '';
    // To set template data
    const contentBlock = text ? htmlToDraft(text) : '';
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      const editorState = EditorState.createWithContent(contentState);
      setTemplateData({
        type,
        menuEntry,
        subject,
        body: editorState,
        id,
      });
    }

    const emailTemplateInput: IEmailTemplateSubmitValues = {
      type: type && type.label ? type.label : '',
      typeId,
      menuEntry: menuEntry ? menuEntry.trim() : '',
      subject: subject ? subject.trim() : '',
      body: body ? draftToHtml(convertToRaw(body.getCurrentContent())) : '',
      attachments:
        attachment && attachment.length
          ? attachment
              .map((item: IEmailAttachmentData) => item.file)
              .filter((file: File | null) => file)
          : null,
    };
    try {
      if (id) {
        updateEmailTemplate({
          variables: {
            id,
            emailTemplateInput,
          },
        });
      } else {
        addEmail({
          variables: {
            emailTemplateInput,
          },
        });
      }
    } catch (error) {
      const message = errorFormatter(error);
      toastId = toast.error(message);
    }
    resetForm();
  };
  const onTemplateSelection = async (id: string) => {
    setActiveTemplate(id);
    toast.dismiss();
    await fetchTemplateById({
      variables: {
        id,
      },
    });
  };
  // Function to change list according to type selected
  const onTypeChange = (
    selectedType: IReactSelectInterface /* , id: string */,
  ) => {
    setTemplateType(selectedType);
    setTemplateData(null);
    setAttachment([]);
    setActiveTemplate(null);
  };

  // To use formik submit form outside
  const bindSubmitForm = (submitForm: any) => {
    submitMyForm = submitForm;
  };
  // Delete handler
  const onDeleteEmailTemplate = async () => {
    if (activeTemplate) {
      const { value } = await ConfirmBox({
        title: languageTranslation('CONFIRM_LABEL'),
        text: languageTranslation('CONFIRM_EMAIL_TEMPLATE_DELETE_MSG'),
      });
      if (!value) {
        return;
      } else {
        try {
          deleteEmailTemplate({
            variables: { id: parseInt(activeTemplate) },
          });
        } catch (error) {
          const message = errorFormatter(error);
          if (!toast.isActive(toastId)) {
            toastId = toast.error(message);
          }
        }
      }
    }
  };

  const uploadDocument = (data: IEmailAttachmentData) => {
    setAttachment((prevArray: any) => [data, ...prevArray]);
  };

  const onDelteDocument = async (
    attachmentId: string,
    attachmentIndex?: number,
  ) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_EMAIL_ATTACHMENT_DELETE_MSG'),
    });
    if (!value) {
      return;
    } else if (attachmentId && activeTemplate) {
      deleteEmailAttachment({
        variables: {
          id: parseInt(activeTemplate),
          attachmentId,
        },
      });
    } else {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation('EMAIL_TEMPLATE_ATTACHMENT_DELETION_SUCCESS'),
        );
      }
      setAttachment((prevArray: any) =>
        prevArray.filter((_: any, index: number) => attachmentIndex !== index),
      );
    }
  };

  return (
    <>
      <div className='common-detail-page'>
        <div className='common-detail-section'>
          <EmailTemplateMenu
            id={templateData && templateData.id ? templateData.id : null}
            typeListOptions={typeListOptions}
            templateType={templateType}
            activeTemplate={activeTemplate}
            handleSubmit={() => {
              submitMyForm();
            }}
            addEmailLoading={addEmailLoading}
            updateLoading={updateLoading}
            onAddNewTemplate={() => {
              if (templateType && templateType.value) {
                setTypeId(parseInt(templateType.value));
                setActiveTemplate('');
              }
              setTemplateData({
                type: templateType ? templateType : undefined,
                menuEntry: '',
                subject: '',
                body: '',
                id: undefined,
              });
            }}
            onDeleteEmailTemplate={onDeleteEmailTemplate}
            onTypeChange={onTypeChange}
          />
          <div className='common-content flex-grow-1'>
            <div>
              <Row>
                <EmailTemplateList
                  onTemplateSelection={onTemplateSelection}
                  data={data}
                  loading={!called || fetchTemplateListLoading}
                  activeTemplate={activeTemplate}
                />
                <AddTemplate
                  handleSubmit={handleSubmit}
                  bindSubmitForm={bindSubmitForm}
                  templateData={templateData}
                  typeListOptions={typeListOptions}
                  setTypeId={setTypeId}
                  attachment={attachment}
                  uploadDocument={uploadDocument}
                  onDelteDocument={onDelteDocument}
                  emailTemplateLoading={emailTemplateLoading}
                />
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailTemplateManagement;
