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
      id
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
        attributes
      }
    }
  }
`;

const GET_DEPARTMENT_LIST = gql`
  query($userId: Int!) {
    getDivision(userId: $userId) {
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

export const CareInstitutionQueries = [
  GET_CARE_INSTITUTION_LIST,
  GET_CARE_INSTITUION_BY_ID,
  GET_DEPARTMENT_LIST,
];