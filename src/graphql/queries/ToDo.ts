import gql from 'graphql-tag';

const GET_TO_DOS = gql`
  query getToDos(
    $userId: Int
    $userType: String
    $searchBy: String
    $sortBy: String
    $priority: String
    $sortByDate: String
    $page: Int
    $limit: Int
  ) {
    getToDos(
      userId: $userId
      userType: $userType
      searchBy: $searchBy
      sortBy: $sortBy
      priority: $priority
      sortByDate: $sortByDate
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
          contact_type {
            contactType
          }
        }
      }
    }
  }
`;

export const ToDoQueries = [GET_TO_DOS];
