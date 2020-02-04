import gql from 'graphql-tag';

const ADD_DOCUMENT = gql`
  mutation AddUserDocuments($documentInput: DocumentInput!) {
    addUserDocuments(documentInput: $documentInput) {
      document
      remarks
      documentType
      status
    }
  }
`;

export const DocumentMutations = [ADD_DOCUMENT];

