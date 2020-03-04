import gql from 'graphql-tag';
const GET_USERS_BY_QUALIFICATION_ID = gql`
  query getUserByQualifications($qualificationId: [ID], $userRole: String) {
    getUserByQualifications(
      qualificationId: $qualificationId
      userRole: $userRole
    ) {
      firstName
      lastName
      userName
      userRole
      id
      caregiver {
        nightAllowance
        weekendAllowance
        fee
        holiday
        night
      }
      caregiver_avabilities {
        f
        s
        n
        date
      }
      canstitution {
        city
        zipCode
        companyName
        shortName
        street
        countryId
        stateId
        remarks
        title
        fax
        linkedTo
        doctorCommission
        leasingPriceListId
        isArchive
        careGiverCommission
        anonymousName
        anonymousName2
        mobileNumber
        remarksViewable
        defaultQualification
        invoiceType
        emailInvoice
        addressInvoice
        interval
        website
        attributes
      }
      qualifications {
        id
        name
      }
    }
  }
`;

export const AppointmentsQueries = [GET_USERS_BY_QUALIFICATION_ID];
