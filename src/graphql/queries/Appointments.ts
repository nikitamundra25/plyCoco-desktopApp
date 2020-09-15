import gql from "graphql-tag";
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
    $lable: String
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
      lable: $lable
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
          workingHoursFrom
          workingHoursTo
          breakFrom
          breakTo
          nightAllowance
          workingProofRecieved
          distanceInKM
          feePerKM
          otherExpenses
          remarksCareGiver
          remarksInternal
          createdBy
          createdAt
          updatedAt
          appointments {
            id
            date
            requirementId
            avabilityId
            createdBy
            cr {
              id
              name
              status
              qualificationId
              qualificationForCharge
              address
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
          qualificationForCharge
          qualificationId
          startTime
          userId
          isLeasing
          createdBy
          createdAt
          updatedAt
          division {
            id
            name
          }
          appointments {
            id
            date
            requirementId
            avabilityId
            createdBy
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
        qualificationId
        attributes {
          id
          name
        }
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
        workingHoursFrom
        workingHoursTo
        breakFrom
        breakTo
        createdBy
        createdAt
        updatedAt
        user {
          firstName
          lastName
          userName
          email
          userRole
          id
          isActive
          qualificationId
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
        }
        appointments {
          id
          date
          requirementId
          avabilityId
          workProofId
          cr {
            id
            name
            status
            qualificationId
            qualificationForCharge
            address
            startTime
            endTime
            isLeasing
            user {
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
            }

            division {
              id
              name
            }
          }
        }
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
        qualificationForCharge
        startTime
        userId
        status
        createdBy
        createdAt
        updatedAt
        isLeasing
        f
        s
        n
        division {
          id
          name
        }
        user {
          firstName
          lastName
          userName
          email
          userRole
          id
          isActive
          qualificationId
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
        }
        appointments {
          id
          date
          requirementId
          avabilityId
          workProofId
          ca {
            userId
            id
            name
          }
        }
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
      createdBy
      createdAt
      updatedAt
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

const GET_APPOINTMENT_DETAILS_BY_USERID = gql`
  query getAppointmentDetailsByUserId($userId: ID) {
    getAppointmentDetailsByUserId(userId: $userId) {
      id
      date
      ca {
        id
      }
      cr {
        id
        name
        division {
          name
          qualifications
        }
      }
    }
  }
`;

const GET_APPOINTMENT_DETAILS_BY_ID = gql`
  query getAppointmentDetailsById($id: ID) {
    getAppointmentDetailsById(id: $id) {
      id
      avabilityId
      requirementId
      status
      date
      ca {
        id
      }
      cr {
        id
        name
        division {
          name
          qualifications
        }
      }
    }
  }
`;
const GET_CONTRACT_BY_APPOINTMENT_ID = gql`
  query getContractByAppointmentID($appointmentId: ID) {
    getContractByAppointmentID(appointmentId: $appointmentId) {
      id
      attachment
      appointmentId
    }
  }
`;
export const AppointmentsQueries = [
  GET_USERS_BY_QUALIFICATION_ID,
  GET_CAREGIVER_AVABILITY_LASTTIME_BY_ID,
  GET_CAREINSTITUTION_REQUIREMENT_BY_ID,
  GET_CAREGIVER_AVABILITY_DETAILS_BY_ID,
  GET_REQUIRMENT_FOR_CAREGIVER_QUALIFICATION,
  GET_APPOINTMENT_DETAILS_BY_USERID,
  GET_APPOINTMENT_DETAILS_BY_ID,
  GET_CONTRACT_BY_APPOINTMENT_ID,
];
