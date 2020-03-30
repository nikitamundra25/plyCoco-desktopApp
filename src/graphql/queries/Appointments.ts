import gql from 'graphql-tag';
const GET_USERS_BY_QUALIFICATION_ID = gql`
  query getUserByQualifications(
    $qualificationId: [ID]
    $userRole: String
    $page: Int
    $limit: Int
    $negativeAttributeId: [ID]
    $positiveAttributeId: [ID]
    $gte: String
    $lte: String
    $userId: [ID]
    $showAppointments: String
    $caregiverId: ID
    $careInstitutionId: ID
  ) {
    getUserByQualifications(
      qualificationId: $qualificationId
      userRole: $userRole
      page: $page
      limit: $limit
      negativeAttributeId: $negativeAttributeId
      positiveAttributeId: $positiveAttributeId
      gte: $gte
      lte: $lte
      userId: $userId
      showAppointments: $showAppointments
      caregiverId: $caregiverId
      careInstitutionId: $careInstitutionId
    ) {
      totalCount
      result {
        firstName
        lastName
        userName
        email
        userRole
        id
        isActive
        caregiver {
          nightAllowance
          weekendAllowance
          fee
          holiday
          night
          attributes
          street
          city
          dateOfBirth
        }
        caregiver_avabilities {
          id
          status
          f
          s
          n
          date
          fee
          weekendAllowance
          travelAllowance
          holidayAllowance
          nightFee
          nightAllowance
          workingProofRecieved
          distanceInKM
          feePerKM
          otherExpenses
          remarksCareGiver
          remarksInternal
          appointments {
            id
            date
            requirementId
            avabilityId
            cr {
              id
              name
              status
              qualificationId
              startTime
              endTime
              isLeasing
              division {
                id
                name
              }
            }
          }
        }
        careinstitution_requirements {
          id
          name
          f
          s
          n
          address
          status
          bookingRemarks
          comments
          contactPerson
          date
          departmentBookingRemarks
          departmentOfferRemarks
          departmentRemarks
          divisionId
          endTime
          isWorkingProof
          name
          offerRemarks
          qualificationId
          startTime
          userId
          division {
            id
            name
          }
          appointments {
            id
            date
            requirementId
            avabilityId
            ca {
              userId
              id
              name
            }
          }
        }
        contacts {
          firstName
          surName
          salutation
          mobileNumber
          email
        }
        divisions {
          id
          name
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
        qualificationId
      }
    }
  }
`;

const GET_CAREGIVER_AVABILITY_LASTTIME_BY_ID = gql`
  query getCareGiverAvabilityLastTimeById($userId: Int!) {
    getCareGiverAvabilityLastTimeById(userId: $userId) {
      id
      fee
      nightFee
      weekendAllowance
      holidayAllowance
    }
  }
`;

const GET_CAREINSTITUTION_REQUIREMENT_BY_ID = gql`
  query getRequirementAndAvabilityById($id: ID, $searchIn: String) {
    getRequirementAndAvabilityById(id: $id, searchIn: $searchIn) {
      avabilityData {
        id
        userId
        name
        f
        s
        n
        date
        fee
        nightFee
        weekendAllowance
        holidayAllowance
        nightAllowance
        distanceInKM
        feePerKM
        travelAllowance
        otherExpenses
        workingProofRecieved
        remarksCareGiver
        remarksInternal
        status
      }
      requirementData {
        id
        name
        address
        bookingRemarks
        comments
        contactPerson
        date
        divisionId
        departmentBookingRemarks
        departmentOfferRemarks
        departmentRemarks
        endTime
        isWorkingProof
        offerRemarks
        qualificationId
        startTime
        userId
        status
      }
    }
  }
`;

const GET_CAREGIVER_AVABILITY_DETAILS_BY_ID = gql`
  query getCareGiverAvabilitiesDetails($id: ID) {
    getCareGiverAvabilitiesDetails(id: $id) {
      id
      userId
      name
      f
      s
      n
      date
      fee
      nightFee
      weekendAllowance
      holidayAllowance
      nightAllowance
      distanceInKM
      feePerKM
      travelAllowance
      otherExpenses
      workingHoursFrom
      workingHoursTo
      breakFrom
      breakTo
      workingProofRecieved
      remarksCareGiver
      remarksInternal
      status
    }
  }
`;

const GET_REQUIRMENT_FOR_CAREGIVER_QUALIFICATION = gql`
  query getQualificationMatching($qualificationId: [ID]) {
    getQualificationMatching(qualificationId: $qualificationId) {
      id
      name
      address
      date
      startTime
      endTime
      divisionId
      division {
        id
        name
        address
        qualifications
      }
      status
      qualificationId
    }
  }
`;
export const AppointmentsQueries = [
  GET_USERS_BY_QUALIFICATION_ID,
  GET_CAREGIVER_AVABILITY_LASTTIME_BY_ID,
  GET_CAREINSTITUTION_REQUIREMENT_BY_ID,
  GET_CAREGIVER_AVABILITY_DETAILS_BY_ID,
  GET_REQUIRMENT_FOR_CAREGIVER_QUALIFICATION
];
