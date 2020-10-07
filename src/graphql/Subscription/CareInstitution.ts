import gql from 'graphql-tag';

const GET_CAREINSTITUDE_SUBSCRIPTION = gql`
  subscription careInstitudeUpdateSubscribe($id: String) {
    careInstitudeUpdateSubscribe(id: $id) {
      createdAt
      firstName
      lastName
      salutation
      email
      userName
      phoneNumber
      id
      userRole
      gender
      isApproved
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
        plycocoInvoiceTax
        leasingInvoiceTax
        defaultTaxValue
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
      regions {
        id
        regionName
      }
      attributes {
        id
        name
      }
      contacts {
        salutation
        firstName
        surName
        userId
        contactTypeId
        email
        id
        contact_type {
          contactType
        }
      }
      contact {
        salutation
        firstName
        surName
        gender
        title
        salutation
        firstName
        userId
        surName
        countryId
        stateId
        street
        city
        contactTypeId
        phoneNumber
        zip
        phoneNumber2
        fax
        mobileNumber
        email
        remark
        id
        attributes
        attribute_management {
          id
          name
          color
        }
        contact_type {
          contactType
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

export const CareInstitudeSubscription = [
  GET_CAREINSTITUDE_SUBSCRIPTION,
  GET_CONTACT_LIST_BY_ID_SUBSCRIPTION,
];
