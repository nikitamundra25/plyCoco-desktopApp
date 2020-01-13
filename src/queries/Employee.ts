import gql from "graphql-tag";

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
const GET_EMPLOYEES = gql`
  query {
    getEmployees {
      id
      firstName
      lastName
      email
      userName
      phoneNumber

      employee {
        joiningDate
        employeeCustomId
        countryId
        stateId
        city
        zipCode
        address1
        address2
        regionId
      }
      bankDetails {
        bankName
        accountHolder
        additionalText
        IBAN
        BIC
      }
    }
  }
`;
export const EmployeeQueries = [
  ADD_EMPLOYEE,
  GET_EMPLOYEE_BY_ID,
  UPDATE_EMPLOYEE,
  GET_EMPLOYEES
];
