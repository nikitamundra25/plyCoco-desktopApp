import { FunctionComponent } from "react";
// props for button prop component
export interface IPycButtonProps {
  loading?: boolean;
  text: string;
  color?: "primary" | "secondary" | "default" | "danger";
  onClick?: (e?: any) => void;
  type?: string;
}
// props for Modal
export interface IPycModalProps {
  isOpen: boolean;
  headerText: string;
  body?:
    | React.Component
    | JSX.Element
    | FunctionComponent
    | string
    | HTMLElement;
  handleClose?: () => void;
  footerButtons?: IPycButtonProps[];
  size?: string;
}
// props for Close button component
export interface IPycCloseBtnProps {
  handleClose?: () => void;
}
