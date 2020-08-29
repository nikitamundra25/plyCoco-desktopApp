import gql from 'graphql-tag';

const GET_CAREINSTITUDE_SUBSCRIPTION = gql `
subscription careInstitudeUpdateSubscribe($id: String){
    careInstitudeUpdateSubscribe(id: $id){
      totalCount
      careInstitutionData {
        id
        firstName
        lastName
        email
        userName
        gender
        salutation
        qualifications {
          id
          name
          parentId
        }
        regions {
          id
          regionName
        }
        phoneNumber
        isActive
        createdAt
        canstitution {
          salutation
          firstName
          lastName
          email
          password
          mobileNumber
          userRole
          qualificationId
          city 
          zipCode 
          street
          countryId 
          stateId 
          fax 
          shortName 
          regionId
          remarks
          remarksViewable
          defaultQualification
          companyName
          linkedTo
          title
          anonymousName
          anonymousName2
          careGiverCommission
          doctorCommission
          leasingPriceList
          leasingPriceListId
          isArchive
          website
          invoiceType
          emailInvoice
          addressInvoice
          interval
          attributes
        }
      }
    }
  }
  `;
  const GET_CONTACT_LIST_BY_ID_SUBSCRIPTION = gql`
  subscription getContactsByUserIDSubscribe($id: String) {
    getContactsByUserIDSubscribe(id: $id) {
      id
      userId
      gender
      title
      salutation
      firstName
      surName
      street
      city
      zip
      countryId
      stateId
      phoneNumber
      phoneNumber2
      fax
      mobileNumber
      email
      remark
      attributes
      isActive
      isDeleted
      createdBy
      updatedBy
      contactTypeId
    }
  }
`;

  export const CareInstitudeSubscription = [ GET_CAREINSTITUDE_SUBSCRIPTION, GET_CONTACT_LIST_BY_ID_SUBSCRIPTION ]
  