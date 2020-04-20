import gql from 'graphql-tag';

const ADD_CAREGIVER_AVABILITY = gql`
  mutation AddCareGiverAvability(
    $careGiverAvabilityInput: [CareGiverAvabilityInput]
  ) {
    addCareGiverAvability(careGiverAvabilityInput: $careGiverAvabilityInput) {
      id
      userId
      date
      name
      fee
      weekendAllowance
      holidayAllowance
      nightFee
      nightAllowance
      workingProofRecieved
      distanceInKM
      feePerKM
      travelAllowance
      otherExpenses
      remarksCareGiver
      remarksInternal
      f
      s
      n
      status
      workingHoursFrom
      workingHoursTo
      breakFrom
      breakTo
    }
  }
`;

const ADD_INSTITUTION_REQUIREMENT = gql`
  mutation AddCareInstitutionRequirement(
    $careInstitutionRequirementInput: [CareInstitutionRequirementInput]
  ) {
    addCareInstitutionRequirement(
      careInstitutionRequirementInput: $careInstitutionRequirementInput
    ) {
      id
   userId
   date
   name
   startTime
   endTime
   divisionId
   qualificationId
   address
   contactPerson
   departmentOfferRemarks
   departmentBookingRemarks
   departmentRemarks
   isWorkingProof
   offerRemarks
   bookingRemarks
   comments
   f
   s
   n
   status
   isLeasing
    }
  }
`;

const UPDATE_CAREGIVER_AVABILITY = gql`
  mutation UpdateCareGiverAvability(
    $id: ID
    $careGiverAvabilityInput: CareGiverAvabilityInput
  ) {
    updateCareGiverAvability(
      id: $id
      careGiverAvabilityInput: $careGiverAvabilityInput
    ) {
      id
      userId
      date
      name
      fee
      weekendAllowance
      holidayAllowance
      nightFee
      nightAllowance
      workingProofRecieved
      distanceInKM
      feePerKM
      travelAllowance
      otherExpenses
      remarksCareGiver
      remarksInternal
      f
      s
      n
      status
      workingHoursFrom
      workingHoursTo
      breakFrom
      breakTo
    }
  }
`;

const UPDATE_INSTITUTION_REQUIREMENT = gql`
  mutation UpdateCareInstitutionRequirement(
    $id: ID!
    $careInstitutionRequirementInput: CareInstitutionRequirementInput
  ) {
    updateCareInstitutionRequirement(
      id: $id
      careInstitutionRequirementInput: $careInstitutionRequirementInput
    ) {
      id
      userId
      date
      name
      startTime
      endTime
      divisionId
      qualificationId
      address
      contactPerson
      departmentOfferRemarks
      departmentBookingRemarks
      departmentRemarks
      isWorkingProof
      offerRemarks
      bookingRemarks
      comments
      f
      s
      n
      status
      isLeasing
    }
  }
`;

const DELETE_CAREGIVER_AVABILITY = gql`
  mutation DeleteCareGiverAvability($id: [ID]) {
    deleteCareGiverAvability(id: $id) {
      id
    }
  }
`;

const DELETE_CAREINSTITUTION_REQUIREMENT = gql`
  mutation DeleteCareInstitutionRequirement($id: [ID]!) {
    deleteCareInstitutionRequirement(id: $id) {
      id
      userId
    }
  }
`;

const LINK_REQUIREMENT = gql`
  mutation AddAppointment($appointmentInput: [AppointmentInput]) {
    addAppointment(appointmentInput: $appointmentInput) {
      id
      avabilityId
      requirementId
      status
    }
  }
`;

const UN_LINK_REQUIREMENT = gql`
  mutation DeleteAppointment($appointmentInput: [AppointmentInput]) {
    deleteAppointment(appointmentInput: $appointmentInput) {
      deleteAll
      unlinkedBy
    }
  }
`;

export const AppointmentMutations = [
  ADD_CAREGIVER_AVABILITY,
  ADD_INSTITUTION_REQUIREMENT,
  UPDATE_CAREGIVER_AVABILITY,
  UPDATE_INSTITUTION_REQUIREMENT,
  DELETE_CAREINSTITUTION_REQUIREMENT,
  DELETE_CAREGIVER_AVABILITY,
  LINK_REQUIREMENT,
  UN_LINK_REQUIREMENT,
];
