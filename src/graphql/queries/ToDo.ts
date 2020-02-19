import gql from 'graphql-tag';

const GET_CARE_INSTITUTION_TODO_LIST = gql`
  query getToDos(
    $userType: String
    $searchBy: String
    $sortBy: String
    $priority: String
    $futureOnly: Boolean
  ) {
    getToDos(
      userType: $userType
      searchBy: $searchBy
      sortBy: $sortBy
      priority: $priority
      futureOnly: $futureOnly
    ) {
      id
      userId
      date
      time
      comment
      juridiction
      priority
      status
      createdBy
      userType
      contactId
      user {
        firstName
        lastName
      }
      contact {
        firstName
        surName
      }
    }
  }
`;
export const ToDoQueries = [GET_CARE_INSTITUTION_TODO_LIST];
