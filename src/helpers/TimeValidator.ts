import { ITimeResponse } from '../interfaces';
export const timeValidator = (
  timeString: string,
): ITimeResponse => {
  if (!/^\d{1,2}:\d{2}([ap]m)?$/.test(timeString)) {
    return {
      isValid: false,
      message: 'Please enter a valid time'
    };
  } else {
    return {
      isValid: true,
      message: 'Time is valid'
    };
  }
};
