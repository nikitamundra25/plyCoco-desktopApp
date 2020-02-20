import { ITimeResponse } from '../interfaces/TimeFunction';

export const timeValidator = (timeString: string): ITimeResponse => {
  if (!/^\d{1,2}:\d{2}([ap]m)?$/.test(timeString)) {
    return {
      isValid: false,
      message: 'Please enter a valid time'
    };
  }

  // Parse the time parts to integers
  var parts: string[] = timeString ? timeString.split(':') : [];
  var hours: number = parseInt(parts[0], 10);
  var minutes: number = parseInt(parts[1], 10);
  if (hours > 24 || hours === 0) {
    return {
      isValid: false,
      message: 'Please enter a valid hour'
    };
  }
  if (minutes > 60 || minutes > 0) {
    return {
      isValid: false,
      message: 'Please enter a valid minutes'
    };
  }
  if (hours === 24 && minutes > 0) {
    return {
      isValid: false,
      message: 'Please enter a valid minutes'
    };
  } else {
    return {
      isValid: true,
      message: 'Time is valid'
    };
  }
};
