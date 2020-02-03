import gql from 'graphql-tag';

const GET_ATTRIBUTES_TYPE = gql`
  query {
    getAtrributeCategories {
      name
      id
    }
  }
`;

const GET_ATTRIBUTES_BY_TYPE = gql`
  query getAttributesName($id: Int, $sortBy: Int) {
    getAttributesName(id: $id, sortBy: $sortBy) {
      name
    }
  }
`;

export const AttributeQueries = [GET_ATTRIBUTES_TYPE, GET_ATTRIBUTES_BY_TYPE];
