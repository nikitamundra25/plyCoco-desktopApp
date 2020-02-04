import gql from 'graphql-tag';

const ADD_CAREGIVER = gql`
  mutation addCareGiver($careGiverInput: CareGiverInput!) {
    addCareGiver(careGiverInput: $careGiverInput) {
      id
    }
  }
`;

const UPDATE_CAREGIVER = gql`
  mutation updateCareGiver(
    $id: Int!
    $careGiverInput: CareGiverInput!
    $isRemarkAdded: Boolean
  ) {
    updateCareGiver(
      id: $id
      careGiverInput: $careGiverInput
      isRemarkAdded: $isRemarkAdded
    ) {
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
      caregiver {
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
        invoiceInterval
        leasingPricingList
        night
      }
      regions {
        id
        regionName
      }
      bankDetails {
        bankName
        IBAN
      }
      qualifications {
        id
        attributeName
      }
    }
  }
`;

const DELETE_CAREGIVER = gql`
  mutation deleteCareGiver($id: Int!) {
    deleteCareGiver(id: $id) {
      id
    }
  }
`;

const UPDATE_BILLING_SETTINGS = gql`
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
const UPDATE_CARE_GIVER_STATUS = gql`
  mutation changeStatusCareGiver($id: ID!, $isActive: Boolean) {
    changeStatusCareGiver(id: $id, isActive: $isActive) {
      id
      isActive
    }
  }
`;

const ADD_UPDATE_CARE_GIVER_LEASING_INFO = gql`
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
      firstDay
      lastDay
      monthlyWorkingHrs
      weeklyWorkingHrs
    }
  }
`;

const NEW_EMAIL = gql`
  mutation addNewEmail($emailInput: EmailInput!) {
    addNewEmail(emailInput: $emailInput) {
      id
    }
  }
`;

export const CareGiverMutations = [
  ADD_CAREGIVER,
  UPDATE_CAREGIVER,
  UPDATE_CARE_GIVER_STATUS,
  DELETE_CAREGIVER,
  ADD_UPDATE_CARE_GIVER_LEASING_INFO,
  UPDATE_BILLING_SETTINGS,
  NEW_EMAIL,
];
