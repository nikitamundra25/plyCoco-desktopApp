import gql from 'graphql-tag';

const GET_EMPLOYEE_BY_ID_SUBSCRIPTION = gql`
  subscription employeeUpdateSubscribe($id: String) {
    employeeUpdateSubscribe(id: $id) {
      id
      firstName
      lastName
      userName
      email
      accessLevel
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


export const EmployeeSubscription = [
    GET_EMPLOYEE_BY_ID_SUBSCRIPTION
  ];
  