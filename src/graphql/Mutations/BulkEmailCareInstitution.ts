import gql from 'graphql-tag';

const BULK_EMAILS_CAREINSTITUTION = gql`
  mutation bulkEmailToCantitution($bulkEmailsInput: BulkEmailsInput!) {
    bulkEmailToCantitution(bulkEmailsInput: $bulkEmailsInput) {
      id
    }
  }
`;

export const BulkEmailCareInstituion = [BULK_EMAILS_CAREINSTITUTION];
