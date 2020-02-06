import React, { FunctionComponent } from 'react';
import { Row, Col, FormGroup, Label, Input, Table } from 'reactstrap';
import { FormikProps } from 'formik';
import { Editor } from 'react-draft-wysiwyg';
import { IEmailTemplateValues } from '../../../../../interfaces';
import { languageTranslation, stripHtml } from '../../../../../helpers';
import { ErroredFieldComponent } from '../../../components/ErroredFieldComponent';
import CreatableSelect from 'react-select/creatable';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

export const TemplateFormComponent: FunctionComponent<FormikProps<
  IEmailTemplateValues
> & {
  typeListOptions?: any;
  setTypeId?: any;
  setTemplateData?: any;
}> = (
  props: FormikProps<IEmailTemplateValues> & {
    typeListOptions?: any;
    setTypeId?: any;
  },
) => {
  const {
    values: { type, menuEntry, subject, body, id },
    touched,
    errors,
    setFieldValue,
    handleChange,
    typeListOptions,
    setTypeId,
  } = props;
  const typeError: any = errors.type;

  const handleTypeSelect = (newValue: any, actionMeta: any) => {
    setFieldValue('type', newValue);
    setTypeId(parseInt(newValue.value));
    if (actionMeta.action === 'create-option') {
    }
  };
  let content = body ? draftToHtml(convertToRaw(body.getCurrentContent())) : '';
  const result = stripHtml(content);
  return (
    <Col lg={'5'}>
      <h5 className='content-title'>{languageTranslation('DETAILS')}</h5>
      <div className='form-section'>
        <div className='form-card minheight-auto '>
          <Row>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='4'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('ID')}
                      <span className='required'>*</span>
                    </Label>
                  </Col>
                  <Col sm='8'>
                    <div>
                      <Input
                        type='text'
                        name={'id'}
                        value={id ? id : ''}
                        disabled={true}
                        placeholder='ID'
                        className='width-common'
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='4'>
                    <Label className='form-label col-form-label'>
                      <Label className='form-label col-form-label inner-label'>
                        {languageTranslation('TYPE')}
                        <span className='required'>*</span>
                      </Label>
                    </Label>
                  </Col>
                  <Col sm='8'>
                    <div>
                      <CreatableSelect
                        classNamePrefix='custom-inner-reactselect'
                        className={
                          typeError && typeError.value && touched.type
                            ? 'error custom-reactselect'
                            : 'custom-reactselect'
                        }
                        onChange={handleTypeSelect}
                        value={type && type.label !== '' ? type : null}
                        options={typeListOptions}
                        placeholder={'Create and select type'}
                      />
                      <ErroredFieldComponent
                        errors={typeError ? typeError.value : ''}
                        touched={touched.type}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='4'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('MENU_ENTRY')}
                    </Label>
                  </Col>
                  <Col sm='8'>
                    <div>
                      <Input
                        type='text'
                        name={'menuEntry'}
                        value={menuEntry}
                        placeholder={languageTranslation('MENU_ENTRY')}
                        onChange={handleChange}
                        className={
                          errors.menuEntry && touched.menuEntry
                            ? 'text-input error text-capitalize'
                            : 'text-input text-capitalize'
                        }
                      />
                      <ErroredFieldComponent
                        errors={errors.menuEntry}
                        touched={touched.menuEntry}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='4'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('SUBJECT')}{' '}
                    </Label>
                  </Col>
                  <Col sm='8'>
                    <div>
                      <Input
                        type='text'
                        name={'subject'}
                        value={subject}
                        placeholder={languageTranslation('SUBJECT')}
                        className={
                          errors.subject && touched.subject
                            ? 'text-input error text-capitalize'
                            : 'text-input text-capitalize'
                        }
                        onChange={handleChange}
                      />
                      <ErroredFieldComponent
                        errors={errors.subject}
                        touched={touched.subject}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <div>
                  <Editor
                    editorState={body}
                    toolbarClassName='toolbarClassName'
                    wrapperClassName='wrapperClassName'
                    editorClassName='editorClassName'
                    onEditorStateChange={editorState =>
                      setFieldValue('body', editorState)
                    }
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
                  {touched.body &&
                  (errors.body || !result || (result && result.length < 2)) ? (
                    <div className='required-error'>
                      {errors.body || languageTranslation('REQUIRED_BODY')}
                    </div>
                  ) : null}
                </div>
              </FormGroup>
            </Col>
          </Row>
        </div>
      </div>
      <Table bordered hover responsive className='mail-table'>
        <thead className='thead-bg'>
          <tr>
            <th className='file-name'>{languageTranslation('FILE_NAME')}</th>
            <th className='size-col'>{languageTranslation('SIZE')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='file-name'>pan card.PDF</td>
            <td className='size-col'>1kb</td>
          </tr>
          <tr>
            <td className='file-name'>voter id.pdf</td>
            <td className='size-col'>2kb</td>
          </tr>

          <tr>
            <td className='file-name'>pan card.PDF</td>
            <td className='size-col'>5kb</td>
          </tr>
          <tr>
            <td className='file-name'>voter id.pdf</td>
            <td className='size-col'>1kb</td>
          </tr>
          <tr>
            <td className='file-name'>pan card.PDF</td>
            <td className='size-col'>1kb</td>
          </tr>
          <tr>
            <td className='file-name'>voter id.pdf</td>
            <td className='size-col'>1kb</td>
          </tr>
          <tr>
            <td className='file-name'>adhar card.pdf</td>
            <td className='size-col'>1kb</td>
          </tr>
          <tr>
            <td className='file-name'>voter id.pdf</td>
            <td className='size-col'>3kb</td>
          </tr>
        </tbody>
      </Table>
    </Col>
  );
};
