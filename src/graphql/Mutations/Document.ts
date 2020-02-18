import gql from 'graphql-tag';

// mutation AddUserDocuments($documentInput: DocumentInput!) {
//   addUserDocuments(documentInput: $documentInput) {
//     id
//     document
//     remarks
//     documentType
//     status
//     fileSize
//     fileName
//   }
// }
const ADD_DOCUMENT = gql`
  mutation AddUserDocuments($documentInput: DocumentInput) {
    addUserDocuments(documentInput: $documentInput) {
      document
      remarks
      documentType
    }
  }
`;
const UPDATE_DOCUMENT_STATUS = gql`
  mutation DocumentStatus($id: Int!, $status: String) {
    documentStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;
const UPDATE_DOCUMENT = gql`
  mutation UpdateUserDocuments($id: Int, $documentInput: DocumentInput) {
    updateUserDocuments(id: $id, documentInput: $documentInput) {
      id
      fileName
    }
  }
`;
const DELETE_DOCUMENT = gql`
  mutation DeleteDocument($id: Int!) {
    deleteDocument(id: $id) {
      id
    }
  }
`;
const APPROVE_DOCUMENT = gql`
  mutation ApprovedDocument($userId: ID, $isApproved: Boolean) {
    approvedDocument(userId: $userId, isApproved: $isApproved) {
      isApproved
    }
  }
`;

const DISAPPROVE_DOCUMENT = gql`
  mutation DisapprovedDocument($userId: ID, $isApproved: Boolean) {
    disapprovedDocument(userId: $userId, isApproved: $isApproved) {
      isApproved
    }
  }
`;
const ADD_DOCUMENT_TYPE_CAREINST = gql`
  mutation AddRequiredDocuments($id: ID!, $requiredDocuments: [ID]) {
    addRequiredDocuments(id: $id, requiredDocuments: $requiredDocuments) {
      requiredDocuments
    }
  }
`;
//add doc mutation
// mutation AddUserDocuments($documentInput: DocumentInput) {
//   addUserDocuments(documentInput: $documentInput) {
//     document
//     remarks
//     documentType
//   }
// }
export const DocumentMutations = [
  ADD_DOCUMENT,
  UPDATE_DOCUMENT_STATUS,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  APPROVE_DOCUMENT,
  DISAPPROVE_DOCUMENT,
  ADD_DOCUMENT_TYPE_CAREINST
];
