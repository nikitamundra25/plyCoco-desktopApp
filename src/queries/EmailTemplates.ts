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

const GET_EMAIL_TEMPLATE_TYEPS = gql`
  query GetEmailtemplateTypes {
    getEmailtemplateTypes {
      id
      type
    }
  }
`;
const GET_EMAIL_TEMPLATE = gql`
  query GetEmailTemplate($type: String, $sortBy: Int, $limit: Int, $page: Int) {
    getEmailtemplate(type: $type, sortBy: $sortBy, limit: $limit, page: $page) {
      id
      type
      menuEntry
    }
  }
`;
const GET_EMAIL_TEMPLATE_BY_ID = gql`
  query ViewEmailTemplate($id: ID) {
    viewEmailTemplate(id: $id) {
      type
      menuEntry
      subject
      body
    }
  }
`;
// const ADD_EMAIL_TEMPLATE_TYPE = gql`
//   mutation AddEmailType($emailTemplateInput: EmailTemplateInput!) {
//     addEmailType(emailTemplateInput: $emailTemplateInput) {
//       type
//       menuEntry
//       subject
//       body
//     }
//   }
// `;

export const EmailTemplateQueries = [
  ADD_EMAIL_TEMPLATE,
  UPDATE_EMAIL_TEMPLATE,
  GET_EMAIL_TEMPLATE_TYEPS,
  GET_EMAIL_TEMPLATE,
  GET_EMAIL_TEMPLATE_BY_ID
  // ADD_EMAIL_TEMPLATE_TYPE
];
