import React, { FunctionComponent, useState, useEffect } from 'react';
import { Row } from 'reactstrap';
import { FormikHelpers } from 'formik';
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { toast } from 'react-toastify';
import { IEmailTemplateValues } from '../../interfaces';
import { EmailTemplateQueries } from '../../queries';
import { EmailTemplateMenu } from './Menu';
import { EmailTemplateList } from './List';
import { AddTemplate } from './AddTemplate';
import './index.scss';
import { logger } from '../../helpers';

const [
  ADD_EMAIL_TEMPLATE,
  UPDATE_EMAIL_TEMPLATE,
  ,
  GET_EMAIL_TEMPLATE,
  GET_EMAIL_TEMPLATE_BY_ID
] = EmailTemplateQueries;

export const EmailTemplateManagement: FunctionComponent = () => {
  let submitMyForm: any = null;

  // To set email template data at the time of edit
  const [templateData, setTemplateData] = useState<IEmailTemplateValues | null>(
    null
  );
  // To add email template into db
  const [addEmail] = useMutation<
    {
      addEmail: any;
    },
    {
      emailTemplateInput: IEmailTemplateValues;
    }
  >(ADD_EMAIL_TEMPLATE);
  // To update email template into db
  const [updateEmailTemplate] = useMutation<
    {
      updateEmailTemplate: any;
    },
    {
      id: number;
      emailTemplateInput: IEmailTemplateValues;
    }
  >(UPDATE_EMAIL_TEMPLATE);
  //To get email templates
  const [fetchTemplateList, { data }] = useLazyQuery<any>(GET_EMAIL_TEMPLATE);
  //To get email templates by id
  const [fetchTemplateById, { data: emailTemplate, loading }] = useLazyQuery<
    any
  >(GET_EMAIL_TEMPLATE_BY_ID);

  useEffect(() => {
    if (loading === false) {
      const { viewEmailTemplate = {} } = emailTemplate ? emailTemplate : {};
      const {
        type = '',
        menuEntry = '',
        subject = '',
        body = ''
      } = viewEmailTemplate ? viewEmailTemplate : {};
      const contentBlock = body ? htmlToDraft(body) : '';
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        console.log('viewEmailTemplate', viewEmailTemplate);
        setTemplateData({
          type: type,
          menuEntry: menuEntry,
          subject: subject,
          body: editorState,
          id: 1
        });
      }
    }
  }, [emailTemplate]);

  useEffect(() => {
    // call query
    fetchTemplateList({
      variables: {
        type: 'Test1'
      }
    });
  }, []);

  // Submit handler
  const handleSubmit = async (
    { type, menuEntry, subject, body, id }: IEmailTemplateValues,
    { resetForm }: FormikHelpers<IEmailTemplateValues>
  ) => {
    const emailTemplateInput: IEmailTemplateValues = {
      type,
      menuEntry,
      subject,
      body: body ? draftToHtml(convertToRaw(body.getCurrentContent())) : ''
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
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      toast.error(message);
    }
    resetForm();
  };
  const onTemplateSelection = async () => {
    await fetchTemplateById({
      variables: {
        id: 1
      }
    });
  };
  // To use formik submit form outside
  const bindSubmitForm = (submitForm: any) => {
    submitMyForm = submitForm;
  };
  logger('templateData', templateData);
  console.log('emailTemplate111', emailTemplate);

  return (
    <>
      <div className='common-detail-page'>
        <div className='common-detail-section'>
          <EmailTemplateMenu
            handleSubmit={() => {
              submitMyForm();
            }}
            onAddNewTemplate={() => setTemplateData(null)}
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
