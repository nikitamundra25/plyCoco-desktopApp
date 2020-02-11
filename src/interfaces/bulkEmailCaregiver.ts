import { IReactSelectInterface } from "./Constant";
import { ActionMeta, ValueType } from "react-select";
import { FormEvent } from "react";

export interface IEmailEditorComponentProps {
  templateOptions: any[] | undefined;
  subject: string;
  body: any;
  template: ValueType<FormEvent<HTMLFormElement>>;
  onTemplateSelection: (
    value: ValueType<FormEvent<HTMLFormElement>>,
    actionMeta: ActionMeta
  ) => void;
}
