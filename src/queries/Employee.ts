import gql from "graphql-tag";

const ADD_EMPLOYEE = gql`
  mutation AddEmployee($employeeInput: EmployeeInput!) {
    addEmployee(employeeInput: $employeeInput) {
      userId
    }
  }
`;

const GET_EMPLOYEE_BY_ID = gql`
  query getEmployee($id: ID) {
    viewEmployee(id: $id) {
      firstName
      lastName
      email
      userName
      phoneNumber
      employee {
        address1
        address2
        country
        state
        city
        zipCode
        joiningDate
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

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: Int!, $employeeInput: EmployeeInput) {
    updateEmployee(id: $id, employeeInput: $employeeInput) {
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
      isActive
      employee {
        joiningDate
        employeeCustomId
        country
        state
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
  GET_EMPLOYEES,
  UPDATE_EMPLOYEE
];
