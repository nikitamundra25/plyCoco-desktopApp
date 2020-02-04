export interface IDocumentSubmitValues {
  userId: number | null;
  document: string;
  documentType: string;
  remarks: string;
}
export interface IDocumentUrls {
  url: string | ArrayBuffer | null;
  name: string;
  date: string;
}
export interface IDocumentUploadModal {
  show: boolean;
  handleClose: () => void;
  handleSaveDocument: () => void;
  onDrop: () => void;
  documentUrls: IDocumentUrls;
}
export interface IDocumentList {
  setShowDocumentPopup: () => void;
}
