import React, {
  Component,
  FunctionComponent,
  useState,
  useEffect,
} from 'react';
import { Button, Col, Row } from 'reactstrap';
import { assignIn } from 'lodash';
import { useParams, useHistory } from 'react-router';
import { languageTranslation } from '../../../../../helpers';
import PersonalInfoFormComponent from './PersonalInfoFormComponent';
import BillingSettingsFormComponent from './BillingSettingsFormComponent';
import QualificationFormComponent from './QualificationFormComponent';
import AttributeFormComponent from './AttributesFromComponent';
import RemarkFormComponent from './RemarkFormComponent';
import { Formik, FormikHelpers, Form, FormikProps } from 'formik';
import { Query } from '@apollo/react-components';
import { CareGiverQueries } from '../../../../../graphql/queries/CareGiver';
import {
  ICareGiverValues,
  IPersonalObject,
  IBillingSettingsValues,
  IReactSelectInterface,
  ICountries,
  IStates,
  IAttributeValues,
  IAttributeOptions,
} from '../../../../../interfaces';
import { CareGiverValidationSchema } from '../../../../validations/CareGiverValidationSchema';

import { useMutation, useLazyQuery, useQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import '../caregiver.scss';
import {
  GET_QUALIFICATION_ATTRIBUTE,
  CountryQueries,
} from '../../../../../graphql/queries';
import {
  IQualifications,
  IQualification,
} from '../../../../../interfaces/qualification';
import Loader from '../../../containers/Loader/Loader';
import { CareGiverMutations } from '../../../../../graphql/Mutations';
let toastId: any;

const [
  ,
  GET_CAREGIVER_BY_ID,
  ,
  ,
  ,
  GET_CAREGIVER_ATTRIBUTES,
] = CareGiverQueries;
const [, UPDATE_CAREGIVER] = CareGiverMutations;
const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;

export const PersonalInformation: FunctionComponent<any> = (props: any) => {
  let { id } = useParams();
  let history = useHistory();
  const [careGiverData, setCareGiverData] = useState<ICareGiverValues | null>();
  const [remarksDetail, setRemarksDetail] = useState<any>([]);

  // Fetch attribute list from db
  const { data: attributeData } = useQuery<{
    getCaregiverAtrribute: IAttributeValues[];
  }>(GET_CAREGIVER_ATTRIBUTES);

  const caregiverAttrOpt: IAttributeOptions[] | undefined = [];
  if (attributeData && attributeData.getCaregiverAtrribute) {
    attributeData.getCaregiverAtrribute.forEach(
      ({ id, name, color }: IAttributeValues) =>
        caregiverAttrOpt.push({
          label: name,
          value: id.toString(),
          color,
        }),
    );
  }

  // To update caregiver details into db
  const [updateCaregiver] = useMutation<
    { updateCaregiver: ICareGiverValues },
    {
      id: number;
      careGiverInput: IPersonalObject | { remarks: any };
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
        value: quali.id,
      });
    });
  }

  //To get country details
  const { data: countries, loading: countryLoading } = useQuery<ICountries>(
    GET_COUNTRIES,
  );
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY,
  );

  useEffect(() => {
    const { caregiver = {} } = props.getCaregiver ? props.getCaregiver : {};
    const { remarks = [] } = caregiver ? caregiver : {};
    setRemarksDetail(remarks);
  }, [props.getCaregiver]);

  useEffect(() => {
    if (
      props.getCaregiver &&
      props.getCaregiver.caregiver &&
      props.getCaregiver.caregiver.countryId
    ) {
      getStatesByCountry({
        variables: {
          countryid: props.getCaregiver
            ? props.getCaregiver.caregiver.countryId
            : '',
        },
      });
    }
  }, [props.getCaregiver]);

  const handleSubmit = async (
    values: ICareGiverValues,
    { setSubmitting, setFieldError }: FormikHelpers<ICareGiverValues>,
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
      invoiceInterval,
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
            ? `{${qualifications
                .map(
                  (qualification: IReactSelectInterface) => qualification.value,
                )
                .join(', ')}}`
            : null,
        street,
        attributes:
          attributeId && attributeId.length
            ? attributeId.map(({ label }: IAttributeOptions) => label)
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
        fee: fee ? parseFloat(fee) : null,
        nightAllowance:
          nightAllowance && nightAllowance.value ? nightAllowance.label : null,
        weekendAllowance: weekendAllowance
          ? parseFloat(weekendAllowance)
          : null,
        holiday: holiday ? parseFloat(holiday) : null,
        night: night ? parseFloat(night) : null,
        regionId: regionId && regionId.value ? parseInt(regionId.value) : null,
        invoiceInterval:
          invoiceInterval && invoiceInterval.value
            ? invoiceInterval.label
            : null,
        leasingPricingList:
          leasingPricingList && leasingPricingList.value
            ? leasingPricingList.label
            : null,
      };
      // Edit employee details
      if (id) {
        await updateCaregiver({
          variables: {
            id: parseInt(id),
            careGiverInput,
          },
        });
        if (!toast.isActive(toastId)) {
          toast.success(languageTranslation('CARE_GIVER_UPDATED_SUCCESS'));
        }
      }
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      // setFieldError('email', message);
      toast.error(message);
    }
    setSubmitting(false);
  };

  // Save remarks into DB
  const saveRemark = async (message: string, remarksData: any) => {
    if (id) {
      try {
        await updateCaregiver({
          variables: {
            id: parseInt(id),
            careGiverInput: {
              remarks: remarksData ? remarksData : remarksDetail, // send remarksData in case of delete
            },
            isRemarkAdded: true,
          },
        });
        if (!toast.isActive(toastId)) {
          toast.success(message);
        }
      } catch (error) {
        const message = error.message
          .replace('SequelizeValidationError: ', '')
          .replace('Validation error: ', '')
          .replace('GraphQL error: ', '');
        // setFieldError('email', message);
        toast.error(message);
      }
    }
  };

  const {
    userName = '',
    firstName = '',
    lastName = '',
    countryId = '',
    email = '',
    socialSecurityContribution = false,
    password = '',
    status = 'active',
    qualifications = [],
    caregiver = {},
  } = props.getCaregiver ? props.getCaregiver : {};

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
    fax = '',
    mobileNumber = '',
    taxNumber = '',
    vehicleAvailable = '',
    legalForm = undefined,
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
  } = caregiver ? caregiver : {};

  const qualificationsData: IReactSelectInterface[] | undefined = [];
  if (qualifications) {
    qualifications.forEach(({ name, id }: IQualification) => {
      qualificationsData.push({ label: name, value: id });
    });
  }
  let countryData: Number;

  if (props.getCaregiver && props.getCaregiver.caregiver) {
    countryData = props.getCaregiver.caregiver.countryId;
  }

  let userSelectedCountry: any = {};

  if (countries && countries.countries) {
    const userCountry = countries.countries.filter(
      (x: any) => x.id === countryData,
    );

    if (userCountry && userCountry.length) {
      userSelectedCountry = {
        label: userCountry[0].name,
        value: userCountry[0].id,
      };
    }
  }

  const stateData =
    props.getCaregiver && props.getCaregiver.caregiver
      ? props.getCaregiver.caregiver.stateId
      : '';

  let userSelectedState: any = {};
  if (statesData && statesData.states) {
    const userState = statesData.states.filter((x: any) => x.id === stateData);
    if (userState && userState.length) {
      userSelectedState = {
        label: userState[0].name,
        value: userState[0].id,
      };
    }
  }

  let selectedAttributes: IAttributeOptions[] = [];
  if (
    props.getCaregiver &&
    props.getCaregiver.caregiver &&
    props.getCaregiver.caregiver.attributes &&
    props.getCaregiver.caregiver.attributes.length
  ) {
    props.getCaregiver.caregiver.attributes.map((attData: string) => {
      const data = caregiverAttrOpt.filter(
        (attr: any) => attr.label === attData,
      )[0];
      selectedAttributes.push({
        label: data ? data.label : attData,
        value: data ? data.value : attData,
        color: data ? data.color : null,
      });
    });
  }

  let UserSelectedBelongsTo: any = {};
  let belongToId =
    props.getCaregiver && props.getCaregiver.caregiver
      ? props.getCaregiver.caregiver.belongTo
      : null;

  if (props.careGiverOpt && props.careGiverOpt.length) {
    const userBelongTo = props.careGiverOpt.filter(
      (x: any) => parseInt(x.value) === belongToId,
    );

    if (userBelongTo && userBelongTo.length) {
      UserSelectedBelongsTo = userBelongTo[0];
    }
  }

  const initialValues: ICareGiverValues = {
    id,
    userName,
    state: userSelectedState,
    title,
    firstName,
    lastName,
    phoneNumber: props.getCaregiver ? props.getCaregiver.phoneNumber : '',
    dateOfBirth,
    age,
    address1,
    address2,
    driversLicense,
    driverLicenseNumber,
    country: userSelectedCountry,
    vehicleAvailable,
    street,
    city,
    postalCode: zipCode,
    countryId,
    regionId:
      props.getCaregiver &&
      props.getCaregiver.regions &&
      props.getCaregiver.regions.length
        ? {
            label: props.getCaregiver.regions[0].regionName,
            value: props.getCaregiver.regions[0].id,
          }
        : undefined,
    fax,
    mobileNumber,
    email,
    taxNumber,
    socialSecurityContribution,
    bankName:
      props.getCaregiver && props.getCaregiver.bankDetails
        ? props.getCaregiver.bankDetails.bankName
        : '',
    IBAN:
      props.getCaregiver && props.getCaregiver.bankDetails
        ? props.getCaregiver.bankDetails.IBAN
        : '',
    belongTo: UserSelectedBelongsTo ? UserSelectedBelongsTo : null,
    legalForm: legalForm
      ? {
          label: props.getCaregiver.caregiver.legalForm,
          value: props.getCaregiver.caregiver.legalForm,
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
              createdBy: '',
            },
          ],
    remarkData: '',
    invoiceInterval: invoiceInterval
      ? { label: invoiceInterval, value: invoiceInterval }
      : undefined,
    qualifications: qualificationsData,
    fee,
    nightAllowance: nightAllowance
      ? { label: nightAllowance, value: nightAllowance }
      : undefined,
    leasingPricingList: leasingPricingList
      ? { label: leasingPricingList, value: leasingPricingList }
      : undefined,
    weekendAllowance,
    holiday,
    night,
    salutation:
      props.getCaregiver && props.getCaregiver.salutation
        ? {
            label: props.getCaregiver.salutation,
            value: props.getCaregiver.salutation,
          }
        : undefined,
    gender:
      props.getCaregiver && props.getCaregiver.gender
        ? {
            label: props.getCaregiver.gender,
            value: props.getCaregiver.gender,
          }
        : undefined,
    attributeId: selectedAttributes,
  };

  const usersList = props.careGiverOpt;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      validationSchema={CareGiverValidationSchema}
      render={(props: FormikProps<ICareGiverValues>) => {
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
                  <i className='fa fa-spinner fa-spin loader' />
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

class GetData extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  formatData = (caregiverDetails: any) => {
    assignIn(caregiverDetails, caregiverDetails.caregiverDetails);
    assignIn(caregiverDetails, caregiverDetails.caregiverDetails);
    if (caregiverDetails.bankDetails) {
      assignIn(
        caregiverDetails,
        caregiverDetails,
        caregiverDetails.bankDetails,
      );
    }
    if (caregiverDetails.billingSettingDetails) {
      assignIn(
        caregiverDetails,
        caregiverDetails,
        caregiverDetails.billingSettingDetails,
      );
    } else {
      assignIn(caregiverDetails, caregiverDetails, {
        fee: '',
        weekendAllowancePerHour: '',
        holidayAllowancePerHourFee: '',
        nightAllowancePerHour: '',
        leasingPrice: '',
        invoiceInterval: '',
      });
    }
    caregiverDetails.salutation = {
      value: caregiverDetails.salutation,
      label: caregiverDetails.salutation,
    };
    caregiverDetails.state = {
      value: caregiverDetails.state,
      label: caregiverDetails.state,
    };
    caregiverDetails.legalForm = {
      value: caregiverDetails.legalForm,
      label: caregiverDetails.legalForm,
    };
    caregiverDetails.regionId = {
      value: caregiverDetails.regions[0]._id,
      label: caregiverDetails.regions[0].regionName,
    };
    caregiverDetails.workZones =
      caregiverDetails.workZones && caregiverDetails.workZones.length
        ? caregiverDetails.workZones.map((wz: String) => {
            return { label: wz, value: wz };
          })
        : [];
    delete caregiverDetails.bankDetails;
    delete caregiverDetails.billingSettingDetails;
    delete caregiverDetails.caregiverDetails;
    return caregiverDetails;
  };

  render() {
    // const CareInstitutionLinkedTo = props.CareInstitutionList;

    return (
      <Query
        query={GET_CAREGIVER_BY_ID}
        fetchPolicy='network-only'
        variables={{ id: parseInt(this.props.Id) }}
      >
        {({ loading, error, data }: any) => {
          if (loading)
            return (
              <div className='overview-loader'>
                <Loader />
              </div>
            );
          if (error) return <div>Caught error: {error.message}</div>;
          return (
            <PersonalInformation
              {...this.props}
              getCaregiver={data.getCaregiver}
            />
          );
        }}
      </Query>
    );
  }
}
export default GetData;
