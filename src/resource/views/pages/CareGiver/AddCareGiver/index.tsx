import React, { useState, FunctionComponent, Suspense, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
import {
  CareGiverValues,
  ICareGiverInput,
  IAddCargiverRes,
  IReactSelectInterface,
  ICareGiverValues,
  IAttributeValues,
  IAttributeOptions,
} from '../../../../../interfaces';
import { FormikHelpers, Formik, FormikProps } from 'formik';
import CareGiverFormComponent from './CareGiverFormComponent';
import { CareGiverValidationSchema } from '../../../../validations/CareGiverValidationSchema';
import { languageTranslation } from '../../../../../helpers';
import { AppRoutes, PAGE_LIMIT } from '../../../../../config';
import CareGiverSidebar from '../Sidebar/SidebarLayout/CareGiverLayout';
import { careGiverRoutes } from '../Sidebar/SidebarRoutes/CareGiverRoutes';
import Loader from '../../../containers/Loader/Loader';
import reminder from '../../../../assets/img/reminder.svg';
import password from '../../../../assets/img/password.svg';
import appointment from '../../../../assets/img/appointment.svg';
import clear from '../../../../assets/img/clear.svg';
import { CareGiverMutations } from '../../../../../graphql/Mutations';
import { CareGiverQueries } from '../../../../../graphql/queries';

const CareGiverRoutesTabs = careGiverRoutes;
const [GET_CAREGIVERS, , , , , GET_CAREGIVER_ATTRIBUTES] = CareGiverQueries;
const [ADD_CAREGIVER] = CareGiverMutations;

export const CareGiverForm: FunctionComponent = (props: any) => {
  const [remarksDetail, setRemarksDetail] = useState<any>([]);
  let history = useHistory();
  // Fetch attribute list from db
  const { data: attributeData } = useQuery<{
    getCaregiverAtrribute: IAttributeValues[];
  }>(GET_CAREGIVER_ATTRIBUTES);
  // Push into attribute options
  const caregiverAttrOpt: IAttributeOptions[] | undefined = [];
  useEffect(() => {
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
  }, [attributeData]);

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
      if (scrollPositionY >= 12) {
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
        firstName: firstName ? firstName.trim() : '',
        lastName: lastName ? lastName.trim() : '',
        address1,
        address2,
        street,
        city,
        stateId: state && state.value ? state.value : undefined,
        countryId: country && country.value ? country.value : undefined,
        regionId:
          regionId && regionId.value ? parseInt(regionId.value) : undefined,
        zipCode: postalCode,
        email: email ? email.trim() : '',
        IBAN,
        employed,
        dateOfBirth,
        bankName,
        gender: gender && gender.value ? gender.value : '',
        phoneNumber,
        fax,
        comments,
        mobileNumber,
        userName: userName ? userName.trim() : '',
        qualificationId:
          qualifications && qualifications.length
            ? qualifications.map((qualification: IReactSelectInterface) =>
                parseInt(qualification.value),
              )
            : null,
        attributes:
          attributeId && attributeId.length
            ? attributeId.map(({ label }: IReactSelectInterface) => label)
            : [],
        driverLicenseNumber,
        driversLicense: driversLicense,
        vehicleAvailable: vehicleAvailable,
        legalForm: legalForm && legalForm.value ? legalForm.value : '',
        companyName,
        belongTo: belongTo && belongTo.value ? parseInt(belongTo.value) : null,
        registrationNumber,
        registerCourt,
        age: age ? parseInt(age) : null,
        title,
        executiveDirector,
        socialSecurityContribution,
        taxNumber,
        fee: fee ? parseFloat(fee) : null,
        nightAllowance:
          nightAllowance && nightAllowance.value ? nightAllowance.value : null,
        weekendAllowance: weekendAllowance
          ? parseFloat(weekendAllowance)
          : null,
        holiday: holiday ? parseFloat(holiday) : null,
        night: night ? parseFloat(night) : null,
        invoiceInterval:
          invoiceInterval && invoiceInterval.value
            ? invoiceInterval.value
            : null,
        leasingPricingList:
          leasingPricingList && leasingPricingList.value
            ? leasingPricingList.value
            : null,
        remarks: remarksDetail,
        // remarks && remarks.length ? remarks : [],
        // workZones:
        //   workZones && workZones.length ? workZones.map(wz => wz.value) : [],
        status,
      };
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

      if (props.refetch) {
        props.refetch();
      }
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      // setFieldError('email', message);
      toast.error(message);
      if (
        message ===
        "Caregiver added successfully but due to some network issue email couldn't be sent out"
      ) {
        history.push(AppRoutes.CARE_GIVER);
      }
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
    driversLicense = undefined,
    vehicleAvailable = undefined,
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
            <Suspense fallback={<Loader />}>
              <div className='sticky-common-header'>
                <div className='common-topheader d-flex align-items-center '>
                  <div className='common-title'>Add New Caregiver</div>

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
                      return (
                        <CareGiverFormComponent
                          {...props}
                          setRemarksDetail={setRemarksDetail}
                          remarksDetail={remarksDetail}
                          caregiverAttrOpt={caregiverAttrOpt}
                        />
                      );
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
