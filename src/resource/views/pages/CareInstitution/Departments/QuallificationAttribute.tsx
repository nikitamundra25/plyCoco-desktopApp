import React, { FunctionComponent } from 'react';
import { FormGroup } from 'reactstrap';
import Select from 'react-select';
import { FormikProps } from 'formik';
import { languageTranslation } from '../../../../../helpers';
import {
  IReactSelectInterface,
  IQuallificationAttribute,
} from '../../../../../interfaces';
import { CareInstitutionAttr } from '../../../../../config';

const QuallificationAttribute: FunctionComponent<FormikProps<
  IQuallificationAttribute
> &
  any> = (props: FormikProps<IQuallificationAttribute> & any) => {
  const selectQualification = async (value: any) => {
    setQualifications(value);
  };

  const selectAttribute = async (value: any) => {
    setAttributes(value);
  };

  const {
    qualifications,
    setQualifications,
    qualificationList,
    attributes,
    setAttributes,
  } = props;

  return (
    <div className='quality-attribute-section d-flex flex-column'>
      <div className='common-list-card'>
        <h5 className='content-title'>
          {languageTranslation('QUALIFICATIONS')}
        </h5>
        <div className='common-list-wrap'>
          <div className='common-list-header d-flex align-items-cente justify-content-between'>
            <div className='common-list-title align-middle'>
              {' '}
              {languageTranslation('QUALIFICATION')}
            </div>
            <div className=' align-middle toggle-icon'>
              <i className='fa fa-angle-down'></i>
            </div>
          </div>
          <div className='common-list-body'>
            {qualifications && qualifications.length ? (
              <ul className='common-list list-unstyled'>
                {qualifications.map(
                  (q: IReactSelectInterface, index: number) => {
                    return <li key={index}>{q.label}</li>;
                  },
                )}
              </ul>
            ) : null}
          </div>
          <div className='common-list-footer '>
            <FormGroup className='mb-0'>
              <Select
                placeholder={'Please Select Qualification from the dropdown'}
                name={'qualifications'}
                value={qualifications}
                onChange={(value: any) => selectQualification(value)}
                isMulti
                options={qualificationList}
                menuPlacement={'top'}
                className='attribute-select'
                classNamePrefix='attribute-inner-select'
              />
            </FormGroup>
          </div>
        </div>
      </div>
      <div className='common-list-card'>
        <h5 className='content-title'>{languageTranslation('ATTRIBUTES')}</h5>
        <div className='common-list-wrap'>
          <div className='common-list-header d-flex align-items-cente justify-content-between'>
            <div className='common-list-title align-middle'>
              {' '}
              {languageTranslation('ATTRIBUTES')}
            </div>
            <div className=' align-middle toggle-icon'>
              <i className='fa fa-angle-down'></i>
            </div>
          </div>
          <div className='common-list-body'>
            <ul className='common-list list-unstyled'>
              {attributes && attributes.length
                ? attributes.map((a: IReactSelectInterface, index: number) => {
                    return <li key={index}>{a.label} </li>;
                  })
                : null}
            </ul>
          </div>
          <div className='common-list-footer  '>
            <FormGroup className='mb-0'>
              <Select
                placeholder={' Please Select Attribute from the dropdown'}
                name={'attributes'}
                value={attributes}
                onChange={(value: any) => selectAttribute(value)}
                isMulti
                options={CareInstitutionAttr}
                menuPlacement={'top'}
                className='attribute-select'
                classNamePrefix='attribute-inner-select'
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuallificationAttribute;
