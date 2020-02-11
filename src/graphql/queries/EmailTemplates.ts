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
      email_templates {
        id
        emailTemplateTypeId
        menuEntry
      }
    }
  }
`;

const GET_EMAIL_TEMPLATE_BY_ID = gql`
  query ViewEmailTemplate($id: ID) {
    viewEmailTemplate(id: $id) {
      email_template_type {
        type
      }
      menuEntry
      subject
      body
      id
      attachments
    }
  }
`;

const GET_CAREGIVER_EMAIL_TEMPLATES = gql`
  query GetEmailTemplate($type: String, $sortBy: Int, $limit: Int, $page: Int) {
    getEmailtemplate(type: $type, sortBy: $sortBy, limit: $limit, page: $page) {
      email_templates {
        id
        menuEntry
        subject
        body
        attachments
      }
    }
  }
`;

export const EmailTemplateQueries = [
  GET_EMAIL_TEMPLATE_TYEPS,
  GET_EMAIL_TEMPLATE,
  GET_EMAIL_TEMPLATE_BY_ID,
  GET_CAREGIVER_EMAIL_TEMPLATES,
];
