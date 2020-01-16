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
      profileImage
      employee {
        address1
        address2
        country
        state
        city
        zipCode
        joiningDate
      }
      region {
        regionName
        id
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
      id
      firstName
      lastName
    }
  }
`;

const GET_EMPLOYEES = gql`
  query GetEmployees(
    $searchBy: String
    $sortBy: Int
    $limit: Int
    $page: Int
    $isActive: String
  ) {
    getEmployees(
      searchBy: $searchBy
      sortBy: $sortBy
      limit: $limit
      page: $page
      isActive: $isActive
    ) {
      totalCount
      employeeData {
        id
        firstName
        lastName
        email
        userName
        phoneNumber
        isActive
        profileImage
        profileThumbnailImage
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
        region {
          regionName
          id
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
  }
`;

const UPDATE_EMPLOYEE_STATUS = gql`
  mutation ActiveStatusEmployee($id: ID!, $isActive: Boolean) {
    activeStatusEmployee(id: $id, isActive: $isActive) {
      id
      isActive
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      firstName
    }
  }
`;

export const EmployeeQueries = [
  ADD_EMPLOYEE,
  GET_EMPLOYEE_BY_ID,
  GET_EMPLOYEES,
  UPDATE_EMPLOYEE,
  UPDATE_EMPLOYEE_STATUS,
  DELETE_EMPLOYEE
];
