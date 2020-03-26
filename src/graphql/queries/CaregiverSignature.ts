import gql from 'graphql-tag';

const GET_CARE_GIVER_SIGNATURE = gql`
  query getCareGiverSignature($userId: ID!) {
    getCareGiverSignature(userId: $userId) {      
      userId
      careGiverSignature
    }
  }
`;

export const SignatureQueries = [
  GET_CARE_GIVER_SIGNATURE
];