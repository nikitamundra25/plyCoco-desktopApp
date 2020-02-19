import gql from 'graphql-tag';
const ADD_TO_DO = gql`
  mutation addToDo($toDoInput: ToDoInput!) {
    addToDo(toDoInput: $toDoInput) {
      id
    }
  }
`;

const UPDATE_TO_DO = gql`
  mutation updateToDo($id: Int!, $toDoInput: ToDoInput!) {
    updateToDo(id: $id, toDoInput: $toDoInput) {
      id
      userId
      date
      time
      comment
      juridiction
      priority
      createdBy
    }
  }
`;

const UPDATE_CARE_INSTITUTION_TODO_STATUS = gql`
  mutation statusUpdateToDo($id: Int!, $status: String, $priority: String) {
    statusUpdateToDo(id: $id, status: $status, priority: $priority) {
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
    }
  }
`;
export const ToDoMutations = [
  ADD_TO_DO,
  UPDATE_TO_DO,
  UPDATE_CARE_INSTITUTION_TODO_STATUS
];
