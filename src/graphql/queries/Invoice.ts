import gql from 'graphql-tag';

const GET_INVOICE_LIST = gql`
  query getAllAppointment(
    $searchBy: String
    $caregiverId: ID
    $careInstitutionId: ID
    $divisionId: ID
    $startDate: String
    $endDate: String
    $page: Int
    $limit: Int
    $attributeId: ID
    $isLeasing: Boolean
  ) {
    getAllAppointment(
      searchBy: $searchBy
      caregiverId: $caregiverId
      careInstitutionId: $careInstitutionId
      divisionId: $divisionId
      startDate: $startDate
      endDate: $endDate
      page: $page
      limit: $limit
      attributeId: $attributeId
      isLeasing: $isLeasing
    ) {
      totalCount
      result {
        id
        avabilityId
        requirementId
        date
        status
        ca {
          userId
          name
          fee
          nightFee
          nightAllowance
          weekendAllowance
          holidayAllowance
          workingHoursFrom
          workingHoursTo
          breakTo
          breakFrom
          f
          n
          s
          distanceInKM
          feePerKM
          otherExpenses
          user {
            id
            caregiver {
              attributes
              leasingPricingList
              supplements
            }
          }
        }
        cr {
          userId
          divisionId
          name
          startTime
          endTime
          date
          qualificationForCharge
          qualification {
            id
            qualificationAllowance
          }
          division {
            id
            name
          }
          f
          s
          n
          user {
            id
            canstitution {
              leasingPriceListId
              plycocoInvoiceTax
              leasingInvoiceTax
              defaultTaxValue
              shortName
            }
            caregiver {
              id
            }
          }
        }
      }
    }
  }
`;

const GET_ALL_INVOICE_LIST = gql`
  query getInvoices(
    $status: String
    $invoiceType: String
    $sortBy: Int
    $limit: Int
    $page: Int
  ) {
    getInvoices(
      status: $status
      invoiceType: $invoiceType
      sortBy: $sortBy
      page: $page
      limit: $limit
    ) {
      result {
        id
        invoiceNumber
        caregiverId
        careInstitutionId
        appointmentIds
        status
        amount
        tax
        invoiceDate
        dueDate
        doubtful
        irrecoverable
        paymentMethod
        invoiceType
        subTotal
        careGiverName
        careInstitutionName
        plycocoPdf
        careGiverPdf
        caregiver {
          id
          email
        }
        careinstitution {
          id
          email
        }
      }
      totalCount
    }
  }
`;


const GET_INVOICE_BY_APPOINTMENT_ID = gql`
query getInvoiceByAppointmentId($appointmentId: [ID]) {
  getInvoiceByAppointmentId(appointmentId: $appointmentId) {
    invoiceData {
      id
      plycocoPdf
    }
    appointmentData {
      id
    }
  }
}
`;


export const InvoiceQueries = [GET_INVOICE_LIST, GET_ALL_INVOICE_LIST, GET_INVOICE_BY_APPOINTMENT_ID];
