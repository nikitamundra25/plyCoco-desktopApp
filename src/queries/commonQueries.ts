import gql from 'graphql-tag';

export const GET_QUALIFICATION_ATTRIBUTES = gql`
query getQualificationAttributes{
    getQualificationAttributes{
    id
    attributeName
}
}
` 