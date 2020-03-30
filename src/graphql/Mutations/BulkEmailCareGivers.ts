import gql from "graphql-tag";

const BULK_EMAILS = gql`
  mutation bulkEmails($bulkEmailsInput: BulkEmailsInput!) {
    bulkEmails(bulkEmailsInput: $bulkEmailsInput) {
      id
    }
  }
`;

const SINGLE_BUTTON_BULK_EMAILS = gql`
  mutation bulkEmailSingleButton($bulkEmailsInput: BulkEmailsInput!) {
    bulkEmailSingleButton(bulkEmailsInput: $bulkEmailsInput) {
      id
    }
  }
`;
export const BulkEmailCareGivers = [BULK_EMAILS, SINGLE_BUTTON_BULK_EMAILS];
