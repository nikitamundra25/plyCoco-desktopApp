import gql from "graphql-tag";

const UPDATE_LEASING_CONTRACT_STATUS = gql`
  mutation UpdateLeasingContractStatus($appointmentId: [ID], $availablityId: [ID],$status: String) {
    updateLeasingContractStatus(appointmentId: $appointmentId, availablityId: $availablityId, status: $status) {
      appointmentId
      status
    }
  }
`;


const GENERATE_LEASING_CONTRACT_LINK_TOKEN = gql`
  mutation GenerateLeasingContractLinkToken($userId: ID, $appointmentId: [ID],$availabilityId: [ID], $status:String,$pdfAppointmentDetails:JSON){
    generateLeasingContractLinkToken(userId: $userId, appointmentId:$appointmentId, availabilityId:$availabilityId, status:$status,pdfAppointmentDetails:$pdfAppointmentDetails){
      token
    }
  }
`;

export const LeasingContractMutations = [
  UPDATE_LEASING_CONTRACT_STATUS,
  GENERATE_LEASING_CONTRACT_LINK_TOKEN
];
