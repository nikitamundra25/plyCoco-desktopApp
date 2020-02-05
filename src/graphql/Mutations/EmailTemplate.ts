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
      menuEntry
      subject
      body
      id
      email_template_type {
        type
      }
    }
  }
`;

const DELETE_EMAIL_TEMPLATE = gql`
  mutation deleteEmailTemplate($id: Int) {
    deleteEmailTemplate(id: $id) {
      id
    }
  }
`;

export const EmailTemplateMutations = [
  ADD_EMAIL_TEMPLATE,
  UPDATE_EMAIL_TEMPLATE,
  DELETE_EMAIL_TEMPLATE,
];
