import gql from "graphql-tag";

export const GET_QUALIFICATION_ATTRIBUTE = gql`
  query getQualificationAttribute {
    getQualificationAttributes {
      attributeName
      id
    }
  }
`;
