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
      age
      fax
      workZones
      mobileNumber
      countryId
      stateId
      postalCode
      employed
      salutation
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
      bankName
      legalForm
      nightAllowance
      weekendAllowance
      executiveDirector
      phoneNumber
      fee
      holiday
      invoiceInterval
    }
    regions{
      id
     regionName
    }
    qualifications{
      id
      attributeName
    }
}`;

export const GET_CAREGIVERS = gql`
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
        isActive
        createdAt
        qualifications {
          id
          attributeName
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
          postalCode
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
        }
      }
      totalCount
    }
  }
`;

export const GET_CAREGIVER_BY_ID = gql`
  query getCaregiver($id: Int!) {
    getCaregiver(id: $id) {
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
      caregiver {
        address1
        address2
        age
        fax
        workZones
        mobileNumber
        countryId
        stateId
        postalCode
        employed
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
        bankName
        legalForm
        nightAllowance
        weekendAllowance
        executiveDirector
        phoneNumber
        fee
        holiday
        invoiceInterval
      }
      qualifications {
        id
        attributeName
      }
    }
  }
`;

export const ADD_CAREGIVER = gql`
  mutation addCareGiver($careGiverInput: CareGiverInput!) {
    addCareGiver(careGiverInput: $careGiverInput) {
      id
    }
  }
`;

export const UPDATE_CAREGIVER = gql`
  mutation updateCareGiver($id: Int!, $careGiverInput: CareGiverInput!) {
    updateCareGiver(id: $id, careGiverInput: $careGiverInput)
    ${CAREGIVER_PERSONAL_INFO_FIELDS}
  }
`;

export const DELETE_CAREGIVER = gql`
  mutation deleteCareGiver($id: Int!) {
    deleteCareGiver(id: $id) {
      id
    }
  }
`;

export const UPDATE_BILLING_SETTINGS = gql`
  mutation addUpdateBillingSettings(
    $userId: Int
    $billingSettingInput: BillingSettingsInput!
  ) {
    addUpdateBillingSettings(
      userId: $userId
      billingSettingInput: $billingSettingInput
    ) {
      id
      userId
      feePerHour
      nightAllowancePerHour
      weekendAllowancePerHour
      holidayAllowancePerHourFee
      nextInvoiceNumber
      statementsMaturity
      additionalText
    }
  }
`;

export const GET_BILLING_SETTINGS = gql`
  query getBillingSettings($userId: Int!) {
    getBillingSettings(userId: $userId) {
      id
      userId
      feePerHour
      nightAllowancePerHour
      weekendAllowancePerHour
      holidayAllowancePerHourFee
      nextInvoiceNumber
      additionalText
    }
  }
`;

export const UPDATE_CARE_GIVER_STATUS = gql`
  mutation changeStatusCareGiver($id: ID!, $isActive: Boolean) {
    changeStatusCareGiver(id: $id, isActive: $isActive) {
      id
      isActive
    }
  }
`;

export const ADD_UPDATE_CARE_GIVER_LEASING_INFO = gql`
  mutation addUpdateLeasingInformation(
    $userId: Int!
    $leasingInformationInput: LeasingInformationInput!
  ) {
    addUpdateLeasingInformation(
      userId: $userId
      leasingInformationInput: $leasingInformationInput
    ) {
      id
      placeOfBirth
      birthName
      nationality
      maritalStatus
      children
      factorChildAllowance
      healthInsuranceType
      healthInsuranceProvider
      socialSecurityNumber
      religion
      controlId
      taxBracket
      preOccupation
      payrollIBAN
      status
    }
  }
`;

export const GET_LEASING_INFO = gql`
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
    }
  }
`;
