import gql from "graphql-tag";

export const LEASING_DATA_FIELDS = `
    placeOfBirth
    birthName
    nationality
    maritalStatus
    children
    factorChildAllowance
    healthInsuranceType
    healthInsuranceProvider
    socialSecurityNumber
    religion
    controlId
    taxBracket
    preoccupation
    payrollIBAN
    status

`;

export const GET_LEASING_DATA = gql`
  query getLeasingData($userId: Int) {
    getLeasingData(userId:userId){
        ${LEASING_DATA_FIELDS}
    }
  }
`;

export const ADD_LEASING_DATA = gql`
mutation saveLeasingData ($userId:Int, $input:LeasingDataInput){
    saveLeasingData(userId:$userId, input:$input ){
        ${LEASING_DATA_FIELDS}
    }
}
`;
