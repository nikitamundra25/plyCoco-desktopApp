import React, { FunctionComponent } from 'react';
import { Row, Col, FormGroup, Label, Input, Table } from 'reactstrap';
import { FormikProps } from 'formik';
import { Editor } from 'react-draft-wysiwyg';
import {
  IEmailTemplateValues,
  IReactSelectInterface,
} from '../../../../../interfaces';
import { languageTranslation } from '../../../../../helpers';
import { ErroredFieldComponent } from '../../../components/ErroredFieldComponent';
import CreatableSelect from 'react-select/creatable';
import { useQuery } from '@apollo/react-hooks';
import { EmailTemplateQueries } from '../../../../../graphql/queries';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const [, , GET_EMAIL_TEMPLATE_TYEPS] = EmailTemplateQueries;

export const TemplateFormComponent: FunctionComponent<FormikProps<
  IEmailTemplateValues
>> = (props: FormikProps<IEmailTemplateValues>) => {
  const {
    values: { type, menuEntry, subject, body, id },
    touched,
    errors,
    setFieldValue,
    handleChange,
  } = props;
  const { data: typeList, loading, refetch } = useQuery(
    GET_EMAIL_TEMPLATE_TYEPS,
  );
  const typeListOptions: IReactSelectInterface[] | undefined = [];
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
  // const [addType] = useMutation<
  //   {
  //     addType: any;
  //   },
  //   {
  //     emailTemplateInput: IEmailTemplateValues;
  //   }
  // >(ADD_EMAIL_TEMPLATE_TYPES)

  const handleChangeSelect = (newValue: any) => {
    console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
  };
  const handleInputChange = (inputValue: any) => {
    console.log(inputValue);
    // console.log(`action: ${actionMeta.action}`);
  };
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
                        name={'menuEntry'}
                        value={menuEntry}
                        placeholder={languageTranslation('ID')}
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
                      <Label className='form-label col-form-label inner-label'>
                        {languageTranslation('TYPE')}
                        <span className='required'>*</span>
                      </Label>
                    </Label>
                  </Col>
                  <Col sm='8'>
                    <div>
                      <CreatableSelect
                        isClearable
                        onChange={handleChangeSelect}
                        onInputChange={handleInputChange}
                        placeholder={'Select Type'}
                        options={typeListOptions}
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
