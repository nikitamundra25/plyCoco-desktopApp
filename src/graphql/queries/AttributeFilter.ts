import gql from 'graphql-tag';

const GET_CAREGIVER_ATTRIBUTES_WITH_CATEGORY = gql`
  query GetCaregiverAtrributeWithCategory($userRole: String) {
    getCaregiverAtrributeWithCategory(userRole: $userRole) {
      id
      name
      parentId
      attribute_managements {
        id
        name
      }
    }
  }
`;
// query{
//   getCaregiverAtrributeWithCategory{
//     id
//     name
//     parentId
//     attribute_managements{
//       id
//       name
//     }
//   }
//  }
const GET_ATTRIBUTES_BY_TYPE = gql`
  query getAttributesName($id: Int, $sortBy: Int) {
    getAttributesName(id: $id, sortBy: $sortBy) {
      name
    }
  }
`;

export const AttributeFilterQueries = [GET_CAREGIVER_ATTRIBUTES_WITH_CATEGORY];
