import gql from 'graphql-tag';

const VIEW_PROFILE = gql`
  query viewAdminProfile {
    viewAdminProfile {
      id
      firstName
      lastName
      email,
      accessLevel
    }
  }
`;

export const ProfileQueries = [VIEW_PROFILE];
