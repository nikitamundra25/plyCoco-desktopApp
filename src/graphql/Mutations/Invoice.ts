import gql from 'graphql-tag';

const CREATE_INVOICE = gql`
  mutation CreateInvoice($invoiceInput: InvoiceInput) {
    createInvoice(invoiceInput: $invoiceInput) {
      invoiceNumber
    }
  }
`;
const CREATE_LEASING_INVOICE = gql`
  mutation CreateLeasingInvoice($invoiceInput: InvoiceInput) {
    createLeasingInvoice(invoiceInput: $invoiceInput) {
      invoiceNumber
    }
  }
`;
// mutation{
//   createLeasingInvoice(
//     invoiceInput:{
//       caregiverId: 152
//       careInstitutionId: 60653
//       appointmentIds: [875, 878]
//       status: "unpaid"
//       subTotal:"20"
//       amount: "20"
//       tax: "20"
//       careInstitutionName: "Gunjali9989",
//       careGiverName: "aayushi",
//       invoiceType: "leasing"
//     }
//   )
//   {
//     invoiceNumber
//   }
//   }

export const InvoiceMutations = [CREATE_INVOICE, CREATE_LEASING_INVOICE];
