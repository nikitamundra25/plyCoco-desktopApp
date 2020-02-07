import React, { FunctionComponent } from 'react';
import { FormGroup, Form, Button, Label, Input } from 'reactstrap';
import { languageTranslation } from '../../../../helpers';
import { IAddAttributeProps } from '../../../../interfaces';

const AddAttribute: FunctionComponent<IAddAttributeProps> = (
  props: IAddAttributeProps
) => {
  const {
    handleSubmit,
    onChange,
    newAttribute,
    isSubmit,
    data,
    attributeName
  } = props;
  console.log('attributeName', attributeName);

  return (
    <Form onSubmit={handleSubmit} className='form-section'>
      <FormGroup>
        <div className='d-flex align-items-sm-center flex-column flex-sm-row justify-content-center'>
          <div className='mr-3 position-relative '>
            <Label className='form-label col-form-label '>
              {attributeName
                ? 'Add' + ' ' + attributeName
                : 'Add Acquisition Attributes'}
              <span className='required'>*</span>
            </Label>
          </div>
          <div className='mr-3 region-input required-input  position-relative'>
            <Input
              type='text'
              name={'newAttribute'}
              placeholder={languageTranslation('ATTRIBUTE_NAME')}
              onChange={onChange}
              maxLength='250'
              value={newAttribute.trimStart()}
              className={
                isSubmit && !newAttribute
                  ? 'text-input error my-2 my-sm-0'
                  : 'text-input my-2 my-sm-0'
              }
            />
            {isSubmit && !newAttribute ? (
              <div className='required-tooltip'>
                {languageTranslation('REQUIRED_ATTRIBUTE_NAME')}
              </div>
            ) : null}
          </div>
          <div className='mr-3'>
            <Button
              color={'primary'}
              className={'btn-region'}
              onClick={handleSubmit}
            >
              {/* {isSubmitting === true ? (
                <i className='fa fa-spinner fa-spin loader' />
              ) : (
                ''
              )} */}
              {languageTranslation('SAVE_BUTTON')}
            </Button>
          </div>
        </div>
      </FormGroup>
      <div className='d-flex align-items-center '>
        <div className='mandatory-text'>
          {languageTranslation('REQUIRED_FIELD')}
        </div>
      </div>
    </Form>
  );
};

export default AddAttribute;
