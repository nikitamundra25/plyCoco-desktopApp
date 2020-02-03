export interface IAddAttributeProps {
  handleSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newAttribute: string;
  isSubmit: boolean;
}

export interface IAttributeInput {
  id: number;
  name: string;
}
export interface IAttributeFormValues{
  newAttribute: string;

}