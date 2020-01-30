import gql from 'graphql-tag';

const UPDATE_ADMIN_PROFILE = gql`
  mutation UpdateAdminProfile($userInput: UserInput!) {
    updateAdminProfile(userInput: $userInput) {
      firstName
      lastName
      email
    }
  }
`;

const CHANGE_PASSWORD = gql`
  mutation AdminChangePassword($oldPassword: String, $password: String) {
    adminChangePassword(oldPassword: $oldPassword, password: $password) {
      firstName
      lastName
      email
    }
  }
`;

export const AdminProfileMutations = [UPDATE_ADMIN_PROFILE, CHANGE_PASSWORD];
