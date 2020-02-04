import gql from 'graphql-tag';

const ADD_DOCUMENT = gql`
  mutation AddUserDocuments($documentInput: DocumentInput!) {
    addUserDocuments(documentInput: $documentInput) {
      document
      remarks
      documentType
    }
  }
`;

export const DocumentMutations = [ADD_DOCUMENT];

// mutation{
//     addUserDocuments(documentInput:{
//      userId: 789
//      documentPath: ""
//      documentType: "s"
//      remarks: "Remarks"
//     }){
//      documentPath,
//      remarks,
//      documentType
//     }
//     }
