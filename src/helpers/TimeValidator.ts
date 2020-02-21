import { ITimeResponse } from '../interfaces/TimeFunction';

export const timeValidator = (timeString: string): ITimeResponse => {
  if (!/^\d{0,2}?\:?\d{0,2}$/.test(timeString)) {
    return {
      isValid: false,
      message: 'Please enter a valid time'
    };
  }

  // Parse the time parts to integers
  let parts: string[] = timeString ? timeString.split(':') : [];
  let hours: number = parseInt(parts[0], 10);
  let minutes: number = parseInt(parts[1], 10);
  const isValidHour = (hour: number) =>
    Number.isInteger(hour) && hour >= 0 && hour < 24;
  const isValidMinutes = (minute: number) =>
    (Number.isInteger(minutes) && hours >= 0 && hours < 24) ||
    Number.isNaN(minutes);

  if (!isValidHour(hours) || !isValidMinutes(minutes)) {
    return {
      isValid: false,
      message: 'Please enter a valid hour'
    };
  }

  if (minutes < 10 && Number(minutes) > 5) {
    return {
      isValid: false,
      message: 'Please enter a valid hour'
    };
  }
  const valArr =
    timeString.indexOf(':') !== -1 ? timeString.split(':') : [timeString];

  // check mm and HH
  if (
    valArr[0] &&
    valArr[0].length &&
    (parseInt(valArr[0], 10) < 0 || parseInt(valArr[0], 10) > 23)
  ) {
    return {
      isValid: false,
      message: 'Please enter a valid time'
    };
  }

  if (
    valArr[1] &&
    valArr[1].length &&
    (parseInt(valArr[1], 10) < 0 || parseInt(valArr[1], 10) > 59)
  ) {
    return {
      isValid: false,
      message: 'Please enter a valid time'
    };
  }

  return {
    isValid: true,
    message: 'Time is valid'
  };
};

export const commentValidator = (value: string): ITimeResponse => {
  if (/[\%]/.test(value)) {
    return {
      isValid: false,
      message: 'Please enter a valid time'
    };
  } else {
    return { isValid: true, message: 'Comment is valid' };
  }
};
