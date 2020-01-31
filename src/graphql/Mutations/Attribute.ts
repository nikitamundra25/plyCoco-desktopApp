import gql from 'graphql-tag';

const ADD_ATTRIBUTE = gql`
  mutation addAttribute($attributeInput: AttributeInput!) {
    addAttribute(attributeInput: $attributeInput) {
      id
    }
  }
`;

export const AttributeMutations = [ADD_ATTRIBUTE];
