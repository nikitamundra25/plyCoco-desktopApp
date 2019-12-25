declare module '@coreui/coreui';
declare module '@coreui/react';
declare module '@coreui/coreui-plugin-chartjs-custom-tooltips';
declare module '@coreui/icons';
declare module '@flag-icon-css';
declare module '@font-awesome';
declare module '@simple-line-icons';
declare module 'js-object-validation';

declare interface String {
  truncate(n: number, decorator: string): string;
}
declare module 'draftjs-to-html';
declare module 'html-to-draftjs';

function createRef<T>(): RefObject<T>;
interface RefObject<T> {
  // immutable
  readonly current: T | null;
}
