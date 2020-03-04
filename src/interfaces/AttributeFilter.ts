import { IAttributeValues } from './CareGiver';

export interface IAttributeFilter {
  show: boolean;
  handleClose: () => void;
  setAttributeFilter: React.Dispatch<React.SetStateAction<string | null>>;
  attributeFilter: string | null;
}
export interface IAttributeFilterPage {
  show: any;
  attributeData: any;
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
  setShowPreset: React.Dispatch<React.SetStateAction<boolean>>;
  showPreset: boolean;
  preset: string | null;
  setPreset: React.Dispatch<React.SetStateAction<string | null>>;
  onAddingPreset: (positive: number[], negative: number[]) => Promise<void>;
  presetNames: any;
  setPresetNames: React.Dispatch<any>;
  setAttributeFilter: React.Dispatch<React.SetStateAction<string | null>>;
  attributeFilter: string | null;
}
