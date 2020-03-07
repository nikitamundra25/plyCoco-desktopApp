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
export const AppointmentMutations = [
  ADD_CAREGIVER_AVABILITY,
  ADD_INSTITUTION_REQUIREMENT
];
