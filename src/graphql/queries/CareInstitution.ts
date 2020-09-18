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
        userRole
        isActive
        createdAt
        canstitution {
          city
          zipCode
          title
          companyName
          shortName
          attributes
        }
        contacts {
          salutation
          firstName
          surName
          userId
          contactTypeId
          email
          id
          contact_type {
            contactType
          }
        }
      }
    }
  }
`;

const GET_CARE_INSTITUION_BY_ID = gql`
  query getCareInstitution($careInstitutionId: Int!) {
    getCareInstitution(careInstitutionId: $careInstitutionId) {
      createdAt
      firstName
      lastName
      salutation
      email
      userName
      phoneNumber
      id
      userRole
      gender
      isApproved
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
        plycocoInvoiceTax
        leasingInvoiceTax
        defaultTaxValue
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
      attributes {
        id
        name
      }
      contacts {
        salutation
        firstName
        surName
        userId
        contactTypeId
        email
        id
        contact_type {
          contactType
        }
      }
      contact {
        salutation
        firstName
        surName
        gender
        title
        salutation
        firstName
        userId
        surName
        countryId
        stateId
        street
        city
        contactTypeId
        phoneNumber
        zip
        phoneNumber2
        fax
        mobileNumber
        email
        remark
        id
        attributes
        attribute_management {
          id
          name
          color
        }
        contact_type {
          contactType
        }
      }
    }
  }
`;

const GET_DEPARTMENT_LIST = gql`
  query($userId: Int!, $locked: Boolean) {
    getDivision(userId: $userId, locked: $locked) {
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

const GET_CAREINSTITUTION_ATTRIBUTES = gql`
  query getCareInstitutionAtrribute {
    getCareInstitutionAtrribute {
      id
      name
      color
    }
  }
`;

const GET_CONTACT_LIST_BY_ID = gql`
  query getContactsByUserID($userId: Int!) {
    getContactsByUserID(userId: $userId) {
      gender
      firstName
      surName
      contactTypeId
      attribute_management {
        id
        name
      }
      contact_type {
        contactType
      }
      id
      email
    }
  }
`;

const GET_CONTACT_TYPES = gql`
  query getContactType {
    getContactType {
      id
      contactType
    }
  }
`;

const GET_DIVISION_DETAILS_BY_ID = gql`
  query GetDivisionsDetails($id: ID) {
    getDivisionsDetails(id: $id) {
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
      remarks
      commentsOffer
      commentsCareGiver
      commentsVisibleInternally
      locked
      times
      attributes
      division_attributes {
        id
        name
        color
      }
      division_qualifications {
        id
        name
      },
      qualifications
      createdBy
      updatedBy
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

const GET_DEPARTMENT_ATTRIBUTES = gql`
  query getDepartmentAttribute {
    getDepartmentAttribute {
      id
      name
      color
    }
  }
`;

const GET_CONTACT_ATTRIBUTES = gql`
  query getContactAttribute {
    getContactAttribute {
      id
      name
      color
    }
  }
`;

const GET_NEGATIVE_USERS_CAREINSTITUTION_LIST = gql`
  query getNegativeListForCanstitution($id: ID!) {
    getNegativeListForCanstitution(id: $id) {
      negativeList {
        id
        firstName
        lastName
        canstitution{
          companyName
          shortName
        }
      }
    }
  }
`;

const GET_WORKED_AT_CAREINSTITUTION_LIST = gql`
  query getAllWorkedAtForCanstitution($userId: ID) {
    getAllWorkedAtForCanstitution(userId: $userId) {
      result{
        id 
        status
        ca{
          userId
          user{
            id
            firstName
            lastName
          }
        }
        cr{
          userId
          user{
            id
            firstName
            lastName
            canstitution{
              shortName
            }
          }
        }
      }
    }
  }
`;

export const CareInstitutionQueries = [
  GET_CARE_INSTITUTION_LIST,
  GET_CARE_INSTITUION_BY_ID,
  GET_DEPARTMENT_LIST,
  GET_CAREINSTITUTION_ATTRIBUTES,
  GET_CONTACT_LIST_BY_ID,
  GET_CONTACT_TYPES,
  GET_DIVISION_DETAILS_BY_ID,
  GET_DEPARTMENT_ATTRIBUTES,
  GET_CONTACT_ATTRIBUTES,
  GET_NEGATIVE_USERS_CAREINSTITUTION_LIST,
  GET_WORKED_AT_CAREINSTITUTION_LIST
];
