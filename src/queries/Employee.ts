import gql from 'graphql-tag';

const ADD_EMPLOYEE = gql`
  mutation AddEmployee($employeeInput: EmployeeInput!) {
    addEmployee(employeeInput: $employeeInput) {
      userId
    }
  }
`;

const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeById($employeeInput: EmployeeInput!) {
    getEmployeeById(employeeInput: $employeeInput) {
      userId
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($employeeInput: EmployeeInput!) {
    updateEmployee(employeeInput: $employeeInput) {
      userId
    }
  }
`;

export const EmployeeQueries = [
  ADD_EMPLOYEE,
  GET_EMPLOYEE_BY_ID,
  UPDATE_EMPLOYEE,
];
