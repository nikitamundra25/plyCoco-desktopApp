import gql from "graphql-tag";

const GET_DOCUMENT_TEMPLATE = gql`
  query getDocumentTemplates(
    $documentUploadType: String
    $isDocumentTemplate: Boolean!
  ) {
    getDocumentTemplates(
      documentUploadType: $documentUploadType
      isDocumentTemplate: $isDocumentTemplate
    ) {
      id
      document
      fileName
      fileSize
      createdAt
    }
  }
`;

const GET_DOCUMENTS = gql`
  query GetDocuments($userId: Int!, $userRole: String) {
    getDocuments(userId: $userId, userRole: $userRole) {
      id
      document
      remarks
      documentType
      fileSize
      fileName
      status
      createdAt
      isDefault
      document_type {
        id
        type
      }
    }
  }
`;
const GET_DOCUMENT_TYPES = gql`
  query getDocumentType($userRole: String) {
    getDocumentType(userRole: $userRole) {
      id
      type
    }
  }
`;
const GET_REQUIRED_DOCUMENT_TYPES = gql`
  query GetRequiredDocuments($userId: ID!) {
    getRequiredDocuments(userId: $userId) {
      document_types {
        id
        type
      }
    }
  }
`;


const GET_WORKPROOF_PDF = gql`
  query getWorkProofPDF($id:ID, $documentUploadType: String) {
    getWorkProofPDF(id:$id, documentUploadType: $documentUploadType) {
      id
      document
    }
  }
`;

export const DocumentQueries = [
  GET_DOCUMENT_TEMPLATE,
  GET_DOCUMENTS,
  GET_DOCUMENT_TYPES,
  GET_REQUIRED_DOCUMENT_TYPES,

  GET_WORKPROOF_PDF
];
