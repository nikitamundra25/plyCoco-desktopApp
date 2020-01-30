import React, { FunctionComponent } from 'react';
import { Row, Col, FormGroup, Label, Input, Table } from 'reactstrap';
import { FormikProps } from 'formik';
import { Editor } from 'react-draft-wysiwyg';
import {
  IEmailTemplateValues,
  IReactSelectInterface
} from '../../../../../interfaces';
import { languageTranslation } from '../../../../../helpers';
import { ErroredFieldComponent } from '../../../components/ErroredFieldComponent';
import CreatableSelect from 'react-select/creatable';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { EmailTemplateQueries } from '../../../../../graphql/queries';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const TemplateFormComponent: FunctionComponent<FormikProps<
  IEmailTemplateValues
> & {
  typeListOptions?: any;
}> = (
  props: FormikProps<IEmailTemplateValues> & {
    typeListOptions?: any;
  }
) => {
  const {
    values: { type, menuEntry, subject, body, id },
    touched,
    errors,
    setFieldValue,
    handleChange,
    typeListOptions
  } = props;

  const handleTypeSelect = (newValue: any, actionMeta: any) => {
    console.log(newValue);
    setFieldValue('type', newValue);
    if (actionMeta.action === 'create-option') {
      console.log('yguyu', actionMeta.action);
    }
  };
  // const handleInputChange = (inputValue: any) => {
  //   console.log(inputValue);
  // };
  // console.log('typeListOptions', typeListOptions);

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
                      {languageTranslation('ID')}{' '}
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
                      {/* <CreatableSelect
                        isClearable
                        onChange={handleTypeSelect}
                        onInputChange={handleInputChange}
                        placeholder={'Select Type'}
                        options={typeListOptions}
                        value={type}
                      /> */}

                      <CreatableSelect
                        classNamePrefix='react_select'
                        onChange={handleTypeSelect}
                        value={type}
                        options={typeListOptions}
                        // options={colourOptions}
                      />

                      <ErroredFieldComponent
                        errors={errors.type}
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
                        className='width-common'
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
                        className='width-common'
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
                        'link'
                      ],
                      inline: {
                        options: ['bold', 'italic', 'underline']
                      },
                      fontSize: {
                        className: 'bordered-option-classname'
                      },
                      fontFamily: {
                        className: 'bordered-option-classname'
                      },
                      list: {
                        inDropdown: false,
                        options: ['unordered']
                      },
                      link: {
                        options: ['link']
                      }
                    }}
                  />
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
