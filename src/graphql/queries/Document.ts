import gql from 'graphql-tag';

const GET_DOCUMENT_LIST = gql`
  query GetDocuments($userId: Int!) {
    getDocuments(userId: $userId) {
      id
      document
      remarks
      documentType
      fileSize
      fileName
      status
      createdAt
    }
  }
`;
export const DocumentQueries = [GET_DOCUMENT_LIST];
