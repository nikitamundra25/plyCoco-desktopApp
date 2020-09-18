import gql from 'graphql-tag';

export const CAREGIVER_PERSONAL_INFO_FIELDS = `
{
    id
    firstName
    lastName
    salutation
    userName
    email
    password
    phoneNumber
    profileImage
    profileThumbnailImage
    isActive
    phoneNumber
    createdAt 
    gender
    caregiver{
      address1
      address2
      attributes
      age
      fax
      workZones
      mobileNumber
      countryId
      stateId
      zipCode
      employed
      salutation
      dateOfBirth
      gender
      comments
      companyName
      registerCourt
      remarks
      registrationNumber
      driversLicense
      driverLicenseNumber
      city
      street
      title
      taxNumber
      belongTo
      legalForm
      nightAllowance
      weekendAllowance
      executiveDirector
      phoneNumber
      fee
      holiday
      invoiceInterval,
      leasingPricingList
      night
      caregiverInvoiceTax
      defaultTaxValue
    }
    regions{
      id
     regionName
    }
    bankDetails{
      bankName
      IBAN
    }
    qualifications{
      id
      name
    }
}`;

const GET_CAREGIVERS = gql`
  query getCaregivers(
    $searchBy: String
    $sortBy: Int
    $limit: Int
    $page: Int
    $isActive: String
  ) {
    getCaregivers(
      searchBy: $searchBy
      sortBy: $sortBy
      limit: $limit
      page: $page
      isActive: $isActive
    ) {
      result {
        id
        salutation
        firstName
        lastName
        email
        userName
        phoneNumber
        gender
        userRole
        isActive
        createdAt
        qualifications {
          id
          name
        }
        caregiver {
          address1
          address2
          age
          fax
          workZones
          mobileNumber
          countryId
          stateId
          zipCode
          legalForm
          employed
          comments
          companyName
          registerCourt
          driversLicense
          driverLicenseNumber
          city
          street
          title
          attributes
        }
        regions {
          id
          regionName
        }
      }
      totalCount
    }
  }
`;

const GET_CAREGIVER_BY_ID = gql`
  query getCaregiver($id: Int!) {
    getCaregiver(id: $id) {
      id
      isApproved
      firstName
      lastName
      salutation
      userName
      email
      password
      phoneNumber
      profileImage
      gender
      userRole
      profileThumbnailImage
      isActive
      createdAt
      caregiver {
        address1
        address2
        age
        fax
        workZones
        mobileNumber
        countryId
        stateId
        zipCode
        employed
        comments
        companyName
        registerCourt
        remarks
        registrationNumber
        driversLicense
        driverLicenseNumber
        dateOfBirth
        city
        street
        title
        taxNumber
        belongTo
        legalForm
        nightAllowance
        weekendAllowance
        executiveDirector
        phoneNumber
        fee
        holiday
        invoiceInterval
        attributes
        vehicleAvailable
        night
        leasingPricingList
        caregiverInvoiceTax
        defaultTaxValue
      }
      qualifications {
        id
        name
      }
      regions {
        id
        regionName
      }
      bankDetails {
        bankName
        IBAN
      }
      attributes {
        id
        name
      }
    }
  }
`;

const GET_LEASING_INFO = gql`
  query getLeasingInformation($userId: Int!) {
    getLeasingInformation(userId: $userId) {
      id
      placeOfBirth
      birthName
      factorChildAllowance
      socialSecurityNumber
      payrollIBAN
      preOccupation
      status
      nationality
      maritalStatus
      religion
      children
      healthInsuranceType
      healthInsuranceProvider
      controlId
      taxBracket
      firstDay
      lastDay
      monthlyWorkingHrs
      weeklyWorkingHrs
    }
  }
`;

const GET_EMAILS = gql`
  query getEmails(
    $senderUserId: Int
    $receiverUserId: Int
    $from: String
    $searchBy: String
  ) {
    getEmails(
      senderUserId: $senderUserId
      receiverUserId: $receiverUserId
      from: $from
      searchBy: $searchBy
    ) {
      id
      senderUserId
      receiverUserId
      to
      subject
      body
      attachments
      createdAt
      contact {
        firstName
        surName
        id
        contact_type {
          contactType
        }
      }
    }
  }
`;

const GET_BELONGS_TO = gql`
  query getBelongTo($userId: Int!) {
    getBelongTo(userId: $userId) {
      id
      firstName
      lastName
    }
  }
`;

const GET_CAREGIVER_ATTRIBUTES = gql`
  query getCaregiverAtrribute {
    getCaregiverAtrribute {
      id
      name
      color
    }
  }
`;

const GET_CAREGIVERS_FOR_BULK_EMAIL = gql`
  query getCaregivers(
    $searchBy: String
    $sortBy: Int
    $limit: Int
    $page: Int
    $isActive: String
  ) {
    getCaregivers(
      searchBy: $searchBy
      sortBy: $sortBy
      limit: $limit
      page: $page
      isActive: $isActive
    ) {
      result {
        id
        firstName
        lastName
        email
      }
      totalCount
    }
  }
`;

const GET_NEGATIVE_USERS_LIST = gql`
  query GetNegativeList($id: ID!) {
    getNegativeList(id: $id) {
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

const GET_CAREGIVER_BY_NAME =  gql`
query getCaregiverByName(
  $searchBy: String
  $limit: Int
  $page: Int
) {
  getCaregiverByName(
    searchBy: $searchBy
    limit: $limit
    page: $page
  ) {
    result {
      id
      firstName
      lastName
      isActive
      caregiver {
        attributes
      }
    }
    totalCount
  }
}`;

const GET_INVOICE_BY_USERID =  gql`
query getInvoiceByUserId( $userId: ID!) {
  getInvoiceByUserId(
    userId: $userId
  ) {
    result{
      id
      invoiceNumber
      dueDate
      invoiceDate
      plycocoPdf
      cancelledBy
      cancelledFor
      comment
      createdAt
      tax
      amount
      invoiceType
      status
      careinstitution{
        id
        firstName
        lastName
        userName  
      }
      caregiver{
        id
        firstName
        lastName
        userName  
      }
    }
    totalCount
  }
}`;
// query {
//   getNegativeList(id: 1419){
//     blackList{
//       firstName
//       lastName
//     }
//   }
//  }
//  getNegativeList(id: ID!): User

const GET_ALL_PAYSLIP_CAREGIVER = gql`
  query getAllPayslipCaregiver($userId: ID) {
    getAllPayslipCaregiver(userId: $userId) {
      year
      payslips{
        id
        totalSalary
        date
        comment
    }
  }
  }
`;

const GET_WORKED_AT_LIST = gql`
  query getAllWorkedAt($userId: ID) {
    getAllWorkedAt(userId: $userId) {
      result{
        id 
        status
        ca{
          userId
          user{
            id
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

export const CareGiverQueries = [
  GET_CAREGIVERS,
  GET_CAREGIVER_BY_ID,
  GET_LEASING_INFO,
  GET_EMAILS,
  GET_BELONGS_TO,
  GET_CAREGIVER_ATTRIBUTES,
  GET_CAREGIVERS_FOR_BULK_EMAIL,
  GET_NEGATIVE_USERS_LIST,
  GET_CAREGIVER_BY_NAME,
  GET_INVOICE_BY_USERID,
  GET_ALL_PAYSLIP_CAREGIVER,
  GET_WORKED_AT_LIST
];

