import { IReactSelectInterface } from "./Constant";
import { ActionMeta, ValueType } from "react-select";
import { FormEvent } from "react";
import { EditorState } from "draft-js";
import { IEmailAttachmentData } from "./EmailTemplate";

export interface IEmailEditorComponentProps {
  templateOptions: any[] | undefined;
  subject: string;
  body: any;
  template: ValueType<FormEvent<HTMLFormElement>>;
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
}
