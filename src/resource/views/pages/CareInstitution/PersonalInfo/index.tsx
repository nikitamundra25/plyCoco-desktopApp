import React, { useEffect, useState } from 'react';
import { Form } from 'reactstrap';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import '../careinstitution.scss';
import PersonalInfoForm from './PersonalInfoForm';
import {
  ICareInstitutionFormValues,
  IReactSelectInterface,
  ICountries,
  IStates
} from '../../../../../interfaces';
import { CareInstituionValidationSchema } from '../../../../validations';
import { useParams } from 'react-router';
import {
  CareInstitutionQueries,
  CountryQueries
} from '../../../../../graphql/queries';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { logger, languageTranslation } from '../../../../../helpers';
import CareInstitutionContacts from './CareInstitutionContacts';
import { RegionQueries } from '../../../../../graphql/queries/Region';
import { CareInstitutionMutation } from '../../../../../graphql/Mutations';

let toastId: any;

const [, GET_REGIONS] = RegionQueries;
const [
  GET_CARE_INSTITUTION_LIST,
  GET_CARE_INSTITUION_BY_ID,
  GET_DEPARTMENT_LIST
] = CareInstitutionQueries;

const [
  UPDATE_CARE_INSTITUTION,
  UPDATE_CARE_INSTITUTION_STATUS,
  UPDATE_DEPARTMENT_CARE_INSTITUTION,
  UPDATE_NEW_CONTACT_CARE_INSTITUTION,
  DELETE_CARE_INSTITUTION,
  ADD_CARE_INSTITUTION,
  ADD_NEW_CONTACT_CARE_INSTITUTION,
  ADD_NEW_CARE_INTITUTION,
  ADD_DEPARTMENT_CARE_INSTITUTION,
  DELETE_DEPARTMENT
] = CareInstitutionMutation;

const PersonalInformation: any = (props: any) => {
  let { id } = useParams();
  const Id: any | undefined = id;
  const [contacts, setContacts] = useState<any>([]);

  const [updateCareInstitution, { error, data }] = useMutation<{
    updateCareInstitution: ICareInstitutionFormValues;
  }>(UPDATE_CARE_INSTITUTION);

  // To get the care instituion details by id
  const [
    getCareInstitutionDetails,
    { data: careInstituionDetails, error: detailsError, refetch }
  ] = useLazyQuery<any>(GET_CARE_INSTITUION_BY_ID);

  const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;
  const [remarksDetail, setRemarksDetail] = useState<any>([]);
  //To get country details
  const { data: countries, loading } = useQuery<ICountries>(GET_COUNTRIES);
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY
  );
  // To get region list
  const [fetchRegionList, { data: RegionData }] = useLazyQuery<any>(
    GET_REGIONS
  );
  useEffect(() => {
    // call query
    fetchRegionList({
      variables: {
        limit: 25
      }
    });
  }, []);

  useEffect(() => {
    if (props.isUserChange) {
      getCareInstitutionDetails({
        variables: { careInstitutionId: parseInt(Id) }
      });
      props.handleIsUserChange();
    }
  }, [props.isUserChange]);

  useEffect(() => {
    // Fetch details by care institution id
    if (id) {
      getCareInstitutionDetails({
        variables: { careInstitutionId: parseInt(Id) }
      });
    }
  }, []);
  // It calls when the response will come
  useEffect(() => {
    // Fetch details by care institution id
    if (careInstituionDetails && careInstituionDetails.getCareInstitution) {
      logger(
        careInstituionDetails.getCareInstitution,
        'careInstituionDetails****'
      );
      const contactsData: any[] =
        careInstituionDetails.getCareInstitution.contact;
      if (contactsData && !contactsData.length) {
        contactsData.push({
          email: '',
          firstName: '',
          lastName: '',
          userName: '',
          phoneNumber: '',
          mobileNumber: '',
          faxNumber: '',
          comments: '',
          groupAttributes: ''
        });
      } else if (contactsData && contactsData[contactsData.length - 1].id) {
        contactsData.push({
          email: '',
          firstName: '',
          lastName: '',
          userName: '',
          phoneNumber: '',
          mobileNumber: '',
          faxNumber: '',
          comments: '',
          groupAttributes: ''
        });
      }
      setContacts(contactsData);
    }
  }, [careInstituionDetails]);

  useEffect(() => {
    if (careInstituionDetails && careInstituionDetails.getCareInstitution) {
      const { getCareInstitution } = careInstituionDetails;

      getStatesByCountry({
        variables: {
          countryid: getCareInstitution.canstitution
            ? getCareInstitution.canstitution.countryId
            : ''
        }
      });
    }
  }, [careInstituionDetails]);

  const handleSubmit = async (
    values: ICareInstitutionFormValues,
    { setSubmitting }: FormikHelpers<ICareInstitutionFormValues>
  ) => {
    //to set submit state to false after successful signup
    let AttributeData: string[] = [];
    if (values.attributeId && values.attributeId.length) {
      values.attributeId.map((attribute: IReactSelectInterface) =>
        AttributeData.push(attribute.label)
      );
    }

    try {
      const careInstitutionInput: any = {
        gender: values && values.gender ? values.gender.value : '',
        salutation: values && values.salutation ? values.salutation.value : '',
        firstName: values.firstName,
        lastName: values.lastName,
        shortName: values.shortName,
        companyName: values.companyName,
        phoneNumber: values.phoneNumber,
        mobileNumber: values.mobileNumber,
        anonymousName: values.anonymousName,
        anonymousName2: values.anonymousName2,
        remarksViewable: values && values.remarksViewable,
        fax: values.fax,
        street: values.street,
        zipCode: values.zipCode,
        title: values.title,
        city: values.city,
        countryId:
          values && values.country ? parseInt(values.country.value) : null,
        stateId: values && values.state ? parseInt(values.state.value) : null,
        remarks: remarksDetail,
        linkedTo:
          values.linkedTo && values.linkedTo.value
            ? values.linkedTo.value
            : null,
        regionId:
          values && values.regionId ? `{${values.regionId.value}}` : null,
        website: values.website,
        email: values.email,
        userName: values.userName,
        careGiverCommission: values.careGiverCommission,
        doctorCommission: values.doctorCommission,
        invoiceType:
          values && values.invoiceType ? values.invoiceType.value : '',
        interval: values && values.interval ? values.interval.value : '',
        emailInvoice: values.emailInvoice,
        addressInvoice: values.addressInvoice,
        qualificationId:
          values.qualificationId && values.qualificationId.length
            ? `{${values.qualificationId
                .map(
                  (qualification: IReactSelectInterface) => qualification.value
                )
                .join(', ')}}`
            : null,
        attributes: AttributeData,
        leasingPriceListId:
          values.leasingPriceListId && values.leasingPriceListId.value
            ? values.leasingPriceListId.value
            : null
      };
      toast.success(languageTranslation('CARE_INSTI_UPDATE_SUCCESS'));
      await updateCareInstitution({
        variables: {
          id: parseInt(Id),
          careInstitutionInput: careInstitutionInput
        }
      });
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      // setFieldError('email', message);
      toast.error(message);
      logger(error);
    }
    setSubmitting(false);
  };
  let Data: IReactSelectInterface;
  let values: ICareInstitutionFormValues;
  let countryData: Number;
  let regionId: String;
  let linkedToId: String;

  useEffect(() => {
    if (careInstituionDetails && careInstituionDetails.getCareInstitution) {
      const { getCareInstitution } = careInstituionDetails;
      const { canstitution } = getCareInstitution;
      const { remarks } = canstitution;
      setRemarksDetail(remarks);
    }
  }, [careInstituionDetails]);

  // Save remarks into DB
  const saveRemark = async (message: string, remarksData: any) => {
    if (id) {
      try {
        await updateCareInstitution({
          variables: {
            id: parseInt(Id),
            careInstitutionInput: {
              remarks: remarksData ? remarksData : remarksDetail // send remarksData in case of delete
            },
            isRemarkAdded: true
          }
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

  if (careInstituionDetails && careInstituionDetails.getCareInstitution) {
    const { getCareInstitution } = careInstituionDetails;

    countryData = getCareInstitution.canstitution
      ? getCareInstitution.canstitution.countryId
      : '';
    regionId =
      getCareInstitution.regions && getCareInstitution.regions.length
        ? getCareInstitution.regions[0].id
        : '';

    linkedToId = getCareInstitution.canstitution
      ? getCareInstitution.canstitution.linkedTo
      : '';

    let userSelectedCountry: any = {};
    if (countries && countries.countries) {
      const userCountry = countries.countries.filter(
        (x: any) => parseInt(x.id) === countryData
      );

      if (userCountry && userCountry.length) {
        userSelectedCountry = {
          label: userCountry[0].name,
          value: userCountry[0].id
        };
      }
    }

    let userSelectedRegion: any = {};

    if (
      RegionData &&
      RegionData.getRegions &&
      RegionData.getRegions.regionData.length
    ) {
      const userRegion = RegionData.getRegions.regionData.filter(
        (x: any) => x.id === regionId
      );

      if (userRegion && userRegion.length) {
        userSelectedRegion = {
          label: userRegion[0].regionName,
          value: userRegion[0].id
        };
      }
    }

    let UserSelectedLinkedTo: any = {};

    if (props.CareInstitutionList) {
      const userSelectedLinkedTo = props.CareInstitutionList.filter(
        (x: any) => x.value === linkedToId
      );
      if (userSelectedLinkedTo && userSelectedLinkedTo.length) {
        UserSelectedLinkedTo = userSelectedLinkedTo[0];
      }
    }

    const stateData = getCareInstitution.canstitution
      ? getCareInstitution.canstitution.stateId
      : '';
    let userSelectedState: any = {};
    if (statesData && statesData.states) {
      const userState = statesData.states.filter(
        (x: any) => parseInt(x.id) === stateData
      );
      if (userState && userState.length) {
        userSelectedState = {
          label: userState[0].name,
          value: userState[0].id
        };
      }
    }
    let selectedAttributes: IReactSelectInterface[] = [];
    if (
      getCareInstitution &&
      getCareInstitution.canstitution &&
      getCareInstitution.canstitution.attributes &&
      getCareInstitution.canstitution.attributes.length
    ) {
      getCareInstitution.canstitution.attributes.map((attData: string) => {
        selectedAttributes.push({
          label: attData,
          value: attData
        });
      });
    }

    values = {
      id: Id,
      email: getCareInstitution.email,
      firstName: getCareInstitution.firstName,
      lastName: getCareInstitution.lastName,
      gender: getCareInstitution.gender
        ? {
            label: getCareInstitution ? getCareInstitution.gender : '',
            value: getCareInstitution ? getCareInstitution.gender : null
          }
        : undefined,
      userName: getCareInstitution.userName,
      phoneNumber: getCareInstitution.phoneNumber,
      careGiverCommission: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.careGiverCommission
        : '',
      salutation: {
        label: getCareInstitution.salutation
          ? getCareInstitution.salutation
          : '',
        value: getCareInstitution.salutation
          ? getCareInstitution.salutation
          : ''
      },
      fax: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.fax
        : '',
      zipCode: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.zipCode
        : '',
      country: userSelectedCountry.value
        ? {
            label: userSelectedCountry.value ? userSelectedCountry.label : null,
            value: userSelectedCountry.value ? userSelectedCountry.value : null
          }
        : undefined,
      state: userSelectedState.value
        ? { label: userSelectedState.label, value: userSelectedState.value }
        : undefined,
      stateId: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.stateId
        : '',
      // remarks: getCareInstitution.canstitution
      //   ? getCareInstitution.canstitution.remarks
      //   : "",
      title: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.title
        : '',
      anonymousName: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.anonymousName
        : '',
      anonymousName2: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.anonymousName2
        : '',
      mobileNumber: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.mobileNumber
        : '',
      remarksViewable: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.remarksViewable
        : '',
      invoiceType: getCareInstitution.canstitution.invoiceType
        ? {
            label: getCareInstitution.canstitution
              ? getCareInstitution.canstitution.invoiceType
              : '',
            value: getCareInstitution.canstitution
              ? getCareInstitution.canstitution.invoiceType
              : ''
          }
        : undefined,
      emailInvoice: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.emailInvoice
        : '',
      addressInvoice: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.addressInvoice
        : '',
      interval: getCareInstitution.canstitution.interval
        ? {
            label: getCareInstitution.canstitution
              ? getCareInstitution.canstitution.interval
              : '',
            value: getCareInstitution.canstitution
              ? getCareInstitution.canstitution.interval
              : ''
          }
        : undefined,
      doctorCommission: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.doctorCommission
        : '',
      leasingPriceListId: getCareInstitution.canstitution
        ? {
            label: getCareInstitution.canstitution.leasingPriceListId,
            value: getCareInstitution.canstitution.leasingPriceListId
          }
        : undefined,
      isArchive: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.isArchive
        : '',
      shortName: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.shortName
        : '',
      companyName: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.companyName
        : '',
      street: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.street
        : '',
      regionId: userSelectedRegion.value ? userSelectedRegion : undefined,
      city: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.city
        : '',
      website: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.website
        : '',
      linkedTo: UserSelectedLinkedTo ? UserSelectedLinkedTo : null,
      attributeId: selectedAttributes,
      remarkData: ''
    };
    const qualificationsData: IReactSelectInterface[] | undefined = [];
    const attributeData: IReactSelectInterface[] = [];
    if (getCareInstitution.qualifications) {
      getCareInstitution.qualifications.forEach(
        ({ attributeName, id }: any) => {
          qualificationsData.push({ label: attributeName, value: id });
        }
      );
    }
    values.qualificationId = qualificationsData;

    Data = {
      label: `${getCareInstitution.firstName} ${''} ${
        getCareInstitution.lastName
      }`,
      value: Id
    };
  } else {
    values = {
      email: '',
      firstName: '',
      lastName: '',
      salutation: { label: '', value: '' },
      userName: '',
      fax: '',
      shortName: '',
      companyName: '',
      street: '',
      city: '',
      remarkData: ''
    };
  }

  useEffect(() => {
    if (careInstituionDetails && careInstituionDetails.getCareInstitution) {
      props.currentSelectuser(Data);
    }
  }, [careInstituionDetails && careInstituionDetails.getCareInstitution]);

  useEffect(() => {
    // Fetch state details by country id
    if (countryData) {
      getStatesByCountry({
        variables: { countryid: countryData ? countryData : '82' } // default code is for germany
      });
    }
  }, []);

  const { qualificationList } = props;
  const CareInstitutionLinkedTo = props.CareInstitutionList;
  return (
    <Form className='form-section forms-main-section'>
      <Formik
        initialValues={values}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        children={(props: FormikProps<ICareInstitutionFormValues>) => (
          <PersonalInfoForm
            CareInstitutionList={CareInstitutionLinkedTo}
            {...props}
            qualificationList={qualificationList}
            setRemarksDetail={setRemarksDetail}
            remarksDetail={remarksDetail}
            saveRemark={saveRemark}
          />
        )}
        validationSchema={CareInstituionValidationSchema}
      />
      <div className='position-relative'>
        <CareInstitutionContacts
          contacts={contacts}
          careInstId={id}
          setContacts={(contacts: any) => {
            setContacts((contacts = contacts));
          }}
        />
      </div>
      {/* <Formik
        initialValues={contactFormValues}
        onSubmit={handleContactSubmit}
        children={(props: FormikProps<ICareInstitutionContact>) => (
          <CareInstitutionContact {...props} />
        )}
        validationSchema={CareInstituionContactValidationSchema}
      /> */}
    </Form>
  );
};
export default PersonalInformation;
