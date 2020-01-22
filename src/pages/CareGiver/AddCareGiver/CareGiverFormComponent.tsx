import React, { FunctionComponent } from 'react';
import { Col, Row, Button } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import { FormikProps, Form } from 'formik';
import {
  CareGiverValues,
  IReactSelectInterface,
  ICountry,
  ICountries,
  IStates,
  IState,
} from '../../../interfaces';
import { CountryQueries } from '../../../queries';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { languageTranslation } from '../../../helpers';
import PersonalInfoFormComponent from '../PersonalInfo/PersonalInfoFormComponent';
import BillingSettingsFormComponent from '../PersonalInfo/BillingSettingsFormComponent';
import QualificationFormComponent from '../PersonalInfo/QualificationFormComponent';
import AttributeFormComponent from '../PersonalInfo/AttributesFromComponent';
import RemarkFormComponent from '../PersonalInfo/RemarkFormComponent';
import '../caregiver.scss';

const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;

const CareGiverFormComponent: FunctionComponent<FormikProps<
  CareGiverValues
>> = (props: FormikProps<CareGiverValues>) => {
  const { values } = props;
  const handleField = (e: any) => {
    const value = {
      createdBy: `${values.firstName} ${values.lastName}`,
      description: e.target.value,
    };
    props.setFieldValue('remarks', [value]);
  };
  // To fetch the list of countries
  const { data, loading, error, refetch } = useQuery<ICountries>(GET_COUNTRIES);
  // To fetch the states of selected contry & don't want to query on initial load
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY,
  );
  const countriesOpt: IReactSelectInterface[] | undefined = [];
  const statesOpt: IReactSelectInterface[] | undefined = [];
  if (data && data.countries) {
    data.countries.forEach(({ id, name }: ICountry) =>
      countriesOpt.push({
        label: name,
        value: id,
      }),
    );
  }
  if (statesData && statesData.states) {
    statesData.states.forEach(({ id, name }: IState) =>
      statesOpt.push({
        label: name,
        value: id,
      }),
    );
  }
  return (
    <Form className='form-section forms-main-section'>
      <Button
        disabled={false}
        id={'caregiver-add-btn'}
        onClick={props.handleSubmit}
        color={'primary'}
        className={'save-button'}
      >
        {languageTranslation('SAVE_BUTTON')}
      </Button>
      <Row className={'m-0'}>
        <Col lg={'4'}>
          <PersonalInfoFormComponent {...props} />
        </Col>
        <Col lg={'4'}>
          <div className='common-col'>
            <BillingSettingsFormComponent {...props} />
            <div className='quality-attribute-section d-flex flex-column'>
              <QualificationFormComponent {...props} />
              <AttributeFormComponent {...props} />
            </div>
          </div>
        </Col>
        <RemarkFormComponent />
      </Row>
    </Form>
  );
};

export default CareGiverFormComponent;
