import gql from "graphql-tag";

const ADD_DOCUMENT = gql`
  mutation AddUserDocuments($documentInput: DocumentInput) {
    addUserDocuments(documentInput: $documentInput) {
      id
      document
      remarks
      documentType
      status
      fileSize
      fileName
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
      requiredDocuments {
        id
        type
      }
    }
  }
`;
const DELETE_DOCUMENT_TYPE_CAREINST = gql`
  mutation DeleteRequiredDocumentType($id: ID!, $requiredDocuments: [ID]) {
    deleteRequiredDocumentType(id: $id, requiredDocuments: $requiredDocuments) {
      requiredDocuments {
        id
        type
      }
    }
  }
`;
const UPDATE_CAREINST_DOC = gql`
  mutation UpdateCanstitutionDocuments(
    $id: Int
    $documentInput: DocumentInput
  ) {
    updateCanstitutionDocuments(id: $id, documentInput: $documentInput) {
      id
      fileName
    }
  }
`;
const GET_DOCUMENTS_FROM_OUTLOOK = gql`
  mutation GetUnreadMailAttachments($documentType: String) {
    getUnreadMailAttachments(documentType: $documentType) {
      id
      document
    }
  }
`;
// updateCanstitutionDocuments(id: Int, documentInput : DocumentInput): Document
export const DocumentMutations = [
  ADD_DOCUMENT,
  UPDATE_DOCUMENT_STATUS,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  APPROVE_DOCUMENT,
  DISAPPROVE_DOCUMENT,
  ADD_DOCUMENT_TYPE_CAREINST,
  DELETE_DOCUMENT_TYPE_CAREINST,
  UPDATE_CAREINST_DOC,
  GET_DOCUMENTS_FROM_OUTLOOK
];
