import React, { FunctionComponent, useEffect } from 'react';
import { Col, Row, Button } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import { FormikProps, Form } from 'formik';
import {
  IReactSelectInterface,
  ICountry,
  ICountries,
  IStates,
  IState,
  ICareGiverValues,
} from '../../../../../interfaces';
import {
  CountryQueries,
  GET_QUALIFICATION_ATTRIBUTE,
  CareGiverQueries,
} from '../../../../../graphql/queries';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { languageTranslation, logger } from '../../../../../helpers';
import PersonalInfoFormComponent from '../PersonalInfo/PersonalInfoFormComponent';
import BillingSettingsFormComponent from '../PersonalInfo/BillingSettingsFormComponent';
import QualificationFormComponent from '../PersonalInfo/QualificationFormComponent';
import AttributeFormComponent from '../PersonalInfo/AttributesFromComponent';
import RemarkFormComponent from '../PersonalInfo/RemarkFormComponent';
import { IQualifications } from '../../../../../interfaces/qualification';
import '../caregiver.scss';

const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;
const [GET_CAREGIVERS] = CareGiverQueries;

const CareGiverFormComponent: FunctionComponent<FormikProps<
  ICareGiverValues
> & { setRemarksDetail: any; remarksDetail: any }> = (
  props: FormikProps<ICareGiverValues> & {
    setRemarksDetail: any;
    remarksDetail: any;
  },
) => {
  const { values, setRemarksDetail, remarksDetail } = props;
  const handleField = (e: any) => {
    const value = {
      createdBy: `${values.firstName} ${values.lastName}`,
      description: e.target.value,
    };
    props.setFieldValue('remarks', [value]);
  };
  // To fetch the list of all caregiver
  const [fetchCareGivers, { data: careGivers }] = useLazyQuery<any>(
    GET_CAREGIVERS,
  );

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
  // To fecth qualification attributes list
  const { data: qualificationData } = useQuery<IQualifications>(
    GET_QUALIFICATION_ATTRIBUTE,
  );
  const qualificationList: IReactSelectInterface[] | undefined = [];
  if (qualificationData && qualificationData.getQualificationAttributes) {
    qualificationData.getQualificationAttributes.forEach((quali: any) => {
      qualificationList.push({
        label: quali.attributeName,
        value: quali.id,
      });
    });
  }
  useEffect(() => {
    // Fetch list of caregivers
    fetchCareGivers({
      variables: {
        searchBy: '',
        sortBy: 3,
        limit: 200,
        page: 1,
        isActive: '',
      },
    });
  }, []);
  //Fetch careInstitutionList
  const careGiverOpt: IReactSelectInterface[] | undefined = [];
  if (
    careGivers &&
    careGivers.getCaregivers &&
    careGivers.getCaregivers.result
  ) {
    careGiverOpt.push({
      label: languageTranslation('NAME'),
      value: languageTranslation('ID'),
    });
    careGivers.getCaregivers.result.forEach(
      ({ id, firstName, lastName }: any) =>
        careGiverOpt.push({
          label: `${firstName}${' '}${lastName}`,
          value: id,
        }),
    );
  }
  return (
    <Form className='form-section forms-main-section'>
      <div id={'caregiver-add-btn'}>
        <Button
          disabled={props.isSubmitting}
          // id={'caregiver-add-btn'}
          onClick={props.handleSubmit}
          color={'primary'}
          className={'save-button'}
        >
          {props.isSubmitting ? (
            <i className='fa fa-spinner fa-spin loader' />
          ) : (
            ''
          )}

          {languageTranslation('SAVE_BUTTON')}
        </Button>
      </div>
      <Row className={'m-0'}>
        <Col lg={'4'}>
          <PersonalInfoFormComponent
            {...props}
            CareInstitutionList={careGiverOpt}
          />
        </Col>
        <Col lg={'4'} className='px-lg-0'>
          <div className='common-col custom-caregiver-height custom-scrollbar'>
            <BillingSettingsFormComponent {...props} />
            <div className='quality-attribute-section d-flex flex-column'>
              <QualificationFormComponent
                {...props}
                qualificationList={qualificationList}
              />
              <AttributeFormComponent {...props} />
            </div>
          </div>
        </Col>
        <RemarkFormComponent
          {...props}
          setRemarksDetail={setRemarksDetail}
          remarksDetail={remarksDetail}
        />
      </Row>
    </Form>
  );
};

export default CareGiverFormComponent;
