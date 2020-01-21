import React, { useEffect, useState } from 'react';
import { Form, Button } from 'reactstrap';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import '../careinstitution.scss';
import PersonalInfoForm from './PersonalInfoForm';
import {
  ICareInstitutionContact,
  ICareInstitutionFormValues,
  IReactSelectInterface,
  ICountries,
  IStates,
} from '../../../interfaces';
import {
  CareInstituionValidationSchema,
  CareInstituionContactValidationSchema
} from "../../../validations";
import { useParams } from "react-router";
import { CareInstitutionQueries, CountryQueries } from "../../../queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { logger, languageTranslation } from "../../../helpers";
import { async } from "rxjs/internal/scheduler/async";
import CareInstitutionContacts from "./CareInstitutionContacts";
import { RegionQueries } from "../../../queries/Region";


const [, GET_REGIONS] = RegionQueries;
const [
  GET_CARE_INSTITUTION_LIST,
  DELETE_CARE_INSTITUTION,
  UPDATE_CARE_INSTITUTION,
  ADD_CARE_INSTITUTION,
  GET_CARE_INSTITUION_BY_ID,
  UPDATE_CARE_INSTITUTION_STATUS,
  ADD_NEW_CONTACT_CARE_INSTITUTION,
] = CareInstitutionQueries;

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
    { data: careInstituionDetails, error: detailsError, refetch },
  ] = useLazyQuery<any>(GET_CARE_INSTITUION_BY_ID);

  const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;

  //To get country details
  const { data: countries, loading } = useQuery<ICountries>(GET_COUNTRIES);
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY,
  );
  // To get region list
  const [fetchRegionList, { data: RegionData }] = useLazyQuery<any>(
    GET_REGIONS
  );
  useEffect(() => {
    // call query
    fetchRegionList({
      variables: {
        limit: 10
      }
    });
  }, []);

  useEffect(() => {
    if (props.isUserChange) {
      getCareInstitutionDetails({
        variables: { careInstitutionId: parseInt(Id) },
      });
      props.handleIsUserChange();
    }
  }, [props.isUserChange]);

  useEffect(() => {
    // Fetch details by care institution id
    if (id) {
      getCareInstitutionDetails({
        variables: { careInstitutionId: parseInt(Id) },
      });
    }
  }, []);
  // It calls when the response will come
  useEffect(() => {
    // Fetch details by care institution id
    if (careInstituionDetails && careInstituionDetails.getCareInstitution) {
      logger(
        careInstituionDetails.getCareInstitution,
        'careInstituionDetails****',
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
          groupAttributes: '',
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
          groupAttributes: '',
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
            : '',
        },
      });
    }
  }, [careInstituionDetails]);

  const handleSubmit = async (
    values: ICareInstitutionFormValues,
    { setSubmitting }: FormikHelpers<ICareInstitutionFormValues>,
  ) => {
    //to set submit state to false after successful signup

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
        remarksViewable: values.remarksViewable,
        street: values.street,
        zipCode: values.zipCode,
        title: values.title,
        countryId: values && values.country ? values.country.value : '',
        stateId: values && values.state ? values.state.value : '',
        remarks: values.remarks,
        regionId: values && values.regionId ? values.regionId.value : null,
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
      };
      setSubmitting(false);
      toast.success(languageTranslation('CARE_INSTI_UPDATE_SUCCESS'));
      await updateCareInstitution({
        variables: {
          id: parseInt(Id),
          careInstitutionInput: careInstitutionInput,
        },
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
  let regionId: Number;
  if (careInstituionDetails && careInstituionDetails.getCareInstitution) {
    const { getCareInstitution } = careInstituionDetails;

    countryData = getCareInstitution.canstitution
      ? getCareInstitution.canstitution.countryId
      : "";
    regionId = getCareInstitution.canstitution ? getCareInstitution.canstitution.regionId : ""
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

    let userSelectedRegion: any = {};

    if (RegionData && RegionData.getRegions && RegionData.getRegions.regionData.length) {
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
    const stateData = getCareInstitution.canstitution
      ? getCareInstitution.canstitution.stateId
      : '';
    let userSelectedState: any = {};
    if (statesData && statesData.states) {
      const userState = statesData.states.filter(
        (x: any) => x.id === stateData,
      );
      if (userState && userState.length) {
        userSelectedState = {
          label: userState[0].name,
          value: userState[0].id,
        };
      }
    }

    values = {
      id: Id,
      email: getCareInstitution.email,
      firstName: getCareInstitution.firstName,
      lastName: getCareInstitution.lastName,
      gender: {
        label: getCareInstitution ? getCareInstitution.gender : '',
        value: getCareInstitution ? getCareInstitution.gender : '',
      },
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
          : '',
      },
      fax: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.fax
        : '',
      zipCode: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.zipCode
        : '',
      country: {
        label: userSelectedCountry.label,
        value: userSelectedCountry.value,
      },
      state: { label: userSelectedState.label, value: userSelectedState.value },
      stateId: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.stateId
        : '',
      remarks: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.remarks
        : '',
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
      invoiceType: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.invoiceType
        : '',
      emailInvoice: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.emailInvoice
        : '',
      addressInvoice: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.addressInvoice
        : '',
      interval: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.interval
        : '',
      linkedTo: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.linkedTo
        : '',
      doctorCommission: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.doctorCommission
        : '',
      leasingPriceListId: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.leasingPriceListId
        : '',
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
        : "",
      regionId: userSelectedRegion ? userSelectedRegion : {},
      city: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.city
        : '',
    };
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
        variables: { countryid: countryData ? countryData : '82' }, // default code is for germany
      });
    }
  }, []);

  logger(contacts, 'contact');
  return (
    <Form className='form-section forms-main-section'>
      <Formik
        initialValues={values}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        children={(props: FormikProps<ICareInstitutionFormValues>) => (
          <PersonalInfoForm
            {...props} />
        )}
        validationSchema={CareInstituionValidationSchema}
      />
      <CareInstitutionContacts
        contacts={contacts}
        careInstId={id}
        setContacts={(contacts: any) => {
          setContacts((contacts = contacts));
        }}
      />
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
