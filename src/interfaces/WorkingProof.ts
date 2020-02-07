export interface IWorkingProofFormValues {
  document: File | null;
}

export interface IWorkingProofValidationSchema {
  document: File | null;
}

export interface IDocumentInterface {
  id: any;
  document: string;
  fileName: string;
  createdAt?: Date;
}

export interface IDocumentInputInterface {
  isDocumentTemplate: boolean;
  document: File | null;
}

export interface IDocumentPreviewInterface {
  documentUrls: string;
  imageUrls: string;
}
