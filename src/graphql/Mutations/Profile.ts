import gql from "graphql-tag";

const UPDATE_ADMIN_PROFILE = gql`
  mutation UpdateAdminProfile($userInput: UserInput!) {
    updateAdminProfile(userInput: $userInput) {
      firstName
      lastName
      email
      id
    }
  }
`;

const CHANGE_PASSWORD = gql`
  mutation ChangePassword($oldPassword: String, $password: String) {
    changePassword(oldPassword: $oldPassword, password: $password) {
      firstName
      lastName
      email
    }
  }
`;

const GENERATE_NEW_PASSWORD = gql`
  mutation GenerateNewPassword($userId: ID!) {
    generateNewPassword(userId: $userId) {
      id
    }
  }
`;

export const AdminProfileMutations = [
  UPDATE_ADMIN_PROFILE,
  CHANGE_PASSWORD,
  GENERATE_NEW_PASSWORD
];
