import gql from 'graphql-tag';

const GET_LEASING_CONTRACT = gql`
  query getLeasingContractPDF($userId: ID, $documentUploadType: String, $appointmentId: [ID]) {
    getLeasingContractPDF(userId:$userId, documentUploadType: $documentUploadType, appointmentId:$appointmentId) {
      document
      leasingContract{
				avabilityId
      }
    }
  }
`;

export const LeasingContractQueries = [
  GET_LEASING_CONTRACT,
];