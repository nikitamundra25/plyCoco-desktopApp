import React, { FunctionComponent } from 'react';
import { Button, Col, Row, FormGroup } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { languageTranslation } from '../../../../../helpers';
import { IEmailFormComponentPorps } from '../../../../../interfaces';

export const EmailFormComponent: FunctionComponent<IEmailFormComponentPorps> = (
  props: IEmailFormComponentPorps,
) => {
  const { body, onEditorStateChange, sendEmail } = props;
  return (
    <div className='form-card'>
      <Row>
        <Col lg={'12'}>
          <FormGroup>
            <Row>
              <Col sm='12'>
                <div>
                  <Editor
                    editorState={body}
                    toolbarClassName='toolbarClassName'
                    wrapperClassName='wrapperClassName'
                    editorClassName='editorClassName'
                    placeholder='Enter Email Here'
                    toolbar={{
                      options: [
                        'inline',
                        'blockType',
                        'fontSize',
                        'list',
                        'textAlign',
                        'link',
                      ],
                      inline: {
                        options: ['bold', 'italic', 'underline'],
                      },
                      fontSize: {
                        className: 'bordered-option-classname',
                      },
                      fontFamily: {
                        className: 'bordered-option-classname',
                      },
                      list: {
                        inDropdown: false,
                        options: ['unordered'],
                      },
                      link: {
                        options: ['link'],
                      },
                    }}
                    onEditorStateChange={onEditorStateChange}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>
        {/* <Col lg={'12'}>
          <div className='d-flex align-items-center justify-content-end'>
            <div>
              <Button
                color='primary'
                type='submit'
                className='btn-sumbit'
                onClick={sendEmail}
              >
                {languageTranslation('SEND')}
              </Button>
            </div>
          </div>
        </Col> */}
      </Row>
    </div>
  );
};
