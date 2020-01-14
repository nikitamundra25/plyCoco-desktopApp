export interface IReactSelectInterface {
  label: string;
  value: string;
}

export interface IHandleSelectInterface {
  handleSelect: (selectOption: IReactSelectInterface, name: string) => void
}