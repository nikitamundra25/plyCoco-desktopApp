import React, { useState, FunctionComponent } from 'react';
import { FormGroup } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import { FormikProps } from 'formik';
import { IReactSelectInterface, ICareGiverValues } from '../../../interfaces';
import { languageTranslation } from '../../../helpers';
import Select from 'react-select';

const QualificationFormComponent: FunctionComponent<FormikProps<
  ICareGiverValues
> & { qualificationList: IReactSelectInterface[] | undefined }> = (
  props: FormikProps<ICareGiverValues> & {
    qualificationList: IReactSelectInterface[] | undefined;
  },
) => {
  const { values, initialValues, qualificationList } = props;
  let [selectedQualification, setselectedQualification] = useState<
    IReactSelectInterface
  >({
    label: '',
    value: '',
  });

  const { qualifications } = values;
  const handleQualification = (value: any) => {
    setselectedQualification((selectedQualification = value));
    let qualificationValue: any = initialValues.qualifications;
    props.setFieldValue('qualifications', value);
  };

  // props.setFieldValue("qualifications", []);
  return (
    <>
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
                {qualifications.map((qualification: IReactSelectInterface) => {
                  return <li>{qualification.label}</li>;
                })}
              </ul>
            ) : null}
          </div>
          <div className='common-list-footer form-section '>
            <FormGroup className='mb-0'>
              <Select
                isMulti
                menuPlacement={'top'}
                value={qualifications}
                name={'selectedQualification'}
                placeholder={'Add Qualification'}
                options={qualificationList}
                onChange={handleQualification}
                className='w-100'
              />
            </FormGroup>
          </div>
        </div>
      </div>

      {/* <div className="form-inner-list-section fix-height-section">
        <h5 className="content-title">Qualifications</h5>
        <Row className="custom-col">
          <Col sm={12}>
            <Card>
              <div className="form-inner-list-wrap">
                <h5 className="heading toggle-filter  ">Qualification</h5>
                <div className="form-inner-list-content-wrap">
                  <ul>
                    {initialValues.qualifications &&
                      initialValues.qualifications.map(quali => {
                        return <li>{quali}</li>;
                      })}
                  </ul>
                </div>
              </div>

              <div className="custom-select-wrap">
                <Select
                  name={"selectedQualification"}
                  placeholder={"Add Qualification"}
                  options={qualificationList}
                  onChange={handleQualification}
                  className="w-100"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div> */}
    </>
  );
};

export default QualificationFormComponent;
