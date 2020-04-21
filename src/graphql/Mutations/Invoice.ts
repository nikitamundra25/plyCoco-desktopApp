import gql from "graphql-tag";

const CREATE_INVOICE = gql`
  mutation CreateInvoice($invoiceInput: InvoiceInput) {
    createInvoice(invoiceInput: $invoiceInput) {
        invoiceNumber
    }
  }
`;


export const InvoiceMutations = [
  CREATE_INVOICE
]