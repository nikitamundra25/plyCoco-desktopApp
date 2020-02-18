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

const GET_DOCUMENT_TYPES = gql`
  query {
    getDocumentType {
      id
      type
    }
  }
`;
const GET_ADDED_DOCUMENT_TYPES = gql`
  query GetRequiredDocuments($userId: ID!) {
    getRequiredDocuments(userId: $userId) {
      document_types {
        id
        type
      }
    }
  }
`;
// query{
//   getRequiredDocuments(userId:1017){
//     document_types{
//       id
//       type
//     }
//   }
//  }
export const DocumentQueries = [
  GET_DOCUMENT_LIST,
  GET_DOCUMENTS,
  GET_DOCUMENT_TYPES,
  GET_ADDED_DOCUMENT_TYPES
];
