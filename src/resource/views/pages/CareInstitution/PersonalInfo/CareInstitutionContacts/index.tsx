import React, { useState, useEffect } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { toast } from 'react-toastify';
import { FormikProps, Formik, FormikHelpers } from 'formik';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import {
  languageTranslation,
  logger,
  errorFormatter,
} from '../../../../../../helpers';
import {
  ICareInstitutionContact,
  IReactSelectInterface,
  ICountries,
  IStates,
  ICountry,
  IState,
  ICareInstitutionFormValues,
  IAttributeOptions,
} from '../../../../../../interfaces';
import {
  CountryQueries,
  CareInstitutionQueries,
} from '../../../../../../graphql/queries';
import { CareInstitutionMutation } from '../../../../../../graphql/Mutations';
import { CareInstituionContactValidationSchema } from '../../../../../validations';
import CotactFormComponent from './CotactFormComponent';
import { ConfirmBox } from '../../../../components/ConfirmBox';
import Loader from '../../../../containers/Loader/Loader';
import close from '../../../../../assets/img/close.svg';

let toastId: any;

const [
  ,
  ,
  ,
  UPDATE_NEW_CONTACT_CARE_INSTITUTION,
  ,
  ,
  ADD_NEW_CONTACT_CARE_INSTITUTION,
  ,
  ,
  ,
  DELETE_CONTACT,
  CONTACT_ADD_ATTRIBUTE,
  ADD_CUSTOM_CONTACT_TYPE,
] = CareInstitutionMutation;

const [
  ,
  ,
  ,
  GET_CAREINSTITUTION_ATTRIBUTES,
  ,
  GET_CONTACT_TYPES,
] = CareInstitutionQueries;

const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;

const CareInstitutionContacts: any = (props: any) => {
  const {
    contacts,
    careInstId,
    ContactFromAdd,
    careInstitutionAttrOpt,
  } = props;
  const [activeContact, setActiveContact] = useState<number>(0);
  const [selectedAttributes, setSelectedAttributes] = useState<
    IReactSelectInterface[]
  >([]);
  // Mutation to add custom contact type
  const [addContactType, { loading: addingtype }] = useMutation<{
    addContactType: ICareInstitutionFormValues;
  }>(ADD_CUSTOM_CONTACT_TYPE, {
    update(cache, customData: any) {
      const { data } = customData;
      const { addContactType = {} } = data ? data : {};
      if (addContactType && addContactType.id) {
        setcontacttypeOpt((prevArray: any) => [
          ...prevArray,
          {
            label: addContactType.contactType,
            value: addContactType.id,
          },
        ]);
        const { getContactType }: any = cache.readQuery({
          query: GET_CONTACT_TYPES,
        });
        cache.writeQuery({
          query: GET_CONTACT_TYPES,
          data: { getContactType: [...getContactType, addContactType] },
        });
      }
    },
  });

  const [
    fetchContactTypeList,
    { data: ContactTypeData, loading, called },
  ] = useLazyQuery<any>(GET_CONTACT_TYPES);

  useEffect(() => {
    fetchContactTypeList();
  }, []);

  const [contacttypeOpt, setcontacttypeOpt] = useState<IReactSelectInterface[]>(
    [],
  );

  useEffect(() => {
    if (ContactTypeData) {
      const { getContactType } = ContactTypeData;
      let temp: IReactSelectInterface[] = [];
      if (getContactType && getContactType.length) {
        getContactType.map((data: any) => {
          temp.push({
            label: data.contactType,
            value: data.id,
          });
        });
        setcontacttypeOpt(temp);
      }
    }
  }, [ContactTypeData]);

  // To reset selected attribute on contact change
  useEffect(() => {
    setSelectedAttributes([]);
  }, [activeContact]);

  const addContacts = (cache: any, data: any) => {
    let newContacts = contacts;
    const ResctData: any = {
      email: '',
      firstName: '',
      lastName: '',
      userName: '',
      phoneNumber: '',
      mobileNumber: '',
      faxNumber: '',
      comments: '',
      groupAttributes: '',
    };

    newContacts[newContacts.length - 1] = {
      ...data.data.addContact,
      attributes:
        data.data.addContact &&
        data.data.addContact.attributes &&
        data.data.addContact.attributes.length
          ? careInstitutionAttrOpt.filter((attrOpt: IAttributeOptions) =>
              data.data.addContact.attributes.includes(parseInt(attrOpt.value)),
            )
          : [],
    };
    newContacts.push(ResctData);
    props.setContacts(newContacts);
  };
  // Mutation to add new contact
  const [
    addContact,
    { error: contactError, data: contactDataA },
  ] = useMutation<{
    addContact: ICareInstitutionFormValues;
  }>(ADD_NEW_CONTACT_CARE_INSTITUTION, { update: addContacts });

  useEffect(() => {
    if (contactDataA) {
      props.neContactAdded();
    }
  }, [contactDataA]);

  // Mutation to update new contact
  const [updateContact] = useMutation<{
    updateContact: ICareInstitutionFormValues;
  }>(UPDATE_NEW_CONTACT_CARE_INSTITUTION);

  // Mutation to delete contact
  const [deleteContact, { data: deleteContactData }] = useMutation<
    { deleteContact: any },
    { id: number }
  >(DELETE_CONTACT);
  // let selectedAttributes: IReactSelectInterface[] = [];
  // Mutation to add new attributes in contact
  const [addAttribute, { data: addAttriContact }] = useMutation<{
    name: string;
  }>(CONTACT_ADD_ATTRIBUTE, {
    update(cache, customData: any) {
      const { data } = customData;
      const { addContactAttribute = {} } = data ? data : {};
      if (addContactAttribute && addContactAttribute.id) {
        const { getCareInstitutionAtrribute }: any = cache.readQuery({
          query: GET_CAREINSTITUTION_ATTRIBUTES,
        });
        // Update cache with new value
        cache.writeQuery({
          query: GET_CAREINSTITUTION_ATTRIBUTES,
          data: {
            getCareInstitutionAtrribute: [
              ...getCareInstitutionAtrribute,
              addContactAttribute,
            ],
          },
        });
      }
    },
    onCompleted({ addContactAttribute }: any) {
      setcontactAttributeOpt((prevArray: any) => [
        ...prevArray,
        {
          label: addContactAttribute.name,
          value: addContactAttribute.name,
        },
      ]);
    },
  });

  const { data, error, refetch } = useQuery<ICountries>(GET_COUNTRIES);
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY,
  );

  //use effect for delete contact
  useEffect(() => {
    if (deleteContactData) {
      props.refetch();
    }
  }, [deleteContactData]);

  const [isNewAttribute, setisNewAttribute] = useState<any>([]);

  const countriesOpt: IReactSelectInterface[] | undefined = [];
  const statesOpt: IReactSelectInterface[] | undefined = [];
  if (data && data.countries) {
    data.countries.forEach(({ id, name }: ICountry) =>
      countriesOpt.push({ label: name, value: id }),
    );
  }
  if (statesData && statesData.states) {
    statesData.states.forEach(({ id, name }: IState) =>
      statesOpt.push({ label: name, value: id }),
    );
  }

  const handleContactSubmit = async (
    values: ICareInstitutionContact,
    { setSubmitting }: FormikHelpers<ICareInstitutionContact>,
  ) => {
    let AttributeData: any = [];
    if (values.attributeId && values.attributeId.length) {
      values.attributeId.map((attribute: IReactSelectInterface) =>
        AttributeData.push(parseInt(attribute.value)),
      );
    }
    try {
      //to set submit state to false after successful signup
      const contactInput: any = {
        userId: parseInt(careInstId),
        gender: values && values.gender ? values.gender.value : '',
        title: values.title,
        salutation: values && values.salutation ? values.salutation.value : '',
        firstName: values.firstName,
        surName: values.lastName,
        contactTypeId:
          values && values.contactType ? values.contactType.value : '',
        street: values.street,
        city: values.city,
        zip: values.zipCode,
        countryId: values && values.country ? values.country.value : '',
        stateId: values && values.state ? values.state.value : '',
        phoneNumber: values.phoneNumber,
        phoneNumber2: values.phoneNumber,
        fax: values.faxNumber,
        mobileNumber: values.mobileNumber,
        email: values.email,
        remark: values.remark,
        attributes: AttributeData,
      };
      if (id) {
        await updateContact({
          variables: {
            id: values.id ? parseInt(values.id) : null,
            contactInput: contactInput,
          },
        });
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('CONTACT_UPDATE_CARE_INSTITUTION'),
          );
        }
        setSubmitting(false);
      } else {
        await addContact({
          variables: {
            contactInput: contactInput,
          },
        });
        toast.success(languageTranslation('NEW_CONTACT_ADD_CARE_INSTITUTION'));
      }
    } catch (error) {
      const message = errorFormatter(error.message);
      toast.error(message);
      logger(error);
    }
  };

  let selecContactType: IReactSelectInterface = { label: '', value: '' };

  if (contacts && contacts[activeContact]) {
    if (contacttypeOpt && contacttypeOpt.length) {
      const userContactType = contacttypeOpt.filter((x: any) => {
        return (
          parseInt(x.value) === parseInt(contacts[activeContact].contactTypeId)
        );
      });
      if (userContactType && userContactType.length) {
        selecContactType = {
          label: userContactType[0].label,
          value: userContactType[0].value,
        };
      }
    }
  }

  const {
    email = '',
    firstName = '',
    surName = '',
    userName = '',
    phoneNumber = '',
    phoneNumber2 = '',
    mobileNumber = '',
    fax = '',
    comments = '',
    groupAttributes = '',
    id = '',
    remark = '',
    street = '',
    city = '',
    zip = '',
    title = '',
    contactType = { label: '', value: '' },
    gender = undefined,
    attributes = [],
    salutation = '',
    stateId = undefined,
    countryId = undefined,
  } = contacts && contacts[activeContact] ? contacts[activeContact] : {};
  let countryData: Number;
  countryData = countryId ? countryId : '';
  let userSelectedCountry: IReactSelectInterface | undefined = undefined;
  if (data && data.countries) {
    const userCountry = data.countries.filter((x: any) => x.id === countryData);

    if (userCountry && userCountry.length) {
      userSelectedCountry = {
        label: userCountry[0].name,
        value: userCountry[0].id,
      };
    }
  }

  let userSelectedState: IReactSelectInterface | undefined = undefined;
  if (statesData && statesData.states && stateId) {
    const userState = statesData.states.filter((x: any) => x.id === stateId);
    if (userState && userState.length) {
      userSelectedState = {
        label: userState[0].name,
        value: userState[0].id,
      };
    }
  }
  useEffect(() => {
    let attributesData: IReactSelectInterface[] = [];
    if (attributes && attributes.length) {
      attributes.map((attData: any) => {
        attributesData.push({
          label: attData.name,
          value: attData.id,
          color: attData.color,
        });
      });
      setSelectedAttributes(attributesData);
    }
  }, [contacts[activeContact]]);

  // To set active contact
  useEffect(() => {
    if (contacts && contacts.length) {
      setActiveContact(0);
      getStatesByCountry({
        variables: {
          countryid: userSelectedCountry ? userSelectedCountry.value : '',
        },
      });
    }
  }, [contacts]);

  const contactFormValues: ICareInstitutionContact = {
    email: email ? email.trim() : '',
    firstName: firstName ? firstName.trim() : '',
    lastName: surName ? surName.trim() : '',
    userName: userName ? userName.trim() : '',
    phoneNumber,
    phoneNumber2,
    mobileNumber,
    faxNumber: fax,
    comments,
    groupAttributes,
    street,
    zipCode: zip,
    city,
    title,
    contactType: selecContactType,
    gender: gender
      ? {
          label: gender,
          value: gender,
        }
      : undefined,
    salutation: salutation
      ? {
          label: salutation,
          value: salutation,
        }
      : undefined,
    id,
    country: userSelectedCountry,
    state: userSelectedState,
    remark,
    attributeId: attributes,
  };

  const onDelete = async (id: string) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_CONTACT_DELETE_MSG'),
    });
    if (!value) {
      return;
    } else {
      await deleteContact({
        variables: {
          id: parseInt(id),
        },
      });
      setActiveContact(contacts.length - 1);
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation('CONTACT_DELETE_SUCCESS_MSG'),
        );
      }
    }
  };
  const [contactAttributeOpt, setcontactAttributeOpt] = useState<
    IAttributeOptions[] | undefined
  >([]);

  useEffect(() => {
    if (careInstitutionAttrOpt && careInstitutionAttrOpt.length) {
      setcontactAttributeOpt(careInstitutionAttrOpt);
    }
  }, [careInstitutionAttrOpt]);

  return (
    <>
      {contacttypeOpt && contacttypeOpt.length <= 0 ? (
        <Loader />
      ) : (
        <div className={'form-section position-relative flex-grow-1'}>
          <div className='d-flex align-items-center justify-content-between  '>
            <Nav tabs className='contact-tabs pr-120'>
              {contacts && contacts.length
                ? contacts.map((contact: any, index: number) => {
                    const contactTypeData:
                      | IReactSelectInterface
                      | undefined = contacttypeOpt.filter(
                      (element: IReactSelectInterface) =>
                        element.value === contact.contactTypeId,
                    )[0];

                    return (
                      <NavItem className='text-capitalize mb-2' key={index}>
                        <NavLink
                          className={`${
                            contact && contact.contactTypeId
                              ? 'contact-right'
                              : 'new-contact'
                          }  ${index === activeContact ? 'active' : ''}`}
                          onClick={() => setActiveContact(index)}
                        >
                          {contact && contact.contactTypeId ? (
                            contactTypeData ? (
                              contactTypeData.label
                            ) : null
                          ) : (
                            <>
                              <span className='align-middle'>
                                <i className='fa fa-plus mr-1'></i>
                              </span>
                              <span className='align-middle'>New contact</span>
                            </>
                          )}{' '}
                        </NavLink>
                        {contact && contact.contactTypeId ? (
                          <span
                            className='tab-close cursor-pointer'
                            onClick={() => {
                              onDelete(contact.id);
                            }}
                          >
                            <img src={close} alt='' />
                          </span>
                        ) : null}
                      </NavItem>
                    );
                  })
                : null}
            </Nav>
          </div>
        </div>
      )}
      <Formik
        enableReinitialize={true}
        initialValues={contactFormValues}
        onSubmit={handleContactSubmit}
        children={(props: FormikProps<ICareInstitutionContact> & any) => (
          <>
            <CotactFormComponent
              {...props}
              ContactFromAdd={ContactFromAdd}
              contacttypeOpt={contacttypeOpt}
              addAttribute={(data: String) => {
                // attributes && !attributes.length
                //   ? setisNewAttribute(isNewAttribute.push(data))
                //   : null;
                addAttribute({
                  variables: {
                    name: data,
                  },
                });
              }}
              addContactType={addContactType}
              addingtype={addingtype}
              addAttriContactData={addAttriContact}
              careInstitutionAttrOpt={contactAttributeOpt}
              userSelectedCountry={userSelectedCountry}
            />
          </>
        )}
        validationSchema={CareInstituionContactValidationSchema}
      />
    </>
  );
};
export default CareInstitutionContacts;
