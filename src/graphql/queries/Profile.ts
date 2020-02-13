import gql from 'graphql-tag';

const VIEW_PROFILE = gql`
  query viewAdminProfile {
    viewAdminProfile {
      id
      firstName
      lastName
      email
      accessLevel
      userName
      userRole
      phoneNumber
      isActive
      profileImage
      profileThumbnailImage
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

export const ProfileQueries = [VIEW_PROFILE];
