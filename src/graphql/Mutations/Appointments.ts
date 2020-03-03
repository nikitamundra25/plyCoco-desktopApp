import gql from 'graphql-tag';

const ADD_CAREGIVER_AVABILITY = gql`
  mutation AddCareGiverAvability(
    $careGiverAvabilityInput: [CareGiverAvabilityInput]
  ) {
    addCareGiverAvability(careGiverAvabilityInput: $careGiverAvabilityInput) {
      userId
      f
      s
      n
      status
    }
  }
`;

export const AppointmentMutations = [ADD_CAREGIVER_AVABILITY];
