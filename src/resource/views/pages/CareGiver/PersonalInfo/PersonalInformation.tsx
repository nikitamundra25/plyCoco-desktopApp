import React, { FunctionComponent, useState, useEffect } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useParams, useHistory } from 'react-router';
import {
  languageTranslation,
  germanNumberFormat
} from '../../../../../helpers';
import PersonalInfoFormComponent from './PersonalInfoFormComponent';
import BillingSettingsFormComponent from './BillingSettingsFormComponent';
import QualificationFormComponent from './QualificationFormComponent';
import AttributeFormComponent from './AttributesFromComponent';
import RemarkFormComponent from './RemarkFormComponent';
import { Formik, FormikHelpers, Form, FormikProps } from 'formik';
import { CareGiverQueries } from '../../../../../graphql/queries/CareGiver';
import {
  ICareGiverValues,
  IPersonalObject,
  IReactSelectInterface,
  ICountries,
  IStates,
  IAttributeValues,
  IAttributeOptions,
  ICountry,
  IState
} from '../../../../../interfaces';
import { CareGiverValidationSchema } from '../../../../validations/CareGiverValidationSchema';
import { RemarkMutations } from '../../../../../graphql/Mutations';
import { useMutation, useLazyQuery, useQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import {
  GET_QUALIFICATION_ATTRIBUTE,
  CountryQueries
} from '../../../../../graphql/queries';
import {
  IQualifications,
  IQualification
} from '../../../../../interfaces/qualification';
import { CareGiverMutations } from '../../../../../graphql/Mutations';
import { errorFormatter } from '../../../../../helpers';
let toastId: any;

const [, , , , , GET_CAREGIVER_ATTRIBUTES] = CareGiverQueries;
const [, UPDATE_CAREGIVER] = CareGiverMutations;
const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;
const [UPDATE_REMARKS] = RemarkMutations;

export const PersonalInformation: FunctionComponent<any> = (props: any) => {
  const { getCaregiver } = props;
  let { id } = useParams();
  const [remarksDetail, setRemarksDetail] = useState<any>([]);

  // to update remarks
  const [updateRemark, { data: remarkData }] = useMutation<any>(UPDATE_REMARKS);

  const { data: CountriesData } = useQuery<ICountries>(GET_COUNTRIES);
  // To fetch the states of selected contry & don't want to query on initial load
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY
  );
  const countriesOpt: IReactSelectInterface[] | undefined = [];
  const statesOpt: IReactSelectInterface[] | undefined = [];
  if (CountriesData && CountriesData.countries) {
    CountriesData.countries.forEach(({ id, name }: ICountry) =>
      countriesOpt.push({
        label: name,
        value: id
      })
    );
  }

  if (statesData && statesData.states) {
    statesData.states.forEach(({ id, name }: IState) =>
      statesOpt.push({
        label: name,
        value: id
      })
    );
  }

  // Fetch attribute list from db
  const { data: attributeData,loading } = useQuery<{
    getCaregiverAtrribute: IAttributeValues[];
  }>(GET_CAREGIVER_ATTRIBUTES);

  const caregiverAttrOpt: IAttributeOptions[] | undefined = [];

  if (attributeData && attributeData.getCaregiverAtrribute) {
    attributeData.getCaregiverAtrribute.forEach(
      ({ id, name, color }: IAttributeValues) =>
        caregiverAttrOpt.push({
          label: name,
          value: id ? id.toString() : '',
          color
        })
    );
  }

  // To update caregiver details into db
  const [updateCaregiver] = useMutation<
    {
      updateCaregiver: ICareGiverValues;
    },
    {
      id: number;
      careGiverInput:
        | IPersonalObject
        | {
            remarks: any;
          };
      isRemarkAdded?: Boolean;
    }
  >(UPDATE_CAREGIVER);

  // To fecth qualification attributes list
  const { data } = useQuery<IQualifications>(GET_QUALIFICATION_ATTRIBUTE);
  const qualificationList: IReactSelectInterface[] | undefined = [];
  if (data && data.getQualifications) {
    data.getQualifications.forEach((quali: any) => {
      qualificationList.push({
        label: quali.name,
        value: quali.id
      });
    });
  }

  //To get country details
  const { data: countries, loading: countryLoading } = useQuery<ICountries>(
    GET_COUNTRIES
  );

  useEffect(() => {
    const { caregiver = {} } = getCaregiver ? getCaregiver : {};
    const { remarks = [] } = caregiver ? caregiver : {};
    setRemarksDetail(remarks);
  }, [getCaregiver]);

  useEffect(() => {
    if (
      getCaregiver &&
      getCaregiver.caregiver &&
      getCaregiver.caregiver.countryId
    ) {
      getStatesByCountry({
        variables: {
          countryid: getCaregiver ? getCaregiver.caregiver.countryId : ''
        }
      });
    }
  }, [getCaregiver]);

  const handleSubmit = async (
    values: ICareGiverValues,
    { setSubmitting, setFieldError }: FormikHelpers<ICareGiverValues>
  ) => {
    const {
      userName,
      stateId,
      attributeId,
      gender,
      title,
      salutation,
      firstName,
      lastName,
      dateOfBirth,
      age,
      state,
      address1,
      regionId,
      address2,
      driversLicense,
      driverLicenseNumber,
      vehicleAvailable,
      street,
      city,
      postalCode,
      countryId,
      country,
      phoneNumber,
      fax,
      mobileNumber,
      email,
      taxNumber,
      socialSecurityContribution,
      belongTo,
      legalForm,
      bankName,
      companyName,
      registerCourt,
      registrationNumber,
      executiveDirector,
      employed,
      comments,
      qualifications,
      status,
      remarks,
      fee,
      nightAllowance,
      weekendAllowance,
      night,
      holiday,
      leasingPricingList,
      invoiceInterval
    } = values;

    try {
      let careGiverInput: any = {
        userName: userName ? userName.trim() : '',
        gender: gender && gender.value ? gender.value : '',
        title,
        salutation: salutation && salutation.value ? salutation.value : '',
        firstName: firstName ? firstName.trim() : '',
        lastName: lastName ? lastName.trim() : '',
        dateOfBirth,
        age: age ? parseInt(age) : null,
        address1,
        address2,
        driversLicense,
        driverLicenseNumber,
        IBAN: values.IBAN,
        vehicleAvailable,
        qualificationId:
          qualifications && qualifications.length
            ? qualifications.map((qualification: IReactSelectInterface) =>
                parseInt(qualification.value)
              )
            : null,
        street,
        attributes:
          attributeId && attributeId.length
            ? attributeId.map(({ value }: IAttributeOptions) => parseInt(value))
            : [],
        city,
        zipCode: postalCode,
        phoneNumber,
        fax,
        mobileNumber,
        email: email ? email.trim() : '',
        taxNumber,
        socialSecurityContribution,
        countryId: country && country.value ? country.value : null,
        stateId: state && state.value ? state.value : null,
        bankName,
        password,
        belongTo: belongTo && belongTo.value ? parseInt(belongTo.value) : null,
        legalForm: legalForm && legalForm.value ? legalForm.label : null,
        companyName,
        registerCourt,
        registrationNumber,
        executiveDirector,
        employed,
        comments,
        status,
        remarks: remarksDetail,
        fee: fee ? parseFloat(fee.replace(/,/g, '.')) : null,
        weekendAllowance: weekendAllowance
          ? parseFloat(weekendAllowance.replace(/,/g, '.'))
          : null,
        holiday: holiday ? parseFloat(holiday.replace(/,/g, '.')) : null,
        night: night ? parseFloat(night.replace(/,/g, '.')) : null,
        nightAllowance:
          nightAllowance && nightAllowance.value ? nightAllowance.label : null,
        regionId: regionId && regionId.value ? parseInt(regionId.value) : null,
        invoiceInterval:
          invoiceInterval && invoiceInterval.value
            ? invoiceInterval.label
            : null,
        leasingPricingList:
          leasingPricingList && leasingPricingList.value
            ? leasingPricingList.label
            : null
      };
      // Edit employee details
      if (id) {
        await updateCaregiver({
          variables: {
            id: parseInt(id),
            careGiverInput
          }
        });
        if (!toast.isActive(toastId)) {
          toast.success(languageTranslation('CARE_GIVER_UPDATED_SUCCESS'));
        }
      }
    } catch (error) {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
    setSubmitting(false);
  };

  // Save remarks into DB
  const saveRemark = async (message: string, remarksData: any) => {
    if (id) {
      try {
        await updateRemark({
          variables: {
            id: parseInt(id),
            remarks: remarksData ? remarksData : remarksDetail // send remarksData in case of delete
          }
        });
        if (!toast.isActive(toastId)) {
          toastId = toast.success(message);
        }
      } catch (error) {
        const message = errorFormatter(error);
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  };

  const {
    userName = '',
    firstName = '',
    lastName = '',
    email = '',
    gender = '',
    salutation = '',
    phoneNumber = '',
    socialSecurityContribution = false,
    password = '',
    status = 'active',
    qualifications = [],
    regions = [],
    bankDetails = {},
    caregiver = {},
    createdAt = new Date()
  } = getCaregiver ? getCaregiver : {};

  const {
    nightAllowance = undefined,
    leasingPricingList = undefined,
    invoiceInterval = undefined,
    title = null,
    dateOfBirth = null,
    age = null,
    address1 = '',
    address2 = '',
    driversLicense = '',
    driverLicenseNumber = '',
    street = '',
    city = '',
    zipCode = '',
    countryId = '',
    stateId = '',
    fax = '',
    mobileNumber = '',
    taxNumber = '',
    vehicleAvailable = '',
    belongTo = '',
    legalForm = '',
    companyName = '',
    registerCourt = '',
    registrationNumber = '',
    executiveDirector = '',
    remarks = [],
    employed = false,
    comments = '',
    fee = '',
    weekendAllowance = null,
    holiday = null,
    night = null,
    attributes = []
  } = caregiver ? caregiver : {};

  const { bankName = '', IBAN = '' } = bankDetails ? bankDetails : {};

  const qualificationsData: IReactSelectInterface[] | undefined = [];
  if (qualifications) {
    qualifications.forEach(({ name, id }: IQualification) => {
      qualificationsData.push({
        label: name,
        value: id
      });
    });
  }

  let userSelectedCountry: any = {};
  if (countries && countries.countries && countryId) {
    const userCountry = countries.countries.filter(
      (x: any) => x.id === countryId
    );
    if (userCountry && userCountry.length) {
      userSelectedCountry = {
        label: userCountry[0].name,
        value: userCountry[0].id
      };
    }
  }

  let userSelectedState: any = null;
  if (statesData && statesData.states && stateId) {
    const userState = statesData.states.filter((x: any) => x.id === stateId);
    if (userState && userState.length) {
      userSelectedState = {
        label: userState[0].name,
        value: userState[0].id
      };
    }
  }

  let selectedAttributes: IAttributeOptions[] = [];
  if (attributes && attributes.length) {
    attributes.map((attData: number) => {
      const data = caregiverAttrOpt.filter((attr: any) => {
        return parseInt(attr.value) === attData;
      })[0];
      console.log('data', data && data.label);
      selectedAttributes.push({
        label: data ? data.label : attData,
        value: data ? data.value : attData,
        color: data ? data.color : ''
      });
    });
  }

  let UserSelectedBelongsTo: IReactSelectInterface | undefined = undefined;

  if (props.careGiverOpt && props.careGiverOpt.length && belongTo) {
    UserSelectedBelongsTo = props.careGiverOpt.filter(
      (caregiver: IReactSelectInterface) =>
        parseInt(caregiver.value) === belongTo
    )[0];
  }

  const initialValues: ICareGiverValues = {
    id,
    createdAt,
    userName,
    state: userSelectedState,
    title: title || '',
    firstName,
    lastName,
    phoneNumber: phoneNumber || '',
    dateOfBirth,
    age: age || '',
    address1,
    address2,
    driversLicense,
    driverLicenseNumber,
    country:
      userSelectedCountry && userSelectedCountry.value
        ? userSelectedCountry
        : null,
    vehicleAvailable,
    street,
    city,
    postalCode: zipCode,
    countryId,
    regionId:
      regions && regions.length
        ? {
            label: regions[0].regionName,
            value: regions[0].id
          }
        : undefined,
    fax,
    mobileNumber,
    email,
    taxNumber,
    socialSecurityContribution,
    bankName: bankName || '',
    IBAN: IBAN || '',
    belongTo: UserSelectedBelongsTo ? UserSelectedBelongsTo : undefined,
    legalForm: legalForm
      ? {
          label: legalForm,
          value: legalForm
        }
      : undefined,
    companyName,
    registerCourt,
    registrationNumber,
    executiveDirector,
    employed,
    comments,
    status,
    remarks:
      remarks && remarks.length
        ? remarks
        : [
            {
              data: '',
              createdAt: '',
              createdBy: ''
            }
          ],
    remarkData: '',
    invoiceInterval: invoiceInterval
      ? {
          label: invoiceInterval,
          value: invoiceInterval
        }
      : undefined,
    qualifications: qualificationsData,
    fee: fee !== null ? germanNumberFormat(fee) : '',
    weekendAllowance:
      weekendAllowance !== null ? germanNumberFormat(weekendAllowance) : '',
    holiday: holiday !== null ? germanNumberFormat(holiday) : '',
    night: night !== null ? germanNumberFormat(night) : '',
    nightAllowance: nightAllowance
      ? {
          label: nightAllowance,
          value: nightAllowance
        }
      : undefined,
    leasingPricingList: leasingPricingList
      ? {
          label: leasingPricingList,
          value: leasingPricingList
        }
      : undefined,
    salutation: salutation
      ? {
          label: salutation,
          value: salutation
        }
      : undefined,
    gender: gender
      ? {
          label: gender,
          value: gender
        }
      : undefined,
    attributeId: selectedAttributes
  };

  const usersList = props.careGiverOpt;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      validationSchema={CareGiverValidationSchema}
      children={(props: FormikProps<ICareGiverValues>) => {
        return (
          <Form className='form-section forms-main-section'>
            <div id={'caregiver-add-btn'}>
              <Button
                disabled={props.isSubmitting}
                onClick={props.handleSubmit}
                color={'primary'}
                className={`save-button`}
              >
                {props.isSubmitting ? (
                  <i className='fa fa-spinner fa-spin mr-2' />
                ) : (
                  ''
                )}
                {languageTranslation('SAVE_BUTTON')}
              </Button>
            </div>

            <Row>
              <Col lg={4} md={'12'} sm={'12'}>
                <PersonalInfoFormComponent
                  {...props}
                  CareInstitutionList={usersList}
                  countriesOpt={countriesOpt}
                  userSelectedCountry={userSelectedCountry}
                />
              </Col>
              <Col lg={4} md={'12'} sm={'12'} className='px-lg-0'>
                <div className='common-col custom-caregiver-height  custom-scrollbar'>
                  <BillingSettingsFormComponent {...props} />
                  <div className='quality-attribute-section d-flex flex-column'>
                    <QualificationFormComponent
                      {...props}
                      qualificationList={qualificationList}
                    />
                    <AttributeFormComponent
                      {...props}
                      caregiverAttrOpt={caregiverAttrOpt}
                      loading={loading}
                    />
                  </div>
                </div>
              </Col>
              <RemarkFormComponent
                {...props}
                setRemarksDetail={setRemarksDetail}
                remarksDetail={remarksDetail}
                saveRemark={saveRemark}
              />
            </Row>
          </Form>
        );
      }}
    />
  );
};
