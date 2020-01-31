import gql from 'graphql-tag';

const GET_ATTRIBUTES_TYPE = gql`
  query {
    getAtrributeHeading {
      name
    }
  }
`;

export const AttributeQueries = [GET_ATTRIBUTES_TYPE];
