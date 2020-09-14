import gql from 'graphql-tag';

const GET_LEASING_CONTRACT = gql`
  query getLeasingContractPDF($userId: ID, $appointmentId: [ID]) {
    getLeasingContractPDF(userId:$userId, appointmentId:$appointmentId) {
      id
      attachment
    }
  }
`;

export const LeasingContractQueries = [
  GET_LEASING_CONTRACT,
];