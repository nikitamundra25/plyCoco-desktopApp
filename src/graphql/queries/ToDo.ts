import gql from "graphql-tag";

const GET_TO_DOS = gql`
  query getToDos(
    $userId: Int
    $userType: String
    $searchBy: String
    $sortBy: String
    $priority: String
    $futureOnly: Boolean
    $page: Int
    $limit: Int
  ) {
    getToDos(
      userId: $userId
      userType: $userType
      searchBy: $searchBy
      sortBy: $sortBy
      priority: $priority
      futureOnly: $futureOnly
      page: $page
      limit: $limit
    ) {
      totalCount
      result {
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
        user {
          firstName
          lastName
        }
        contact {
          firstName
          surName
          id
          contactType
        }
      }
    }
  }
`;

export const ToDoQueries = [GET_TO_DOS];
