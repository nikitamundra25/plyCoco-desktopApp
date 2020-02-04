import React, { FunctionComponent, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { useParams } from 'react-router';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { languageTranslation } from '../../../../../helpers';
import { EmailTemplateQueries } from '../../../../../graphql/queries';
import {
  IReactSelectInterface,
  IAddEmailVariables,
} from '../../../../../interfaces';
import { EmailFormComponent } from './EmailFormComponent';
import { CareGiverMutations } from '../../../../../graphql/Mutations';
import { toast } from 'react-toastify';

const [GET_EMAIL_TEMPLATE] = EmailTemplateQueries;
const [, , , , , , NEW_EMAIL] = CareGiverMutations;
let toastId: any = null;

const NewEmail: FunctionComponent = () => {
  let { id } = useParams();
  const [subject, setSubject] = useState<string>('');
  const [body, setBody] = useState<any>(undefined);
  //To get all email templates of care giver addded in system
  const {
    data,
    loading: fetchTemplateListLoading,
    refetch: listRefetch,
  } = useQuery<any>(GET_EMAIL_TEMPLATE, {
    variables: {},
  });

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
    },
  });
  const templateOptions: IReactSelectInterface[] | undefined = [];
  if (data) {
    console.log(data, 'data*****');
  }

  // Function to send new email
  const sendEmail = () => {
    console.log('in sebd emauk');

    try {
      const emailInput: IAddEmailVariables = {
        userId: id ? parseInt(id) : 0,
        to: 'caregiver',
        from: 'plycoco',
        subject,
        body: body ? draftToHtml(convertToRaw(body.getCurrentContent())) : '',
        parentId: null,
        status: 'new',
      };
      addNewEmail({ variables: { emailInput } });
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      toast.error(message);
    }
  };

  const onEditorStateChange: any = (editorState: any): void => {
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
                      <Input
                        type='text'
                        placeholder={languageTranslation('SUBJECT')}
                        className=' width-common'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSubject(e.target.value)
                        }
                      />
                    </FormGroup>
                  </div>
                  <div className='email-attributes-content new-email-select-wrap'>
                    <div className='form-section w-100'>
                      <FormGroup className='mb-0 '>
                        <Select
                          placeholder='Select Template'
                          options={templateOptions}
                          classNamePrefix='react-select'
                          className='new-email-select'
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>
              <EmailFormComponent
                subject={subject}
                body={body}
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
