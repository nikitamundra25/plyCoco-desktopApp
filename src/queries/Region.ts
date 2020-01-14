import gql from "graphql-tag";

const ADD_REGION = gql`
  mutation AddRegion($regionInput: RegionInput!) {
    addRegion(regionInput: $regionInput) {
      id
      regionName
    }
  }
`;
// const ADD_EMPLOYEE = gql`
//   mutation AddEmployee($employeeInput: EmployeeInput!) {
//     addEmployee(employeeInput: $employeeInput) {
//       userId
//     }
//   }
// `;

export const RegionQueries = [ADD_REGION];
