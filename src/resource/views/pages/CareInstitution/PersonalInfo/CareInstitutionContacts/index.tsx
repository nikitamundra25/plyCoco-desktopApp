import React, { useState, useEffect } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { languageTranslation, logger } from '../../../../../../helpers';
import { FormikProps, Formik, FormikHelpers } from 'formik';
import {
  ICareInstitutionContact,
  IReactSelectInterface,
  ICountries,
  IStates,
  ICountry,
  IState,
  ICareInstitutionFormValues
} from '../../../../../../interfaces';
import {
  CountryQueries,
  CareInstitutionQueries
} from '../../../../../../graphql/queries';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { CareInstituionContactValidationSchema } from '../../../../../validations';
import CotactFormComponent from './CotactFormComponent';
import { toast } from 'react-toastify';
import { CareInstitutionMutation } from '../../../../../../graphql/Mutations';
import { ConfirmBox } from '../../../../components/ConfirmBox';

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
  DELETE_CONTACT
] = CareInstitutionMutation;

const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;

const CareInstitutionContacts: any = (props: any) => {
  const { contacts, careInstId, ContactFromAdd } = props;
  const [activeContact, setActiveContact] = useState<number>(0);
  // To set new empty contact
  useEffect(() => {
    if (contacts && contacts.length) {
      setActiveContact(contacts.length - 1);
    }
  }, [contacts]);

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
      groupAttributes: ''
    };

    newContacts[newContacts.length - 1] = data.data.addContact;
    newContacts.push(ResctData);
    props.setContacts(newContacts);
  };
  // Mutation to add new contact
  const [
    addContact,
    { error: contactError, data: contactDataA }
  ] = useMutation<{
    addContact: ICareInstitutionFormValues;
  }>(ADD_NEW_CONTACT_CARE_INSTITUTION, { update: addContacts });

  // Mutation to update new contact
  const [updateContact] = useMutation<{
    updateContact: ICareInstitutionFormValues;
  }>(UPDATE_NEW_CONTACT_CARE_INSTITUTION);

  // Mutation to delete contact
  const [deleteContact, { data: deleteContactData }] = useMutation<
    { deleteContact: any },
    { id: number }
  >(DELETE_CONTACT);

  const { data, loading, error, refetch } = useQuery<ICountries>(GET_COUNTRIES);
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY
  );

  //use effect for delete contact
  useEffect(() => {
    if (deleteContactData) {
      props.refetch();
    }
  }, [deleteContactData]);

  const countriesOpt: IReactSelectInterface[] | undefined = [];
  const statesOpt: IReactSelectInterface[] | undefined = [];
  if (data && data.countries) {
    data.countries.forEach(({ id, name }: ICountry) =>
      countriesOpt.push({ label: name, value: id })
    );
  }
  if (statesData && statesData.states) {
    statesData.states.forEach(({ id, name }: IState) =>
      statesOpt.push({ label: name, value: id })
    );
  }

  const handleContactSubmit = async (
    values: ICareInstitutionContact,
    { setSubmitting }: FormikHelpers<ICareInstitutionContact>
  ) => {
    let AttributeData: string[] = [];
    if (values.attributeId && values.attributeId.length) {
      values.attributeId.map((attribute: IReactSelectInterface) =>
        AttributeData.push(attribute.label)
      );
    }
    try {
      //to set submit state to false after successful signup
      setSubmitting(false);
      const contactInput: any = {
        userId: parseInt(careInstId),
        gender: values && values.gender ? values.gender.value : '',
        title: values.title,
        salutation: values && values.salutation ? values.salutation.value : '',
        firstName: values.firstName,
        surName: values.lastName,
        contactType:
          values && values.contactType ? values.contactType.value : '',
        street: values.street,
        city: values.city,
        zip: values.zipCode,
        countryId: values && values.country ? values.country.value : '',
        phoneNumber: values.phoneNumber,
        phoneNumber2: values.phoneNumber,
        fax: values.faxNumber,
        mobileNumber: values.mobileNumber,
        email: values.email,
        remark: values.remark,
        attributes: AttributeData
      };
      if (id) {
        await updateContact({
          variables: {
            id: values.id ? parseInt(values.id) : null,
            contactInput: contactInput
          }
        });
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('CONTACT_UPDATE_CARE_INSTITUTION')
          );
        }
      } else {
        await addContact({
          variables: {
            contactInput: contactInput
          }
        });
        toast.success(languageTranslation('NEW_CONTACT_ADD_CARE_INSTITUTION'));
      }
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');

      toast.error(message);
      logger(error);
    }
  };

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
    contactType = undefined,
    gender = undefined,
    attributes = [],
    salutation = '',
    countryId = undefined
  } = contacts && contacts[activeContact] ? contacts[activeContact] : {};

  let countryData: Number;
  countryData = countryId ? countryId : '';
  let userSelectedCountry: any = {};
  if (data && data.countries) {
    const userCountry = data.countries.filter((x: any) => x.id === countryData);

    if (userCountry && userCountry.length) {
      userSelectedCountry = {
        label: userCountry[0].name,
        value: userCountry[0].id
      };
    }
  }

  let selectedAttributes: IReactSelectInterface[] = [];
  if (attributes && attributes.length) {
    attributes.map((attData: string) => {
      selectedAttributes.push({
        label: attData,
        value: attData
      });
    });
  }

  const contactFormValues: ICareInstitutionContact = {
    email,
    firstName,
    lastName: surName,
    userName,
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
    contactType: {
      label: contactType,
      value: contactType
    },
    gender: {
      label: gender,
      value: gender
    },
    salutation: {
      label: salutation,
      value: salutation
    },
    id,
    country: userSelectedCountry,
    remark,
    attributeId: selectedAttributes
  };

  const onDelete = async (id: string) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_CONTACT_DELETE_MSG')
    });
    if (!value) {
      return;
    } else {
      await deleteContact({
        variables: {
          id: parseInt(id)
        }
      });
      setActiveContact(contacts.length - 1);
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation('CONTACT_DELETE_SUCCESS_MSG')
        );
      }
    }
  };


  
  console.log('props.careInstitutionAttrOpt', props.careInstitutionAttrOpt);

  return (
    <>
      <div className={'form-section position-relative flex-grow-1'}>
        <div className='d-flex align-items-center justify-content-between  mb-2'>
          <Nav tabs className='contact-tabs'>
            {contacts && contacts.length
              ? contacts.map((contact: any, index: number) => {
                  return (
                    <NavItem className='text-capitalize' key={index}>
                      <NavLink
                        className={`${index === activeContact ? 'active' : ''}`}
                        onClick={() => setActiveContact(index)}
                      >
                        {contact && contact.contactType
                          ? contact.contactType + ' ' + contact.id
                          : 'New contact'}{' '}
                      </NavLink>
                      {contact && contact.contactType ? (
                        <span
                          className='cursor-pointer'
                          onClick={() => {
                            onDelete(contact.id);
                          }}
                        >
                          x
                        </span>
                      ) : null}
                    </NavItem>
                  );
                })
              : null}
          </Nav>
        </div>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={contactFormValues}
        onSubmit={handleContactSubmit}
        children={(props: FormikProps<ICareInstitutionContact> & any) => (
          <CotactFormComponent
            {...props}
            ContactFromAdd={ContactFromAdd}
            careInstitutionAttrOpt={props.careInstitutionAttrOpt}
          />
        )}
        validationSchema={CareInstituionContactValidationSchema}
      />
    </>
  );
};
export default CareInstitutionContacts;
