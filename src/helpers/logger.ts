import { EnviornmentType } from '../config';

// Function to log data in only development mode
export const logger = (data: any) => {
  if (process.env.NODE_ENV === EnviornmentType.DEV) {
    console.log(data);
  }
};
