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

const GET_PRESETS_LIST = gql`
  query getPresetAttribute($userRole: String) {
    getPresetAttribute(userRole: $userRole) {
      id
      name
    }
  }
`;
const GET_PRESETS_BY_ID = gql`
  query getPresetAttributeDetails($id: ID) {
    getPresetAttributeDetails(id: $id) {
      name
      userRole
      positiveAttributeIds
      negativeAttributeIds
    }
  }
`;

// GET_PRESETS_BY_ID
// query{
//   getPresetAttributeDetails(id:9) {
//     name
//     userRole
//     positiveAttributeIds
//     negativeAttributeIds
//   }
//  }
export const AttributeFilterQueries = [
  GET_CAREGIVER_ATTRIBUTES_WITH_CATEGORY,
  GET_PRESETS_LIST,
  GET_PRESETS_BY_ID
];
