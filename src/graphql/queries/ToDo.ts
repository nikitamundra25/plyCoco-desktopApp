import gql from 'graphql-tag';

const GET_CARE_INSTITUTION_TODO_LIST = gql`
  query getToDos(
    $userType: String
    $searchBy: String
    $sortBy: String
    $priority: String
    $futureOnly: Boolean
    $skip: Int
    $limit: Int
    $page: Int
  ) {
    getToDos(
      userType: $userType
      searchBy: $searchBy
      sortBy: $sortBy
      priority: $priority
      futureOnly: $futureOnly
      skip: $skip
      limit: $limit
      page: $page
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
        contactId
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
export const ToDoQueries = [GET_CARE_INSTITUTION_TODO_LIST];
