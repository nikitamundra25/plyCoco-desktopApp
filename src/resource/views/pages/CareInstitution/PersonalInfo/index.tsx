import React, { useEffect, useState } from 'react';
import { Form } from 'reactstrap';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import PersonalInfoForm from './PersonalInfoForm';
import {
  ICareInstitutionFormValues,
  IReactSelectInterface,
  ICountries,
  IStates,
  IAttributeValues,
  IAttributeOptions,
  IState,
  ICountry,
} from '../../../../../interfaces';
import { CareInstituionValidationSchema } from '../../../../validations';
import { useParams } from 'react-router';
import {
  CareInstitutionQueries,
  CountryQueries,
} from '../../../../../graphql/queries';
import {
  logger,
  languageTranslation,
  germanNumberFormat,
} from '../../../../../helpers';
import CareInstitutionContacts from './CareInstitutionContacts';
import { RegionQueries } from '../../../../../graphql/queries/Region';
import { CareInstitutionMutation } from '../../../../../graphql/Mutations';
import { IQualification } from '../../../../../interfaces/qualification';
import { errorFormatter } from '../../../../../helpers';
import Loader from '../../../containers/Loader/Loader';
import '../careinstitution.scss';
import { RemarkMutations } from '../../../../../graphql/Mutations';

let toastId: any;

const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;
const [, GET_REGIONS] = RegionQueries;
const [
  GET_CARE_INSTITUTION_LIST,
  GET_CARE_INSTITUION_BY_ID,
  GET_DEPARTMENT_LIST,
  GET_CAREINSTITUTION_ATTRIBUTES,
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
  DELETE_DEPARTMENT,
] = CareInstitutionMutation;
const [UPDATE_REMARKS] = RemarkMutations;

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
    { data: careInstituionDetails, loading, refetch },
  ] = useLazyQuery<any>(GET_CARE_INSTITUION_BY_ID);

  // Fetch attribute list from db
  const { data: attributeData } = useQuery<{
    getCareInstitutionAtrribute: IAttributeValues[];
  }>(GET_CAREINSTITUTION_ATTRIBUTES);
  // Push into attribute options
  const careInstitutionAttrOpt: IAttributeOptions[] | undefined = [];
  if (attributeData && attributeData.getCareInstitutionAtrribute) {
    attributeData.getCareInstitutionAtrribute.forEach(
      ({ id, name, color }: IAttributeValues) =>
        careInstitutionAttrOpt.push({
          label: name,
          value: id ? id.toString() : '',
          color,
        }),
    );
  }

  const [remarksDetail, setRemarksDetail] = useState<any>([]);
  //To get country details
  const { data: countries } = useQuery<ICountries>(GET_COUNTRIES);
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY,
  );
  // to update remarks
  const [updateRemark, { data: remarkData }] = useMutation<any>(UPDATE_REMARKS);

  const countriesOpt: IReactSelectInterface[] | undefined = [];
  if (countries && countries.countries) {
    countries.countries.forEach(({ id, name }: ICountry) =>
      countriesOpt.push({ label: name, value: id }),
    );
  }
  // To get region list
  const [fetchRegionList, { data: RegionData }] = useLazyQuery<any>(
    GET_REGIONS,
  );

  useEffect(() => {
    // call query
    fetchRegionList({
      variables: {
        limit: 25,
      },
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
      const { getCareInstitution = {} } = careInstituionDetails
        ? careInstituionDetails
        : {};
      const { contact = [] } = getCareInstitution ? getCareInstitution : {};
      const contactsData: any[] = [];
      contact.forEach((element: any) => {
        let attr_value: IAttributeOptions[] = [];
        if (element.attributes && element.attributes.length) {
          attr_value = careInstitutionAttrOpt.filter(
            (attrOpt: IAttributeOptions) =>
              element.attributes.includes(parseInt(attrOpt.value)),
          );
        }
        contactsData.push({
          ...element,
          attributes: attr_value,
        });
      });

      logger(
        careInstituionDetails.getCareInstitution,
        'careInstituionDetails****',
      );
      // const contactsData: any[] = [
      //   ...careInstituionDetails.getCareInstitution.contact,
      // ];
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
          attributeId: [],
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
          attributeId: [],
        });
      }
      setContacts(contactsData);
    }
  }, [careInstituionDetails]);

  // useEffect(() => {
  //   if (careInstituionDetails && careInstituionDetails.getCareInstitution) {
  //     const { getCareInstitution } = careInstituionDetails;

  //     getStatesByCountry({
  //       variables: {
  //         countryid: getCareInstitution.canstitution
  //           ? getCareInstitution.canstitution.countryId
  //           : ''
  //       }
  //     });
  //   }
  // }, [careInstituionDetails]);

  useEffect(() => {
    if (careInstituionDetails && careInstituionDetails.getCareInstitution) {
      const { getCareInstitution } = careInstituionDetails;
      const { canstitution } = getCareInstitution;
      if (canstitution && canstitution.countryId) {
        getStatesByCountry({
          variables: {
            countryid: canstitution ? canstitution.countryId : '',
          },
        });
      }
    }
  }, [careInstituionDetails]);

  const handleSubmit = async (
    values: ICareInstitutionFormValues,
    { setSubmitting }: FormikHelpers<ICareInstitutionFormValues>,
  ) => {
    //to set submit state to false after successful signup
    let AttributeData: any = [];
    if (values.attributeId && values.attributeId.length) {
      values.attributeId.map((attribute: IReactSelectInterface) =>
        AttributeData.push(parseInt(attribute.value)),
      );
    }

    try {
      const careInstitutionInput: any = {
        gender: values && values.gender ? values.gender.value : '',
        salutation: values && values.salutation ? values.salutation.value : '',
        firstName: values.firstName ? values.firstName.trim() : '',
        lastName: values.lastName ? values.lastName.trim() : '',
        shortName: values.shortName ? values.shortName.trim() : '',
        companyName: values.companyName ? values.companyName.trim() : '',
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
          values && values.regionId && values.regionId.value
            ? parseInt(values.regionId.value)
            : null,
        website: values.website,
        email: values.email ? values.email.trim() : '',
        userName: values.userName ? values.userName.trim() : '',
        careGiverCommission: values.careGiverCommission
          ? values.careGiverCommission.replace(/,/g, '.')
          : null,
        doctorCommission: values.doctorCommission
          ? values.doctorCommission.replace(/,/g, '.')
          : null,
        invoiceType:
          values && values.invoiceType ? values.invoiceType.value : '',
        interval: values && values.interval ? values.interval.value : '',
        emailInvoice: values.emailInvoice,
        addressInvoice: values.addressInvoice,
        qualificationId:
          values.qualificationId && values.qualificationId.length
            ? values.qualificationId.map(
                (qualification: IReactSelectInterface) =>
                  parseInt(qualification.value),
              )
            : null,
        attributes: AttributeData,
        leasingPriceListId:
          values.leasingPriceListId && values.leasingPriceListId.value
            ? values.leasingPriceListId.value
            : null,
      };
      await updateCareInstitution({
        variables: {
          id: parseInt(Id),
          careInstitutionInput: careInstitutionInput,
        },
      });
      toastId = toast.success(languageTranslation('CARE_INSTI_UPDATE_SUCCESS'));
    } catch (error) {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
    setSubmitting(false);
  };
  let Data: IReactSelectInterface;
  let values: ICareInstitutionFormValues;
  let regionId: String;

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
        await updateRemark({
          variables: {
            id: parseInt(id),
            remarks: remarksData ? remarksData : remarksDetail, // send remarksData in case of delete
          },
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
  let userSelectedCountry: any = {};
  const convertintoLabelValue = (data: string) => {
    return data
      ? {
          label: data,
          value: data,
        }
      : undefined;
  };
  if (careInstituionDetails && careInstituionDetails.getCareInstitution) {
    const { getCareInstitution } = careInstituionDetails;
    const {
      createdAt = new Date(),
      email = '',
      firstName = '',
      lastName = '',
      gender = '',
      userName = '',
      phoneNumber = '',
      salutation = '',
      canstitution = {},
      qualifications = [],
      regions = [],
    } = getCareInstitution ? getCareInstitution : {};
    const {
      title = '',
      shortName = '',
      companyName = '',
      anonymousName = '',
      anonymousName2 = '',
      countryId = '',
      stateId = '',
      street = '',
      city = '',
      zipCode = '',
      fax = '',
      mobileNumber = '',
      website = '',
      remarks = '',
      careGiverCommission = '',
      doctorCommission = '',
      leasingPriceListId = '',
      remarksViewable = '',
      defaultQualification = '',
      invoiceType = '',
      interval = '',
      emailInvoice = '',
      addressInvoice = '',
      linkedTo = '',
      attributes = [],
    } = canstitution ? canstitution : {};

    regionId = regions && regions.length ? regions[0].id : '';

    if (countries && countries.countries && countryId) {
      const userCountry = countries.countries.filter(
        (x: any) => parseInt(x.id) === countryId,
      );

      if (userCountry && userCountry.length) {
        userSelectedCountry = {
          label: userCountry[0].name,
          value: userCountry[0].id,
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
        (x: any) => x.id === regionId,
      );

      if (userRegion && userRegion.length) {
        userSelectedRegion = {
          label: userRegion[0].regionName,
          value: userRegion[0].id,
        };
      }
    }

    let UserSelectedLinkedTo: IReactSelectInterface | undefined = undefined;
    const statesOpt: IReactSelectInterface[] | undefined = [];

    if (props.CareInstitutionList && linkedTo) {
      const userSelectedLinkedTo = props.CareInstitutionList.filter(
        (x: any) => x.value === linkedTo,
      );
      if (userSelectedLinkedTo && userSelectedLinkedTo.length) {
        UserSelectedLinkedTo = userSelectedLinkedTo[0];
      }
    }
    let userSelectedState: IReactSelectInterface | undefined = undefined;
    if (statesData && statesData.states && stateId) {
      const userState = statesData.states.filter(
        (x: any) => parseInt(x.id) === stateId,
      );
      if (userState && userState.length) {
        userSelectedState = {
          label: userState[0].name,
          value: userState[0].id,
        };
      }
      statesData.states.forEach(({ id, name }: IState) =>
        statesOpt.push({ label: name, value: id }),
      );
    }
    let selectedAttributes: IAttributeOptions[] = [];
    if (attributes && attributes.length) {
      attributes.map((attData: number) => {
        const data = careInstitutionAttrOpt.filter((attr: any) => {
          return parseInt(attr.value) === attData;
        })[0];
        selectedAttributes.push({
          label: data ? data.label : attData,
          value: data ? data.value : attData,
          color: data ? data.color : '',
        });
      });
    }

    values = {
      id: Id,
      createdAt,
      email,
      firstName,
      lastName,
      gender: convertintoLabelValue(gender),
      userName,
      phoneNumber: phoneNumber || '',
      salutation: convertintoLabelValue(salutation),
      title,
      shortName,
      companyName,
      anonymousName: anonymousName || '',
      anonymousName2: anonymousName2 || '',
      street,
      city,
      zipCode: zipCode || '',
      mobileNumber: mobileNumber || '',
      fax: fax || '',
      website: website || '',
      remarksViewable: remarksViewable || '',
      country: userSelectedCountry.value
        ? {
            label: userSelectedCountry.value ? userSelectedCountry.label : null,
            value: userSelectedCountry.value ? userSelectedCountry.value : null,
          }
        : undefined,
      state:
        userSelectedState && userSelectedState.value
          ? { label: userSelectedState.label, value: userSelectedState.value }
          : undefined,
      stateId: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.stateId
        : '',
      isArchive: getCareInstitution.canstitution
        ? getCareInstitution.canstitution.isArchive
        : '',
      regionId: userSelectedRegion.value ? userSelectedRegion : undefined,
      linkedTo: UserSelectedLinkedTo ? UserSelectedLinkedTo : undefined,
      qualificationId: qualifications.map(({ name, id }: IQualification) => ({
        label: name,
        value: id,
      })),
      attributeId: selectedAttributes,
      remarkData: '',
      // Invoice related fields
      invoiceType: convertintoLabelValue(invoiceType),
      emailInvoice,
      addressInvoice: addressInvoice || '',
      interval: convertintoLabelValue(interval),
      // Fees related fields
      careGiverCommission:
        careGiverCommission !== null
          ? germanNumberFormat(careGiverCommission)
          : '',
      doctorCommission:
        doctorCommission !== null ? germanNumberFormat(doctorCommission) : '',
      leasingPriceListId: convertintoLabelValue(leasingPriceListId),
    };
    // values.qualificationId = qualificationsData;

    Data = {
      label: `${getCareInstitution.lastName} ${''} ${
        getCareInstitution.firstName
      }`,
      value: Id,
    };
  } else {
    values = {
      countryId: '',
      createdAt: new Date(),
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
      remarkData: '',
    };
  }

  useEffect(() => {
    if (careInstituionDetails && careInstituionDetails.getCareInstitution) {
      if (careInstituionDetails.getCareInstitution.firstName) {
        props.currentSelectuser(Data);
      }
    }
  }, [careInstituionDetails && careInstituionDetails.getCareInstitution]);

  const { qualificationList } = props;
  const CareInstitutionLinkedTo = props.CareInstitutionList;
  return loading ? (
    <div className='overview-loader'>
      <Loader />
    </div>
  ) : (
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
            careInstitutionAttrOpt={careInstitutionAttrOpt}
            countriesOpt={countriesOpt}
            userSelectedCountry={userSelectedCountry}
          />
        )}
        validationSchema={CareInstituionValidationSchema}
      />
      <div className='position-relative'>
        <CareInstitutionContacts
          contacts={contacts}
          careInstId={id}
          careInstitutionAttrOpt={careInstitutionAttrOpt}
          refetch={() => refetch()}
          setContacts={(contacts: any) => {
            setContacts((contacts = contacts));
          }}
          neContactAdded={() => props.neContactAdded()}
        />
      </div>
    </Form>
  );
};
export default PersonalInformation;
