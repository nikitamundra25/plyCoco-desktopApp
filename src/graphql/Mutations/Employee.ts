import gql from 'graphql-tag';

const ADD_EMPLOYEE = gql`
  mutation AddEmployee($employeeInput: EmployeeInput!) {
    addEmployee(employeeInput: $employeeInput) {
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
      regions {
        regionName
        id
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
      userName
      email
      phoneNumber
      profileThumbnailImage
      profileImage
      employee {
        joiningDate
        employeeCustomId
        country
        state
        city
        zipCode
        address1
        address2
      }
      regions {
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
const RESTORE_EMPLOYEE = gql`
  mutation RestoreTrashUser($id: ID!) {
    restoreTrashUser(id: $id) {
      firstName
    }
  }
`;

const UPDATE_EMP_ACCESS_LEVEL = gql`
  mutation updateAccessLevelEmployee($id: ID!, $accessLevel: String) {
    updateAccessLevelEmployee(id: $id, accessLevel: $accessLevel) {
      id
      accessLevel
    }
  }
`;
const PERMANENT_DELETE_USER = gql`
  mutation parmanentDeleteUser($id: ID!) {
    parmanentDeleteUser(id: $id) {
      id
    }
  }
`;
// mutation{
//   parmanentDeleteUser(id: 961){
//     id
//   }
//  }
export const EmployeeMutations = [
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  UPDATE_EMPLOYEE_STATUS,
  DELETE_EMPLOYEE,
  RESTORE_EMPLOYEE,
  UPDATE_EMP_ACCESS_LEVEL,
  PERMANENT_DELETE_USER
];
