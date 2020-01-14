import gql from 'graphql-tag';

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
        countryId
        stateId
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

const UPDATE_EMPLOYEE_STATUS = gql`
  mutation UpdateEmployeeStatus($id: ID!, $isActive: Boolean) {
    updateEmployeeStatus(id: $id, isActive: $isActive) {
      userId
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      userId
    }
  }
`;

export const EmployeeQueries = [
  ADD_EMPLOYEE,
  GET_EMPLOYEE_BY_ID,
  GET_EMPLOYEES,
  UPDATE_EMPLOYEE,
  UPDATE_EMPLOYEE_STATUS,
  DELETE_EMPLOYEE,
];
