import { IReactSelectInterface } from './Constant';
import { ActionMeta, ValueType } from 'react-select';
import { FormEvent } from 'react';
import { EditorState } from 'draft-js';
import {
  IEmailAttachmentData,
  IEmailInputAttachmenttypes
} from './EmailTemplate';

export interface IEmailEditorComponentProps {
  templateOptions: any[] | undefined;
  subject: string;
  body: any;
  template: any;
  attachments: IEmailAttachmentData[];
  isSubmit: boolean;
  onTemplateSelection: (
    value: ValueType<FormEvent<HTMLFormElement>>,
    actionMeta: ActionMeta
  ) => void;
  onEditorStateChange: (editorState: EditorState) => void;
  handleChangeSubject: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelteDocument: (
    attachmentId: string,
    attachmentIndex?: number | undefined
  ) => Promise<void>;
  uploadDocument: (data: IEmailAttachmentData) => void;
}

export interface ICareGiverListComponentProps {
  careGivers: any;
  called: boolean;
  loading: boolean;
  careGiverData: Object[] | any;
  selectedCareGiver: number[];
  handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckElement: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => Promise<void>;
  handleInfiniteScroll: () => void;
}

export interface IBulkEmailVariables {
  caregiver: any;
  senderUserId?: number | null;
  to: string;
  from: string;
  subject: string;
  body: string;
  parentId: number | null;
  status: string;
  files: any /* IEmailInputAttachmenttypes[] */;
  attachments: IEmailInputAttachmenttypes[];
  type?: string;
}
