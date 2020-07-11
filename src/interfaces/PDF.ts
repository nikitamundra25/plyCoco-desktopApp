export interface ILeasingContactPdfProps {
  signatureData?: any;
  pdfAppointmentDetails?: any;
}

export interface ITerminationAgreementPdfProps {
  signatureData?: any;
  pdfTerminateAppointment?: any;
}

export interface IConfirmAppointmentPdfProps {
  selectedCellsCareinstitution:any
}

export interface ITerminatePdfDetails{name:string, dateOfBirth:string, street:string, city:string, zipCode:string}