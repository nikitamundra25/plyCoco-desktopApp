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
  IEmailAttachmentData
} from '../../../../interfaces';
import { EmailTemplateQueries } from '../../../../graphql/queries';
import { EmailTemplateMenu } from './Menu';
import { EmailTemplateList } from './List';
import { AddTemplate } from './AddTemplate';
import { languageTranslation } from '../../../../helpers';
import { EmailTemplateMutations } from '../../../../graphql/Mutations';
import { ConfirmBox } from '../../components/ConfirmBox';
import { errorFormatter } from '../../../../helpers';
import './index.scss';
import { useLocation, useHistory } from 'react-router';
import * as qs from 'query-string';

const [
  GET_EMAIL_TEMPLATE_TYEPS,
  GET_EMAIL_TEMPLATE,
  GET_EMAIL_TEMPLATE_BY_ID,
  ,
  GET_ARCHIVE_EMAIL_TEMPLATES,
  GET_ARCHIVE_EMAIL_TEMPLATE_BY_ID
] = EmailTemplateQueries;

const [
  ADD_EMAIL_TEMPLATE,
  UPDATE_EMAIL_TEMPLATE,
  DELETE_EMAIL_TEMPLATE,
  DELETE_EMAIL_TEMPLATE_ATTACHMENT,
  RESTORE_ARCHIVED_EMAIL,
  PERMANENT_DELETE_EMAIL_TEMPLATE
] = EmailTemplateMutations;

let toastId: any = '';

export const EmailTemplateManagement: FunctionComponent = () => {
  let submitMyForm: any = null;
  const { search, pathname } = useLocation();
  const query = qs.parse(search);
  const history = useHistory();
  const [showArchive, setShowArchive] = useState<boolean>(false);
  const [typeId, setTypeId] = useState<number | null>(null);
  const [attachment, setAttachment] = useState<IEmailAttachmentData[]>([]);
  // To set email template data at the time of edit
  const [templateData, setTemplateData] = useState<IEmailTemplateValues | null>(
    null
  );
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [
    templateType,
    setTemplateType
  ] = useState<IReactSelectInterface | null>(null);
  // To get all the types of email template
  const { data: typeList, loading, refetch } = useQuery(
    GET_EMAIL_TEMPLATE_TYEPS
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
          value: id ? id.toString() : ''
        })
    );
  }
  // To restore archive user
  const [restoreEmailTemplate, {}] = useMutation<
    { restoreEmailTemplate: any },
    { id: string }
  >(RESTORE_ARCHIVED_EMAIL, {
    onCompleted({ restoreEmailTemplate }) {
      setActiveTemplate('');
      setTemplateData(null);
      setAttachment([]);
      archiveListRefetch();
    }
  });

  // To permanently delete archive user
  const [permanentDeleteEmail, { error }] = useMutation<
    { permanentDeleteEmail: any },
    { id: string }
  >(PERMANENT_DELETE_EMAIL_TEMPLATE, {
    onCompleted({ permanentDeleteEmail }) {
      setActiveTemplate('');
      setTemplateData(null);
      setAttachment([]);
      archiveListRefetch();
    }
  });

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
    }
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
    }
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
          languageTranslation('EMAIL_TEMPLATE_DELETION_SUCCESS')
        );
      }
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toast.error(message);
      }
    }
  });

  // To delete email template attachments from db
  const [deleteEmailAttachment] = useMutation<
    { deleteEmailAttachment: any },
    { id: number; attachmentId: string }
  >(DELETE_EMAIL_TEMPLATE_ATTACHMENT, {
    onCompleted({ deleteEmailAttachment }) {
      const { attachmentId } = deleteEmailAttachment;
      setAttachment((prevArray: any) =>
        prevArray.filter((item: any) => item.id !== attachmentId)
      );
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation('EMAIL_TEMPLATE_ATTACHMENT_DELETION_SUCCESS')
        );
      }
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toast.error(message);
      }
    }
  });

  //To get email templates by type
  const [
    fetchTemplateList,
    { data, loading: fetchTemplateListLoading, called, refetch: listRefetch }
  ] = useLazyQuery<any>(GET_EMAIL_TEMPLATE);

  //To get trash email templates
  const [
    fetchArchiveList,
    {
      data: archiveList,
      loading: archiveListLoading,
      refetch: archiveListRefetch
    }
  ] = useLazyQuery<any>(GET_ARCHIVE_EMAIL_TEMPLATES, {
    fetchPolicy: 'no-cache'
  });

  //To get email templates by id
  const [
    fetchTemplateById,
    { data: emailTemplate, loading: emailTemplateLoading }
  ] = useLazyQuery<any>(GET_EMAIL_TEMPLATE_BY_ID);

  //To get archive email templates by id
  const [
    fetchArchiveTemplateById,
    { data: archiveEmailTemplate, loading: archiveEmailTemplateLoading }
  ] = useLazyQuery<any>(GET_ARCHIVE_EMAIL_TEMPLATE_BY_ID);

  //view a particular template by clicking on its menu entry
  useEffect(() => {
    if (!emailTemplateLoading && emailTemplate) {
      updateData();
    }
  }, [emailTemplate]);

  //view a particular template by clicking on its menu entry
  useEffect(() => {
    console.log('archiveEmailTemplate in use effect', archiveEmailTemplate);

    if (!archiveEmailTemplateLoading && archiveEmailTemplate) {
      viewArchivedMenuEntry();
    }
  }, [archiveEmailTemplate]);

  //function to fill the form when clicking on template
  const dataModifier = ({
    id,
    menuEntry,
    subject,
    body,
    email_template_type,
    attachments,
    type
  }: any) => {
    const contentBlock = body ? htmlToDraft(body) : '';
    let editorState: any = '';
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      editorState = EditorState.createWithContent(contentState);
    }
    const typeIdIndex: number = typeListOptions.findIndex(
      (item: IReactSelectInterface) => item.label === type
    );
    const replaceType: any = {
      label: type,
      value: type
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
          id
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
            id
          });
        }
      );
    }
    setTemplateData({
      type: replaceType,
      menuEntry: menuEntry,
      subject: subject,
      body: editorState,
      id: parseInt(id)
    });
    setAttachment(temp);
  };

  // Function to set template data into state after some modifications
  const updateData = () => {
    const { viewEmailTemplate = {} } = emailTemplate ? emailTemplate : {};
    const {
      id = null,
      menuEntry = '',
      subject = '',
      body = '',
      email_template_type = {},
      attachments = []
    } = viewEmailTemplate ? viewEmailTemplate : {};
    const { type = '' } = email_template_type ? email_template_type : {};
    dataModifier({
      id,
      menuEntry,
      subject,
      body,
      email_template_type,
      attachments,
      type
    });
  };

  //view a particular archived template by clicking on its menu entry
  const viewArchivedMenuEntry = () => {
    console.log('archiveEmailTemplate in function', archiveEmailTemplate);
    // if (!archiveEmailTemplateLoading && archiveEmailTemplate) {
    const { trashSingleEmailTemp = {} } = archiveEmailTemplate
      ? archiveEmailTemplate
      : {};
    const {
      id = null,
      menuEntry = '',
      subject = '',
      body = '',
      email_template_type = {},
      attachments = []
    } = trashSingleEmailTemp ? trashSingleEmailTemp : {};
    const { type = '' } = email_template_type ? email_template_type : {};
    // dataModifier({
    //   id,
    //   menuEntry,
    //   subject,
    //   body,
    //   email_template_type,
    //   attachments,
    //   type
    // });

    let editorState: any = '';
    const contentBlock = body ? htmlToDraft(body) : '';
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      editorState = EditorState.createWithContent(contentState);
      const typeIdIndex: number = typeListOptions.findIndex(
        (item: IReactSelectInterface) => item.label === type
      );
      const replaceType: any = {
        label: type,
        value: type
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
            id
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
              id
            });
          }
        );
      }
      setTemplateData({
        type: replaceType,
        menuEntry: menuEntry,
        subject: subject,
        body: editorState,
        id: parseInt(id)
      });
      setAttachment(temp);
    }
  };
  useEffect(() => {
    // call query
    //when template type changes it will be called
    if (templateType) {
      fetchTemplateList({
        variables: {
          type: templateType && templateType.label ? templateType.label : ''
        }
      });
      if (query && query.tab) {
        fetchArchiveList();
        setShowArchive(true);
      } else {
        setShowArchive(false);
      }
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
      typeId: templateTypeId
    }: IEmailTemplateValues,
    { resetForm, setSubmitting }: FormikHelpers<IEmailTemplateValues>
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
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setTemplateData({
        type,
        menuEntry,
        subject,
        body: editorState,
        id
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
          : null
    };
    try {
      if (id) {
        updateEmailTemplate({
          variables: {
            id,
            emailTemplateInput
          }
        });
      } else {
        addEmail({
          variables: {
            emailTemplateInput
          }
        });
      }
    } catch (error) {
      const message = errorFormatter(error);
      toastId = toast.error(message);
    }
    resetForm();
  };
  const onTemplateSelection = (id: string) => {
    console.log('ontemplate selection');

    setActiveTemplate(id);
    toast.dismiss();
    // To update data when query result from the Apollo cache & previous one & this one is the same
    const { viewEmailTemplate = {} } = emailTemplate ? emailTemplate : {};
    if (viewEmailTemplate && viewEmailTemplate.id === id) {
      updateData();
    }

    fetchTemplateById({
      variables: {
        id
      }
    });
  };

  const onArchiveTemplateSelection = (id: string) => {
    setActiveTemplate(id);
    toast.dismiss();
    const { trashSingleEmailTemp = {} } = archiveEmailTemplate
      ? archiveEmailTemplate
      : {};

    if (trashSingleEmailTemp && trashSingleEmailTemp.id === id) {
      console.log('inside if of trash');
      viewArchivedMenuEntry();
    }
    fetchArchiveTemplateById({
      variables: {
        id
      }
    });
  };

  // Function to change list according to type selected
  const onTypeChange = (
    selectedType: IReactSelectInterface /* , id: string */
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
        text: languageTranslation('CONFIRM_EMAIL_TEMPLATE_DELETE_MSG')
      });
      if (!value) {
        return;
      } else {
        try {
          deleteEmailTemplate({
            variables: { id: parseInt(activeTemplate) }
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
    attachmentIndex?: number
  ) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_EMAIL_ATTACHMENT_DELETE_MSG')
    });
    if (!value) {
      return;
    } else if (attachmentId && activeTemplate) {
      deleteEmailAttachment({
        variables: {
          id: parseInt(activeTemplate),
          attachmentId
        }
      });
    } else {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation('EMAIL_TEMPLATE_ATTACHMENT_DELETION_SUCCESS')
        );
      }
      setAttachment((prevArray: any) =>
        prevArray.filter((_: any, index: number) => attachmentIndex !== index)
      );
    }
  };

  const onRestoreEmailTemplate = async (id: string) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_EMAIL_TEMPLATE_RESTORE_MSG')
    });
    if (!value) {
      return;
    } else {
      try {
        await restoreEmailTemplate({
          variables: {
            id
          }
        });
        refetch();

        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('EMAIL_TEMPLATE_RESTORED_SUCCESS')
          );
        }
      } catch (error) {
        const message = error.message
          .replace('SequelizeValidationError: ', '')
          .replace('Validation error: ', '')
          .replace('GraphQL error: ', '');
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  };

  const onPermanentlyDeleteEmployee = async (id: string) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_EMAIL_TEMP_PERMANENT_DELETE_MSG')
    });
    if (!value) {
      return;
    } else {
      try {
        await permanentDeleteEmail({
          variables: {
            id
          }
        });
        refetch();

        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('EMAIL_TEMP_PERMANENT_DEL_SUCCESS')
          );
        }
      } catch (error) {
        const message = error.message
          .replace('SequelizeValidationError: ', '')
          .replace('Validation error: ', '')
          .replace('GraphQL error: ', '');
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  };
  //on clicking view trash button
  const onViewTrash = () => {
    const path = [
      pathname,
      qs.stringify({
        tab: 'trash'
      })
    ].join('?');
    history.push(path);
    setShowArchive(true);
    setTemplateData(null);
    fetchArchiveList();
    setAttachment([]);
  };

  //Handle view trash with url
  useEffect(() => {
    if (query && query.tab) {
      setShowArchive(true);
    } else {
      setShowArchive(false);
    }
  }, [query]);

  //onclicking back to list in view trash
  const onBackToList = () => {
    delete query.tab;
    const path = [
      pathname,
      qs.stringify({
        ...query
      })
    ].join('?');
    history.push(path);
    setShowArchive(false);
    setActiveTemplate('');
    setTemplateData(null);
    listRefetch();
    setAttachment([]);
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
                id: undefined
              });
              setAttachment([]);
            }}
            onDeleteEmailTemplate={onDeleteEmailTemplate}
            onTypeChange={onTypeChange}
            fetchArchiveList={fetchArchiveList}
            setShowArchive={setShowArchive}
            showArchive={showArchive}
            onViewTrash={onViewTrash}
            listRefetch={listRefetch}
            setActiveTemplate={setActiveTemplate}
            onBackToList={onBackToList}
          />
          <div className='common-content flex-grow-1'>
            <div>
              <Row>
                <EmailTemplateList
                  onTemplateSelection={onTemplateSelection}
                  data={data}
                  loading={!called || fetchTemplateListLoading}
                  activeTemplate={activeTemplate}
                  showArchive={showArchive}
                  archiveList={archiveList}
                  archiveListLoading={archiveListLoading}
                  onArchiveTemplateSelection={onArchiveTemplateSelection}
                  onRestoreEmailTemplate={onRestoreEmailTemplate}
                  onPermanentlyDeleteEmployee={onPermanentlyDeleteEmployee}
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
                  showArchive={showArchive}
                  archiveEmailTemplateLoading={archiveEmailTemplateLoading}
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
