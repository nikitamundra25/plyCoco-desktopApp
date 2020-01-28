import React, { FunctionComponent, useState, useEffect } from 'react';
import { Row } from 'reactstrap';
import { FormikHelpers } from 'formik';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { toast } from 'react-toastify';
import { IEmailTemplateValues, IReactSelectInterface } from '../../interfaces';
import { EmailTemplateQueries } from '../../queries';
import { EmailTemplateMenu } from './Menu';
import { EmailTemplateList } from './List';
import { AddTemplate } from './AddTemplate';
import './index.scss';
import { logger, languageTranslation } from '../../helpers';

const [
  ADD_EMAIL_TEMPLATE,
  UPDATE_EMAIL_TEMPLATE,
  GET_EMAIL_TEMPLATE_TYEPS,
] = EmailTemplateQueries;

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
  const onTemplateSelection = () => {
    let text: any = '<p>asasa</p>';
    const contentBlock = text ? htmlToDraft(text) : '';
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      const editorState = EditorState.createWithContent(contentState);
      setTemplateData({
        type: 'Test1',
        menuEntry: 'Test1',
        subject: 'Test1',
        body: editorState,
        id: 1,
      });
    }
  };
  // Function to change list according to type selected
  const onTypeChange = (selectedType: IReactSelectInterface) => {
    console.log(selectedType, 'type');
    setTemplateType(selectedType);
  };
  // To use formik submit form outside
  const bindSubmitForm = (submitForm: any) => {
    submitMyForm = submitForm;
  };
  logger('templateData', templateData);

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
                <EmailTemplateList onTemplateSelection={onTemplateSelection} />
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
