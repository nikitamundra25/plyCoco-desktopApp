import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { Button, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import EmailMenus from './EmailMenus';
import { RouteComponentProps } from 'react-router';
import Select from 'react-select';
import { languageTranslation } from '../../../helpers';

class Email extends Component<RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }
  options = [
    { value: 'Denis', label: 'Aaron, Hank' },
    { value: 'Denis', label: 'Bergman, Ingmar' },
    { value: 'Beck, Glenn', label: 'Berle, Milton' },
  ];
  onEditorStateChange = (editorState: any) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;

    return (
      <div className='email-section'>
        <EmailMenus {...this.props} />
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
                    <div className='email-attributes-content'>
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
                          placeholder=' Street'
                          className=' width-common'
                        />
                      </FormGroup>
                    </div>
                    <div className='email-attributes-content new-email-select-wrap'>
                      <Select
                        placeholder='Select Region'
                        options={this.options}
                        classNamePrefix='react-select'
                        className='new-email-select'
                      />
                    </div>
                  </div>
                </div>

                <div className='form-card'>
                  <Row>
                    <Col lg={'12'}>
                      <FormGroup>
                        <Row>
                          <Col sm="12">
                            <div>
                              <Input
                                type='text'
                                name={'subject'}
                                placeholder='Subject'
                              />
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col lg={'12'}>
                      <FormGroup>
                        <Row>
                          <Col sm="12">
                            <div>
                              <Editor
                                editorState={editorState}
                                toolbarClassName='toolbarClassName'
                                wrapperClassName='wrapperClassName'
                                editorClassName='editorClassName'
                                onEditorStateChange={this.onEditorStateChange}
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
                              />
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col lg={'12'}>
                      <div className='d-flex align-items-center justify-content-end'>
                        <div>
                          <Button
                            color='primary'
                            type='submit'
                            className='btn-sumbit'
                          >
                            {languageTranslation('SEND')}
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}
export default Email;