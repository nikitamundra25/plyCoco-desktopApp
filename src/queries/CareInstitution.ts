import gql from 'graphql-tag';

const GET_CARE_INSTITUTION_LIST = gql`
  query(
    $searchBy: String
    $sortBy: Int
    $limit: Int
    $page: Int
    $isActive: String
  ) {
    getCareInstitutions(
      searchBy: $searchBy
      sortBy: $sortBy
      limit: $limit
      page: $page
      isActive: $isActive
    ) {
      totalCount
      careInstitutionData {
        id
        firstName
        lastName
        email
        userName
        phoneNumber
        isActive
        createdAt
        canstitution {
          city
          zipCode
          title
          companyName
          shortName
        }
      }
    }
  }
`;

const GET_CARE_INSTITUION_BY_ID = gql`
  query getCareInstitution($careInstitutionId: Int!) {
    getCareInstitution(careInstitutionId: $careInstitutionId) {
      firstName
      lastName
      salutation
      email
      userName
      phoneNumber

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
      }
      qualifications {
        id
        attributeName
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
      }
    }
  }
`;

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
  ) {
    updateCareInstitution(
      id: $id
      careInstitutionInput: $careInstitutionInput
    ) {
      firstName
      lastName
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
    }
  }
`;
export const CareInstitutionQueries = [
  GET_CARE_INSTITUTION_LIST,
  DELETE_CARE_INSTITUTION,
  UPDATE_CARE_INSTITUTION,
  ADD_CARE_INSTITUTION,
  GET_CARE_INSTITUION_BY_ID,
  UPDATE_CARE_INSTITUTION_STATUS,
  ADD_NEW_CONTACT_CARE_INSTITUTION,
  UPDATE_NEW_CONTACT_CARE_INSTITUTION,
];
