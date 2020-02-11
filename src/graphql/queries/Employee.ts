import gql from 'graphql-tag';

const GET_EMPLOYEE_BY_ID = gql`
  query getEmployee($id: ID) {
    viewEmployee(id: $id) {
      id
      firstName
      lastName
      email
      userName
      phoneNumber
      isActive
      profileImage
      isActive
      profileThumbnailImage
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
      regions {
        regionName
        id
      }
      accessLevel
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
        accessLevel
        lastName
        email
        userName
        phoneNumber
        isActive
        profileImage
        profileThumbnailImage
        createdAt
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

export const EmployeeQueries = [GET_EMPLOYEE_BY_ID, GET_EMPLOYEES];
