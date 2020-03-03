import { IAttributeValues } from './CareGiver';

export interface IAttributeFilter {
  show: boolean;
  handleClose: () => void;
}
export interface IAttributeFilterPage {
  show: any;
  attributeData:
    | {
        getCaregiverAtrribute: IAttributeValues[];
      }
    | undefined;
  handleCheckNegativeElement: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
  handleCheckPositiveElement: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
  isPositive: number[];
  isNegative: number[];
  handleClose: any;
  onApplyingFilter: () => void;
  handleCheckAllElements: (list: string) => void;
  setIsNegative: React.Dispatch<React.SetStateAction<number[]>>;
  setIsPositive: React.Dispatch<React.SetStateAction<number[]>>;
}
