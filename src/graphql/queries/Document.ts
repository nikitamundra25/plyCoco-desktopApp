import gql from 'graphql-tag';

const GET_DOCUMENT_LIST = gql`
  query getDocumentTemplates($isDocumentTemplate: Boolean!) {
    getDocumentTemplates(isDocumentTemplate: $isDocumentTemplate) {
      id
      document
      fileName
      createdAt
    }
  }
`;
export const DocumentQueries = [GET_DOCUMENT_LIST];
