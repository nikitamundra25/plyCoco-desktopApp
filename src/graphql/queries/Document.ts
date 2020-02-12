import gql from 'graphql-tag';

const GET_DOCUMENT_LIST = gql`
  query getDocumentTemplates($isDocumentTemplate: Boolean!) {
    getDocumentTemplates(isDocumentTemplate: $isDocumentTemplate) {
      id
      document
      fileName
      fileSize
      createdAt
    }
  }
`;

const GET_DOCUMENTS = gql`
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
export const DocumentQueries = [GET_DOCUMENT_LIST, GET_DOCUMENTS];
