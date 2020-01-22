import gql from "graphql-tag";

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
    caregiverDetails{
		  id
      userId
      mobileNumber
      userName
      address1
      address2
      postalCode
      legalForm
      city
      street
      fax
      countryId
      stateId
      qualifications
      taxNumber
      remarks
      driversLicense
      driverLicenseNumber
      vehicleAvailable
      socialSecurityContribution
      workZones
      status
      gender
      companyName
      registrationNumber
      registerCourt
      executiveDirector
      bankName
      IBAN
      BIC
      feePerHour
      nightAllowancePerHour
      weekendAllowancePerHour
      holidayAllowancePerHourFee
      nextInvoiceNumber
      statementsMaturity
      additionalText
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
        regionId
        isActive
        createdAt
        caregiver {
          qualifications
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
query getCaregiver($id:Int!){
  getCaregiver(id:$id)
  ${CAREGIVER_PERSONAL_INFO_FIELDS}
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
  mutation updateCaregiver($id: Int!, $careGiverInput: CareGiverInput!) {
    updateCaregiver(id: $id, careGiverInput: $careGiverInput)
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
