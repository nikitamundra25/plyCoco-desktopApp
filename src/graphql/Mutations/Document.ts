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
const UPDATE_DOCUMENT_STATUS = gql`
  mutation DocumentStatus($id: Int!, $status: String) {
    documentStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;
// documentStatus(id:Int!, status: String): Document
// mutation{
//  documentStatus(id:5, status: "decline"){
//    id
//  }
// }

const UPDATE_DOCUMENT = gql`
  mutation UpdateUserDocuments($documentInput: DocumentInput!) {
    updateUserDocuments(documentInput: $documentInput) {
      id
      fileName
      status
    }
  }
`;

// mutation{
//   updateUserDocuments(id:46, documentInput: {
//     fileName: "output-onlinepngtoolls.png",
//     documentType: "fdg",
//     remarks: "asd",
//     status: "approve"
//   }){
//     id,
//     fileName,
//     status
//   }
//  }

export const DocumentMutations = [
  ADD_DOCUMENT,
  UPDATE_DOCUMENT_STATUS,
  UPDATE_DOCUMENT
];
