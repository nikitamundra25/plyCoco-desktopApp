export interface IDateResponse {
  isValid: boolean;
  message: string;
}

export interface IDateValidatorOptions {
  seperator?: string;
  label?: string;
  minDate?: Date | string | null | undefined;
  maxDate?: Date | string | null | undefined;
}
