import React, { FunctionComponent, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { useParams } from 'react-router';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { toast } from 'react-toastify';
import {
  languageTranslation,
  HtmlToDraftConverter,
  logger,
  stripHtml,
} from '../../../../../helpers';
import { EmailTemplateQueries } from '../../../../../graphql/queries';
import {
  IReactSelectInterface,
  IAddEmailVariables,
  IEmailTemplateData,
  INewEmailProps,
} from '../../../../../interfaces';
import { EmailFormComponent } from './EmailFormComponent';
import { CareGiverMutations } from '../../../../../graphql/Mutations';

const [, , , GET_CAREGIVER_EMAIL_TEMPLATES] = EmailTemplateQueries;
const [, , , , , , NEW_EMAIL] = CareGiverMutations;
let toastId: any = null;

const NewEmail: FunctionComponent<INewEmailProps> = ({
  emailData,
}: INewEmailProps) => {
  let { id } = useParams();
  const [subject, setSubject] = useState<string>('');
  const [body, setBody] = useState<any>('');
  const [parentId, setParentId] = useState<number | null>(null);
  const [template, setTemplate] = useState<any>(undefined);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  //To get all email templates of care giver addded in system
  const { data, loading: fetchTemplateListLoading } = useQuery<any>(
    GET_CAREGIVER_EMAIL_TEMPLATES,
    {
      variables: {
        type: languageTranslation('CAREGIVER_EMAIL_TEMPLATE_TYPE'),
      },
    },
  );

  const [addNewEmail] = useMutation<
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
      setParentId(null);
    },
  });

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
  // To set subject & body on reply
  useEffect(() => {
    if (emailData) {
      let { id = null, subject = '' } = emailData ? emailData : {};
      setParentId(id);
      setSubject(`AW: ${subject}`);
      // body = body + '<br></br>------------------------';
      // const editorState = body ? HtmlToDraftConverter(body) : '';
      // setBody(HtmlToDraftConverter(''));
    }
  }, [emailData]);
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
      const { subject, body } = templateData;
      const editorState = body ? HtmlToDraftConverter(body) : '';
      setSubject(subject);
      setBody(editorState);
    }
  };
  // Function to send new email
  const sendEmail = () => {
    let content = body
      ? draftToHtml(convertToRaw(body.getCurrentContent()))
      : '';
    const result = stripHtml(content);
    setIsSubmit(true);
    try {
      if (subject && body && result && result.length >= 2) {
        const emailInput: IAddEmailVariables = {
          userId: id ? parseInt(id) : 0,
          to: 'caregiver',
          from: 'plycoco',
          subject: subject.replace(/AW:/g, ''),
          body: body ? content : '',
          parentId,
          status: 'new',
        };
        addNewEmail({ variables: { emailInput } });
      }
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      toast.error(message);
    }
  };

  const onEditorStateChange: any = (editorState: any): void => {
    logger(editorState, 'editorState');
    setBody(editorState);
  };
  return (
    <div className='email-section'>
      {/* <EmailMenus {...this.props} /> */}
      <div className='email-content'>
        <Form className='form-section'>
          <Row>
            <Col lg={'12'}>
              <div className='email-inbox-section'>
                <div className='email-row-wrap align-items-center email-attributes-wrap'>
                  <div className='email-attributes-content d-flex align-items-center'>
                    <i className='fa fa-envelope mr-1' aria-hidden='true'></i>
                    <span> {languageTranslation('NEW_EMAIL')}</span>
                  </div>
                  <span className='email-attributes-seprator'>|</span>
                  <div className='email-attributes-content' onClick={sendEmail}>
                    <i
                      className='fa fa-paper-plane mr-1'
                      aria-hidden='true'
                    ></i>
                    <span>{languageTranslation('SEND')}</span>
                  </div>
                  <span className='email-attributes-seprator'>|</span>
                  <div className='email-attributes-content input-wrap '>
                    <FormGroup className='d-flex align-items-center m-0 w-100'>
                      <Label className='d-flex align-items-center m-0 mr-1'>
                        {languageTranslation('SUBJECT')}:{' '}
                      </Label>
                      <div className={'position-relative w-100'}>
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
                          value={template}
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
              />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};
export default NewEmail;
