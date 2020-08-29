import gql from 'graphql-tag';

const GET_DIVISON_SUBSCRIPTION = gql `
subscription divisonUpdateSubscribe($id: String){
    divisonUpdateSubscribe(id: $id){
        id
        userId
        name
        anonymousName
        anonymousName2
        address
        contactPerson
        phoneNumber
        faxNumber
        email
        commentsOffer
        commentsCareGiver
        commentsVisibleInternally
        locked
        times
        qualifications
        attributes
        division_attributes {
            id
            name
            color
        }
    }
  }
  `;
 

  export const CareDivisionSubscription = [ GET_DIVISON_SUBSCRIPTION ]
  