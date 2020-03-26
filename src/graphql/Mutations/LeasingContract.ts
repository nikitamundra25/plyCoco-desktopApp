import gql from "graphql-tag";

const UPDATE_LEASING_CONTRACT_STATUS = gql`
  mutation UpdateLeasingContractStatus($appointmentId: ID, $availablityId: ID, $requirementId: ID, $status: String) {
    updateLeasingContractStatus(appointmentId: $appointmentId, availablityId: $availablityId, requirementId: $requirementId, status: $status) {
      appointmentId
      status
    }
  }
`;

export const LeasingContractMutations = [
  UPDATE_LEASING_CONTRACT_STATUS
];
