import gql from 'graphql-tag';

export const ADD_DOCUMENT = gql`
  mutation addUserDocuments($documentInput: DocumentInput!) {
    addUserDocuments(documentInput: $documentInput) {
      document,
      status,
      remarks,
      documentType
    }
  }
`;


export const DocumentUploadMutations = [
  ADD_DOCUMENT
];