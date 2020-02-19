import { IDateResponse } from '../interfaces';
import moment from 'moment';
import { logger } from './Logger';

export const timeValidator = (dateString: string, label?: string): any => {
  const time = dateString ? dateString.replace(/\D+/g, '') : '';
  console.log('time', time);
  if (time !== '') {
    console.log('dateString', dateString);
    if (!/^\d{1,2}\:\d{1,2}\$/.test(dateString))
      return {
        isValid: false,
        message: 'Please enter a valid time'
      };
  }
  // Parse the time parts to integers
  var parts: string[] = dateString ? dateString.split(':') : [];
  console.log('parts', parts);
  var hours: number = parseInt(parts[0], 10);
  var minutes: number = parseInt(parts[1], 10);
  if (hours > 24 || hours === 0) {
    return {
      isValid: false,
      message: 'Please enter a valid hour'
    };
  }
  if (minutes > 60 || minutes === 0) {
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
