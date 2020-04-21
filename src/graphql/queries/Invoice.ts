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
  ) {getAllAppointment(
    searchBy:  $searchBy
    caregiverId:  $caregiverId
    careInstitutionId: $careInstitutionId
    divisionId: $divisionId
    startDate : $startDate
    endDate: $endDate
    page: $page
    limit: $limit
  ) 
  {
    totalCount
    result{
    id
    avabilityId
    requirementId
    date
    status
    ca{
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
    }
    cr{
      userId
      division {
        id
        name
      }
      f
      s
      n
    }
    }
  }
}
`;


export const InvoiceQueries = [
  GET_INVOICE_LIST
];
