import gql from 'graphql-tag';
const ADD_TO_DO = gql`
  mutation addToDo($toDoInput: ToDoInput!) {
    addToDo(toDoInput: $toDoInput) {
      id
    }
  }
`;

export const ToDoMutations = [ADD_TO_DO];
