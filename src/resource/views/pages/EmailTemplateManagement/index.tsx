import React, { FunctionComponent, useState, useEffect } from 'react';
import { Row } from 'reactstrap';
import { FormikHelpers } from 'formik';
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { toast } from 'react-toastify';
import {
  IEmailTemplateValues,
  IReactSelectInterface,
} from '../../../../interfaces';
import { EmailTemplateQueries } from '../../../../graphql/queries';
import { EmailTemplateMenu } from './Menu';
import { EmailTemplateList } from './List';
import { AddTemplate } from './AddTemplate';
import { languageTranslation } from '../../../../helpers';
import './index.scss';
import { EmailTemplateMutations } from '../../../../graphql/Mutations';

const [
  GET_EMAIL_TEMPLATE_TYEPS,
  GET_EMAIL_TEMPLATE,
  GET_EMAIL_TEMPLATE_BY_ID,
] = EmailTemplateQueries;
const [ADD_EMAIL_TEMPLATE, UPDATE_EMAIL_TEMPLATE] = EmailTemplateMutations;

export const EmailTemplateManagement: FunctionComponent = () => {
  let submitMyForm: any = null;

  // To set email template data at the time of edit
  const [templateData, setTemplateData] = useState<IEmailTemplateValues | null>(
    null,
  );
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
    getEmailtemplateTypes.forEach(({ type }: { type: string }) =>
      typeListOptions.push({
        label: type,
        value: type,
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
  const [addEmail] = useMutation<
    {
      addEmail: any;
    },
    {
      emailTemplateInput: IEmailTemplateValues;
    }
  >(ADD_EMAIL_TEMPLATE, {
    onCompleted({ addEmail }) {
      refetch();
      toast.success(languageTranslation('EMAIL_ADDED_SUCCESS'));
    },
  });
  // To update email template into db
  const [updateEmailTemplate] = useMutation<
    {
      updateEmailTemplate: any;
    },
    {
      id: number;
      emailTemplateInput: IEmailTemplateValues;
    }
  >(UPDATE_EMAIL_TEMPLATE, {
    onCompleted({ updateEmailTemplate }) {
      toast.success(languageTranslation('EMAIL_UPDATION_SUCCESS'));
    },
  });
  //To get email templates
  const [
    fetchTemplateList,
    { data, loading: fetchTemplateListLoading },
  ] = useLazyQuery<any>(GET_EMAIL_TEMPLATE);
  //To get email templates by id
  const [
    fetchTemplateById,
    { data: emailTemplate, loading: emailTemplateLoading },
  ] = useLazyQuery<any>(GET_EMAIL_TEMPLATE_BY_ID);

  useEffect(() => {
    if (!emailTemplateLoading && emailTemplate) {
      const { viewEmailTemplate = {} } = emailTemplate ? emailTemplate : {};
      console.log('emailTemplate', emailTemplate);
      const {
        type = '',
        menuEntry = '',
        subject = '',
        body = '',
      } = viewEmailTemplate ? viewEmailTemplate : {};
      const contentBlock = body ? htmlToDraft(body) : '';
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks,
        );
        const editorState = EditorState.createWithContent(contentState);
        console.log('viewEmailTemplate', viewEmailTemplate);
        setTemplateData({
          type: type,
          menuEntry: menuEntry,
          subject: subject,
          body: editorState,
          id: 1,
        });
      }
    }
  }, [emailTemplate]);

  useEffect(() => {
    // call query
    fetchTemplateList({
      variables: {
        type: templateType && templateType.label ? templateType.label : '',
      },
    });
  }, []);

  // Submit handler
  const handleSubmit = async (
    { type, menuEntry, subject, body, id }: IEmailTemplateValues,
    { resetForm }: FormikHelpers<IEmailTemplateValues>,
  ) => {
    const emailTemplateInput: IEmailTemplateValues = {
      type,
      menuEntry,
      subject,
      body: body ? draftToHtml(convertToRaw(body.getCurrentContent())) : '',
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
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      toast.error(message);
    }
    resetForm();
  };
  const onTemplateSelection = async (id: string) => {
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
    if (!fetchTemplateListLoading && data) {
      fetchTemplateList({
        variables: {
          type: templateType && templateType.label ? templateType.label : '',
        },
      });
    }
    console.log('selectedType', selectedType);
    setTemplateType(selectedType);
  };
  // To use formik submit form outside
  const bindSubmitForm = (submitForm: any) => {
    submitMyForm = submitForm;
  };
  // console.log('emailTemplate111', emailTemplate);

  return (
    <>
      <div className='common-detail-page'>
        <div className='common-detail-section'>
          <EmailTemplateMenu
            handleSubmit={() => {
              submitMyForm();
            }}
            onAddNewTemplate={() => setTemplateData(null)}
            typeListOptions={typeListOptions}
            templateType={templateType}
            onTypeChange={onTypeChange}
          />
          <div className='common-content flex-grow-1'>
            <div>
              <Row>
                <EmailTemplateList
                  onTemplateSelection={onTemplateSelection}
                  data={data}
                />
                <AddTemplate
                  handleSubmit={handleSubmit}
                  bindSubmitForm={bindSubmitForm}
                  templateData={templateData}
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
