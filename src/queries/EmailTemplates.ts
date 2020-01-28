import gql from 'graphql-tag';

const ADD_EMAIL_TEMPLATE = gql`
  mutation AddEmail($emailTemplateInput: EmailTemplateInput!) {
    addEmail(emailTemplateInput: $emailTemplateInput) {
      type
    }
  }
`;
const UPDATE_EMAIL_TEMPLATE = gql`
  mutation UpdateEmailTemplate(
    $id: Int!
    $emailTemplateInput: EmailTemplateInput!
  ) {
    updateEmailTemplate(id: $id, emailTemplateInput: $emailTemplateInput) {
      type
    }
  }
`;
export const EmailTemplateQueries = [ADD_EMAIL_TEMPLATE, UPDATE_EMAIL_TEMPLATE];
