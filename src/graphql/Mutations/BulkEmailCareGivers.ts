import gql from "graphql-tag";

const BULK_EMAILS = gql`
  mutation bulkEmails($bulkEmailsInput: BulkEmailsInput!) {
    bulkEmails(bulkEmailsInput: $bulkEmailsInput) {
      id
    }
  }
`;

export const BulkEmailCareGivers = [BULK_EMAILS];
