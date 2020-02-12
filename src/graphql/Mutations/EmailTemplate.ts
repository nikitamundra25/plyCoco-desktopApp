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
      attachments
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

const DELETE_EMAIL_TEMPLATE_ATTACHMENT = gql`
  mutation deleteEmailAttachment($id: Int, $attachmentId: String) {
    deleteEmailAttachment(id: $id, attachmentId: $attachmentId) {
      id
      attachmentId
    }
  }
`;

const RESTORE_ARCHIVED_EMAIL = gql`
  mutation RestoreTrashEmailTemplate($id: Int!) {
    restoreTrashEmailTemplate(id: $id) {
      id
      menuEntry
    }
  }
`;

const PERMANENT_DELETE_EMAIL_TEMPLATE = gql`
  mutation ParmanentDeleteEmail($id: ID!) {
    parmanentDeleteEmail(id: $id) {
      id
    }
  }
`;

export const EmailTemplateMutations = [
  ADD_EMAIL_TEMPLATE,
  UPDATE_EMAIL_TEMPLATE,
  DELETE_EMAIL_TEMPLATE,
  DELETE_EMAIL_TEMPLATE_ATTACHMENT,
  RESTORE_ARCHIVED_EMAIL,
  PERMANENT_DELETE_EMAIL_TEMPLATE
];
