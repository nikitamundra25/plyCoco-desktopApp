import React, { FunctionComponent, useState } from 'react';
import { Row } from 'reactstrap';
import { FormikHelpers } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { EmailTemplateMenu } from './Menu';
import { EmailTemplateList } from './List';
import { AddTemplate } from './AddTemplate';
import { IEmailTemplateValues } from '../../interfaces';
import { EmailTemplateQueries } from '../../queries';
import './index.scss';

const [ADD_EMAIL_TEMPLATE, UPDATE_EMAIL_TEMPLATE] = EmailTemplateQueries;

export const EmailTemplateManagement: FunctionComponent = () => {
  let submitMyForm: any = null;
  const [templateData, setTemplateData] = useState<IEmailTemplateValues | null>(
    null,
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
  // Submit handler
  const handleSubmit = async (
    { type, menuEntry, subject, body }: IEmailTemplateValues,
    { resetForm }: FormikHelpers<IEmailTemplateValues>,
  ) => {
    console.log(type, menuEntry, subject, body, 'values on handle submit');
    try {
      addEmail({
        variables: {
          emailTemplateInput: {
            type,
            menuEntry,
            subject,
            body:
              body && body.editorState
                ? draftToHtml(
                    convertToRaw(body.editorState.getCurrentContent()),
                  )
                : '',
          },
        },
      });
    } catch (error) {}
    resetForm();
  };
  const onTemplateSelection = () => {
    setTemplateData({
      type: 'Test1',
      menuEntry: 'Test1',
      subject: 'Test1',
      body: 'Test1',
      id: 1,
    });
  };
  // To use formik submit form outside
  const bindSubmitForm = (submitForm: any) => {
    submitMyForm = submitForm;
  };
  return (
    <>
      <div className='common-detail-page'>
        <div className='common-detail-section'>
          <EmailTemplateMenu
            handleSubmit={() => {
              console.log('dfkdslfjdsfkjdskfjskfjdsk');
              submitMyForm();
            }}
          />
          <div className='common-content flex-grow-1'>
            <div>
              <Row>
                <EmailTemplateList onTemplateSelection={onTemplateSelection} />
                <AddTemplate
                  handleSubmit={handleSubmit}
                  bindSubmitForm={bindSubmitForm}
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
