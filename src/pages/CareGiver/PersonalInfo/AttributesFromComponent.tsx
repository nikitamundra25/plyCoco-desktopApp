import React from 'react';
import { FormGroup } from 'reactstrap';
import { CareGiveAttributes } from '../../../config';
import { FormikProps } from 'formik';
import { CareGiverValues, IReactSelectInterface } from '../../../interfaces';
import { languageTranslation } from '../../../helpers';
import Select from 'react-select';

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
            {/* <ul className="common-list list-unstyled">
              <li>Dialysis </li>
              <li>Home Management</li>
              <li>Nurse/carer</li>
            </ul> */}
          </div>
          <div className='common-list-footer form-section '>
            <FormGroup className='mb-0'>
              <Select
                placeholder={'Attributes'}
                value={attributeId ? attributeId : undefined}
                onChange={(value: any) => handleSelect(value, 'attributeId')}
                isMulti
                options={CareGiveAttributes}
                menuPlacement={'top'}
              />
            </FormGroup>
          </div>
        </div>
      </div>
      {/* <div className="form-inner-list-section mt-3 fix-height-section">
        <h5 className="content-title">Attributes</h5>
        <Row className="custom-col">
          <Col sm={12}>
            <Card>
              <div className="form-inner-list-wrap">
                <h5 className="heading toggle-filter  ">Attribut</h5>
                <div className="form-inner-list-content-wrap">
                  <ul>
                    <li className="ative">Aaron, Hank </li>
                    <li>Abbey, Edward</li>
                    <li>Abel, Reuben</li>
                    <li> Abelson, Hal</li>
                    <li>Abourezk, James </li>
                    <li>Abrams, Creighton </li>
                  </ul>
                </div>
              </div>

              <div className="custom-select-wrap">
                <select className="w-100">
                  <option>Bernhard, Sandra</option>
                  <option>Berlin, Irving</option>
                  <option>Berne, Eric</option>
                  <option>Berry, Halle</option>
                </select>
              </div>
            </Card>
          </Col>
        </Row>
      </div> */}
    </>
  );
};

export default AttributeFormComponent;
