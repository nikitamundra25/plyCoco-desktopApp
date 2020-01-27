import gql from 'graphql-tag';

const ADD_EMAIL_TEMPLATE = gql`
  mutation AddEmail($emailTemplateInput: EmailTemplateInput!) {
    addEmail(emailTemplateInput: $emailTemplateInput) {
      type
    }
  }
`;

export const EmailTemplateQueries = [ADD_EMAIL_TEMPLATE];
