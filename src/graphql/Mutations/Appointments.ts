import gql from 'graphql-tag';

const ADD_CAREGIVER_AVABILITY = gql`
  mutation AddCareGiverAvability(
    $careGiverAvabilityInput: [CareGiverAvabilityInput]
  ) {
    addCareGiverAvability(careGiverAvabilityInput: $careGiverAvabilityInput) {
      userId
      id
      f
      s
      n
      status
    }
  }
`;

const ADD_INSTITUTION_REQUIREMENT = gql`
  mutation AddCareInstitutionRequirement(
    $careInstitutionRequirementInput: CareInstitutionRequirementInput
  ) {
    addCareInstitutionRequirement(
      careInstitutionRequirementInput: $careInstitutionRequirementInput
    ) {
      id
      userId
      name
      date
      startTime
      endTime
      divisionId
      address
      contactPerson
      departmentBookingRemarks
      departmentRemarks
      isWorkingProof
      offerRemarks
      bookingRemarks
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
      userId
      id
      f
      s
      n
      status
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
      userId
      id
      f
      s
      n
      status
    }
  }
`;

const DELETE_CAREGIVER_AVABILITY = gql`
  mutation deleteCareGiver($id: Int!) {
    deleteCareGiver(id: $id) {
      id
    }
  }
`;

const DELETE_CAREINSTITUTION_REQUIREMENT = gql`
  mutation DeleteCareInstitutionRequirement($id: Int!) {
    deleteCareInstitutionRequirement(id: $id) {
      id
    }
  }
`;

export const AppointmentMutations = [
  ADD_CAREGIVER_AVABILITY,
  ADD_INSTITUTION_REQUIREMENT,
  UPDATE_CAREGIVER_AVABILITY,
  UPDATE_INSTITUTION_REQUIREMENT,
  DELETE_CAREINSTITUTION_REQUIREMENT
];
