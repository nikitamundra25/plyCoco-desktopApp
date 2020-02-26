import gql from 'graphql-tag';

const UPDATE_CARE_INSTITUTION_STATUS = gql`
  mutation ChangeStatusCareInstitution($id: ID!, $isActive: Boolean) {
    changeStatusCareInstitution(id: $id, isActive: $isActive) {
      id
      isActive
    }
  }
`;

const DELETE_CARE_INSTITUTION = gql`
  mutation DeleteCareInstitution($id: ID!) {
    deleteCareInstitution(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`;

const ADD_CARE_INSTITUTION = gql`
  mutation AddCareInstitution($careInstitutionInput: CareInstitutionInput) {
    addCareInstitution(careInstitutionInput: $careInstitutionInput) {
      id
      firstName
    }
  }
`;

const UPDATE_CARE_INSTITUTION = gql`
  mutation updateCareInstitution(
    $id: Int!
    $careInstitutionInput: CareInstitutionInput!
    $isRemarkAdded: Boolean
  ) {
    updateCareInstitution(
      id: $id
      careInstitutionInput: $careInstitutionInput
      isRemarkAdded: $isRemarkAdded
    ) {
      firstName
      lastName
      salutation
      email
      userName
      phoneNumber
      id
      createdAt
      gender
      canstitution {
        city
        zipCode
        companyName
        shortName
        street
        countryId
        stateId
        remarks
        title
        fax
        linkedTo
        doctorCommission
        leasingPriceListId
        isArchive
        careGiverCommission
        anonymousName
        anonymousName2
        mobileNumber
        remarksViewable
        defaultQualification
        invoiceType
        emailInvoice
        addressInvoice
        interval
        website
        attributes
      }
      qualifications {
        id
        name
      }
      regions {
        id
        regionName
      }
      contact {
        salutation
        firstName
        surName
        gender
        title
        salutation
        firstName
        surName
        countryId
        street
        city
        contactType
        phoneNumber
        zip
        phoneNumber2
        fax
        mobileNumber
        email
        remark
        id
        attributes
      }
    }
  }
`;
const ADD_NEW_CONTACT_CARE_INSTITUTION = gql`
  mutation addContact($contactInput: ContactInput!) {
    addContact(contactInput: $contactInput) {
      id
      firstName
      surName
      contactType
      salutation
      gender
      title
      street
      city
      zip
      countryId
      phoneNumber
      phoneNumber2
      fax
      mobileNumber
      email
      remark
      attributes
    }
  }
`;
const UPDATE_NEW_CONTACT_CARE_INSTITUTION = gql`
  mutation updateContact($id: Int!, $contactInput: ContactInput!) {
    updateContact(id: $id, contactInput: $contactInput) {
      id
      firstName
      surName
      contactType
      gender
      title
      street
      city
      zip
      countryId
      phoneNumber
      phoneNumber2
      fax
      mobileNumber
      email
      remark
      attributes
    }
  }
`;

const ADD_NEW_CARE_INTITUTION = gql`
  mutation addUser($careInstInput: UserInput) {
    addUser(careInstInput: $careInstInput) {
      id
    }
  }
`;

const ADD_DEPARTMENT_CARE_INSTITUTION = gql`
  mutation addDivision($divisionInput: DivisionInput!) {
    addDivision(divisionInput: $divisionInput) {
      id
      userId
      name
      anonymousName
      anonymousName2
      address
      contactPerson
      phoneNumber
      faxNumber
      email
      commentsOffer
      commentsCareGiver
      commentsVisibleInternally
      locked
      times
      qualifications
      attributes
    }
  }
`;

const UPDATE_DEPARTMENT_CARE_INSTITUTION = gql`
  mutation updateDivision($id: Int!, $divisionInput: DivisionInput!) {
    updateDivision(id: $id, divisionInput: $divisionInput) {
      id
      userId
      name
      anonymousName
      anonymousName2
      address
      contactPerson
      phoneNumber
      faxNumber
      email
      commentsOffer
      commentsCareGiver
      commentsVisibleInternally
      locked
      times
      qualifications
      attributes
    }
  }
`;

const DELETE_DEPARTMENT = gql`
  mutation DeleteDivision($id: ID!) {
    deleteDivision(id: $id) {
      id
    }
  }
`;

const DELETE_CONTACT = gql`
  mutation deleteContact($id: ID!) {
    deleteContact(id: $id) {
      id
    }
  }
`;

const CONTACT_ADD_ATTRIBUTE = gql`
  mutation addContactAttribute($name: String) {
    addContactAttribute(name: $name) {
      name
      id
      color
    }
  }
`;
// Mutation to add custom contact type in care institution
const ADD_CUSTOM_CONTACT_TYPE = gql`
  mutation addContactType($contactType: String) {
    addContactType(contactType: $contactType) {
      id
      contactType
    }
  }
`;

export const CareInstitutionMutation = [
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
  DELETE_CONTACT,
  CONTACT_ADD_ATTRIBUTE,
  ADD_CUSTOM_CONTACT_TYPE,
];
