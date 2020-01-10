import { EnviornmentType } from '../config';

const getFunctionCallerName = () => {
  try {
    throw new Error();
  } catch (e) {
    try {
      return e.stack.split('at ')[3].split(' ')[0];
    } catch (e) {
      return '';
    }
  }
};

// Function to log data in only development mode
export const logger = (...arg: any[]): void => {
  const caller = getFunctionCallerName();
  if (process.env.NODE_ENV === EnviornmentType.DEV) {
    for (let index = 0; index < arg.length; index++) {
      const value = arg[index];
      console.log('====================================');
      console.log(value, `called by ${caller}`);
      console.log('====================================');
    }
  }
};
