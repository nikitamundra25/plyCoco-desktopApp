import React, { FunctionComponent } from 'react';
import { FormGroup } from 'reactstrap';
import Select from 'react-select';
import { FormikProps } from 'formik';
import {
  IReactSelectInterface,
  ICareGiverValues,
  IAttributeOptions,
} from '../../../../../interfaces';
import { languageTranslation } from '../../../../../helpers';

const AttributeFormComponent: FunctionComponent<FormikProps<
  ICareGiverValues
> & {
  caregiverAttrOpt?: IAttributeOptions[] | undefined;
}> = (
  props: FormikProps<ICareGiverValues> & {
    caregiverAttrOpt?: IAttributeOptions[] | undefined;
  },
) => {
  const {
    values: { attributeId },
    setFieldValue,
    caregiverAttrOpt,
  } = props;
  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    setFieldValue(name, selectOption);
  };
  const colourStyles = {
    option: (styles: any, { data }: any) => {
      return {
        ...styles,
        backgroundColor: data.color,
        color:
          data.color === '#6a0dad' || data.color === '#000000'
            ? '#fff'
            : '#000',
      };
    },
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
                    ({ label, color }: IAttributeOptions, index: number) => {
                      return (
                        <li
                          key={index}
                          style={{
                            backgroundColor: color ? color : '',
                            color:
                              color === '#6a0dad' || color === '#000000'
                                ? '#fff'
                                : '#000',
                          }}
                          className='text-capitalize'
                        >
                          {label}
                        </li>
                      );
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
                options={caregiverAttrOpt}
                menuPlacement={'top'}
                className='attribute-select'
                classNamePrefix='attribute-inner-select'
                // components={{ Option: CustomOption }}
                styles={colourStyles}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttributeFormComponent;
