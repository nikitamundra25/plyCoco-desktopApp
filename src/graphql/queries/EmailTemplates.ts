import gql from 'graphql-tag';

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

export const EmailTemplateQueries = [
  GET_EMAIL_TEMPLATE_TYEPS,
  GET_EMAIL_TEMPLATE,
  GET_EMAIL_TEMPLATE_BY_ID,
];
