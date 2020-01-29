import React from 'react';
import { FormGroup } from 'reactstrap';
import Select from 'react-select';
import { CareGiveAttributes } from '../../../../../config';
import { FormikProps } from 'formik';
import {
  CareGiverValues,
  IReactSelectInterface,
} from '../../../../../interfaces';
import { languageTranslation } from '../../../../../helpers';

const AttributeFormComponent: any = (props: FormikProps<CareGiverValues>) => {
  const {
    values: { attributeId },
    setFieldValue,
  } = props;
  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    setFieldValue(name, selectOption);
  };
  return (
    <>
      <div className='common-list-card'>
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
          <div className='common-list-body custom-scrollbar'>
            <ul className='common-list list-unstyled mb-0'>
              {attributeId
                ? attributeId.map(
                    ({ label }: IReactSelectInterface, index: number) => {
                      return <li key={index}>{label}</li>;
                    },
                  )
                : null}
            </ul>
          </div>
          <div className='common-list-footer  '>
            <FormGroup className='mb-0'>
              <Select
                placeholder={languageTranslation('ATTRIBUTE_PLACEHOLDER')}
                value={attributeId ? attributeId : undefined}
                onChange={(value: any) => handleSelect(value, 'attributeId')}
                isMulti
                options={CareGiveAttributes}
                menuPlacement={'top'}
                className='attribute-select'
                classNamePrefix='attribute-inner-select'
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttributeFormComponent;
