import React, {
  Component,
  useState,
  FunctionComponent,
  Suspense,
  useEffect,
} from 'react';
import {
  CareGiverValues,
  ICareGiverInput,
  IAddCargiverRes,
  IReactSelectInterface,
  ICareGiverValues,
} from '../../../interfaces';
import { FormikHelpers, Formik, FormikProps } from 'formik';
import CareGiverFormComponent from './CareGiverFormComponent';
import { CareGiverValidationSchema } from '../../../validations/CareGiverValidationSchema';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { ADD_CAREGIVER, GET_CAREGIVERS } from '../../../queries/CareGiver';
import { GET_QUALIFICATION_ATTRIBUTE } from '../../../queries/qualification';
import { Mutation } from '@apollo/react-components';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { languageTranslation } from '../../../helpers';
import { AppRoutes, PAGE_LIMIT } from '../../../config';
import CareGiverSidebar from '../Sidebar/SidebarLayout/CareGiverLayout';
import reminder from '../../../assets/img/reminder.svg';
import password from '../../../assets/img/password.svg';
import appointment from '../../../assets/img/appointment.svg';
import clear from '../../../assets/img/clear.svg';
import { careGiverRoutes } from '../Sidebar/SidebarRoutes/CareGiverRoutes';

const CareGiverRoutesTabs = careGiverRoutes;

export const CareGiverForm: FunctionComponent = () => {
  let history = useHistory();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollPositionY = window.scrollY;
    const buttonDiv: HTMLElement | null = document.getElementById(
      'caregiver-add-btn',
    );
    if (buttonDiv) {
      if (scrollPositionY >= 35) {
        buttonDiv.classList.add('sticky-save-btn');
      } else {
        buttonDiv.classList.remove('sticky-save-btn');
      }
    }
  };

  const [caregiverData, setCaregiverData] = useState<CareGiverValues | null>();

  // To add emplyee details into db
  const [addCaregiver, { error, data }] = useMutation<
    { addCaregiver: IAddCargiverRes },
    { careGiverInput: ICareGiverInput }
  >(ADD_CAREGIVER);

  //Qualification attributes
  // const [
  //   getQualificationAttribute,
  //   { data: qualificationData, loading, refetch }
  // ] = useLazyQuery<any>(GET_QUALIFICATION_ATTRIBUTE);

  let { id } = useParams();
  const Id: any | undefined = id;

  useEffect(() => {
    if (data) {
      console.log('In use Effect');
      const Data: any = data;
      history.push(
        AppRoutes.CARE_GIVER_VIEW.replace(
          ':id',
          Data.addCareGiver ? Data.addCareGiver.id : 'null',
        ),
      );
    }
  }, [data]);

  // function to add/edit employee information
  const handleSubmit = async (
    values: ICareGiverValues,
    { setSubmitting, setFieldError }: FormikHelpers<ICareGiverValues>,
  ) => {
    //to set submit state to false after successful signup
    const {
      salutation,
      firstName,
      lastName,
      userName,
      gender,
      email,
      phoneNumber,
      mobileNumber,
      title,
      dateOfBirth,
      age,
      street,
      city,
      address1,
      address2,
      country,
      state,
      fax,
      taxNumber,
      bankName,
      legalForm,
      IBAN,
      driversLicense,
      driverLicenseNumber,
      vehicleAvailable,
      socialSecurityContribution,
      workZones,
      status,
      belongTo,
      employed,
      companyName,
      registrationNumber,
      registerCourt,
      executiveDirector,
      legalFormValue,
      qualifications,
      attributeId,
      remarks,
      regionId,
      comments,
      invoiceInterval,
      leasingPricingList,
      fee,
      nightAllowance,
      weekendAllowance,
      night,
      holiday,
      postalCode,
    } = values;

    try {
      let careGiverInput: any = {
        salutation: salutation && salutation.label ? salutation.label : '',
        firstName,
        lastName,
        address1,
        address2,
        street,
        city,
        stateId: state && state.value ? state.value : undefined,
        countryId: country && country.value ? country.value : undefined,
        regionId: regionId ? `{${regionId.value}}` : undefined,
        zipCode: postalCode,
        email,
        IBAN,
        employed,
        dateOfBirth,
        bankName,
        gender: gender && gender.value ? gender.value : '',
        phoneNumber,
        fax,
        comments,
        mobileNumber,
        userName,
        qualificationId:
          qualifications && qualifications.length
            ? `{${qualifications
                .map(
                  (qualification: IReactSelectInterface) => qualification.value,
                )
                .join(', ')}}`
            : null,
        attributes:
          attributeId && attributeId.length
            ? attributeId.map(({ label }: IReactSelectInterface) => label)
            : [],
        driverLicenseNumber,
        driversLicense,
        vehicleAvailable,
        legalForm: legalForm && legalForm.value ? legalForm.value : '',
        companyName,
        registrationNumber,
        registerCourt,
        age: age ? parseInt(age) : null,
        title,
        executiveDirector,
        socialSecurityContribution,
        taxNumber,
        fee: fee ? parseInt(fee) : null,
        nightAllowance:
          nightAllowance && nightAllowance.value ? nightAllowance.value : null,
        weekendAllowance: weekendAllowance ? parseInt(weekendAllowance) : null,
        holiday: holiday ? parseInt(holiday) : null,
        night: night ? parseInt(night) : null,
        invoiceInterval:
          invoiceInterval && invoiceInterval.value
            ? invoiceInterval.value
            : null,
        leasingPricingList:
          leasingPricingList && leasingPricingList.value
            ? leasingPricingList.value
            : null,
        // remarks: remarks && remarks.length ? remarks : [],
        // workZones:
        //   workZones && workZones.length ? workZones.map(wz => wz.value) : [],
        status,
      };
      console.log('careGiverInput', careGiverInput);

      await addCaregiver({
        variables: {
          careGiverInput,
        },
        update: (cache, { data: { addCaregiver } }: any) => {
          const data: any = cache.readQuery({
            query: GET_CAREGIVERS,
            variables: {
              searchBy: '',
              sortBy: 0,
              limit: PAGE_LIMIT,
              page: 0,
              isActive: undefined,
            },
          });
          cache.writeQuery({
            query: GET_CAREGIVERS,
            data: {
              getCaregiversCount: data.getCaregiversCount + 1,
              getCaregivers: data.getCaregivers.concat([addCaregiver]),
            },
          });
        },
      });
      toast.success(languageTranslation('CAREGIVER_ADD_SUCCESS_MSG'));
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
  const [activeTab, setactiveTab] = useState(0);

  const {
    salutation = undefined,
    firstName = '',
    lastName = '',
    address1 = '',
    address2 = '',
    street = '',
    city = '',
    stateId = undefined,
    countryId = undefined,
    postalCode = '',
    email = '',
    dateOfBirth = '',
    phoneNumber = '',
    fax = '',
    mobileNumber = '',
    userName = '',
    qualifications = [],
    driverLicenseNumber = '',
    driversLicense = false,
    vehicleAvailable = false,
    legalForm = undefined,
    companyName = '',
    registrationNumber = '',
    registerCourt = '',
    executiveDirector = '',
    socialSecurityContribution = false,
    taxNumber = '',
    workZones = undefined,
    status = '',
  } = caregiverData ? caregiverData : {};

  const initialValues: ICareGiverValues = {
    salutation,
    firstName,
    lastName,
    address1,
    address2,
    street,
    city,
    stateId,
    countryId,
    postalCode,
    email,
    dateOfBirth,
    phoneNumber,
    fax,
    mobileNumber,
    userName,
    driverLicenseNumber,
    driversLicense,
    vehicleAvailable,
    companyName,
    registrationNumber,
    registerCourt,
    executiveDirector,
    socialSecurityContribution,
    taxNumber,
    workZones,
    status,
    qualifications,
  };

  return (
    <>
      <div>
        <div className='common-detail-page'>
          <div className='common-detail-section'>
            <Suspense fallback={'Loading..'}>
              <div className='sticky-common-header'>
                <div className='common-topheader d-flex align-items-center '>
                  <div className='common-title'>Add New Care Giver</div>

                  <div className='header-nav-item'>
                    <span className='header-nav-icon'>
                      <img src={reminder} alt='' />
                    </span>
                    <span
                      className='header-nav-text'
                      // onClick={() => {
                      //   this.setState({ show: true });
                      // }}
                    >
                      Create Todo/Reminder
                    </span>
                  </div>
                  <div className='header-nav-item'>
                    <span className='header-nav-icon'>
                      <img src={password} alt='' />
                    </span>
                    <span className='header-nav-text'>New Password</span>
                  </div>
                  <div className='header-nav-item'>
                    <span className='header-nav-icon'>
                      <img src={appointment} alt='' />
                    </span>
                    <span className='header-nav-text'>
                      Display Appointments
                    </span>
                  </div>
                  <div className='header-nav-item'>
                    <span className='header-nav-icon'>
                      <img src={clear} alt='' />
                    </span>
                    <span className='header-nav-text'>Clear</span>
                  </div>
                </div>
                <CareGiverSidebar
                  tabs={CareGiverRoutesTabs}
                  activeTab={activeTab}
                />
              </div>
            </Suspense>
            <Suspense fallback={''}>
              <div className='common-content flex-grow-1'>
                {activeTab === 0 ? (
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={CareGiverValidationSchema}
                    render={(props: FormikProps<ICareGiverValues>) => {
                      return <CareGiverFormComponent {...props} />;
                    }}
                  />
                ) : null}
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareGiverForm;
