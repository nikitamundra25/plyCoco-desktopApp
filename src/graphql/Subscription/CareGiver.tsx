import gql from 'graphql-tag';

const GET_CAREGIVER_SUBSCRIPTION = gql `
subscription caregiverUpdateSubscribe($id: String){
    caregiverUpdateSubscribe(id: $id){
        id
        firstName
        lastName
        salutation
        userName
        email
        password
        phoneNumber
        profileImage
        profileThumbnailImage
        isActive
        phoneNumber
        createdAt
        gender
        caregiver {
          address1
          address2
          attributes
          age
          fax
          workZones
          mobileNumber
          countryId
          stateId
          zipCode
          employed
          salutation
          dateOfBirth
          gender
          comments
          companyName
          registerCourt
          remarks
          registrationNumber
          driversLicense
          driverLicenseNumber
          vehicleAvailable
          city
          street
          title
          taxNumber
          belongTo
          legalForm
          nightAllowance
          weekendAllowance
          executiveDirector
          phoneNumber
          fee
          holiday
          invoiceInterval
          leasingPricingList
          night
        }
        regions {
          id
          regionName
        }
        bankDetails {
          bankName
          IBAN
        }
        qualifications {
          id
          name
        }
    }
  }
  `;
 

  export const CareGiverSubscription = [ GET_CAREGIVER_SUBSCRIPTION ]
  