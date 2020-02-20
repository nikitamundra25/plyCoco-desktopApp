import React, { FunctionComponent } from 'react';
import { FormGroup } from 'reactstrap';
import Select from 'react-select';
import { FormikProps } from 'formik';
import { languageTranslation } from '../../../../../../helpers';
import {
  ICareInstitutionFormValues,
  IHandleSelectInterface,
  IReactSelectInterface,
  IAttributeOptions
} from '../../../../../../interfaces';
import { CareInstitutionAttr } from '../../../../../../config';

const QuallificationAttribute: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
> &
  IHandleSelectInterface & {
    qualificationList: IReactSelectInterface[] | undefined;
    careInstitutionAttrOpt: IAttributeOptions[] | undefined;
  }> = (
  props: FormikProps<ICareInstitutionFormValues> &
    IHandleSelectInterface & {
      qualificationList: IReactSelectInterface[] | undefined;
      careInstitutionAttrOpt: IAttributeOptions[] | undefined;
    }
) => {
  const {
    values: { qualificationId, attributeId },
    handleSelect,
    qualificationList
  } = props;
  const colourStyles = {
    option: (styles: any, { data }: any) => {
      return {
        ...styles,
        backgroundColor: data.color,
        color:
          data.color === '#6a0dad' || data.color === '#000000' ? '#fff' : '#000'
      };
    }
  };
  return (
    <div className="quality-attribute-section d-flex flex-column">
      <div className="common-list-card">
        <div className="common-list-wrap">
          <div className="common-list-header d-flex align-items-cente justify-content-between">
            <div className="common-list-title align-middle">
              {' '}
              {languageTranslation('QUALIFICATION')}
            </div>
            <div className=" align-middle toggle-icon">
              <i className="fa fa-angle-down"></i>
            </div>
          </div>
          <div className="common-list-body custom-scrollbar">
            {qualificationId && qualificationId.length ? (
              <ul className="common-list list-unstyled">
                {qualificationId.map((qualification: IReactSelectInterface) => {
                  return <li>{qualification.label}</li>;
                })}
              </ul>
            ) : null}
          </div>
          <div className="common-list-footer ">
            <FormGroup className="mb-0">
              <Select
                placeholder={languageTranslation(
                  'CAREGIVER_QUALIFICATION_ATTRIBUTE_PLACEHOLDER'
                )}
                name={'qualificationId'}
                value={qualificationId ? qualificationId : undefined}
                onChange={(value: any) =>
                  handleSelect(value, 'qualificationId')
                }
                isMulti
                options={qualificationList}
                menuPlacement={'top'}
                className="attribute-select"
                classNamePrefix="attribute-inner-select"
              />
            </FormGroup>
          </div>
        </div>
      </div>
      <div className="common-list-card">
        <div className="common-list-wrap">
          <div className="common-list-header d-flex align-items-cente justify-content-between">
            <div className="common-list-title align-middle">
              {' '}
              {languageTranslation('ATTRIBUTES')}
            </div>
            <div className=" align-middle toggle-icon">
              <i className="fa fa-angle-down"></i>
            </div>
          </div>
          <div className="common-list-body custom-scrollbar">
            <ul className="common-list list-unstyled">
              {attributeId && attributeId.length
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
                                : '#000'
                          }}
                        >
                          {label}{' '}
                        </li>
                      );
                    }
                  )
                : null}
            </ul>
          </div>
          <div className="common-list-footer  ">
            <FormGroup className="mb-0">
              <Select
                placeholder={languageTranslation('ATTRIBUTE_PLACEHOLDER')}
                value={attributeId ? attributeId : undefined}
                onChange={(value: any) => handleSelect(value, 'attributeId')}
                isMulti
                options={props.careInstitutionAttrOpt}
                // options={CareInstitutionAttr}
                menuPlacement={'top'}
                className="attribute-select"
                classNamePrefix="attribute-inner-select"
                styles={colourStyles}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuallificationAttribute;
