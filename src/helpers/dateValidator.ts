// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
export const dateValidator = (dateString: string) => {
  // First check for the pattern
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
    return {
      isValid: false,
      message: "Date is not valid"
    };

  // Parse the date parts to integers
  var parts: string[] = dateString.split('/');
  var day: number = parseInt(parts[1], 10);
  var month: number = parseInt(parts[0], 10);
  var year: number = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if (year < 1950 || year > 2010 || month === 0 || month > 12) return {
    isValid: false,
    message: "Date must be between a range"
  };;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 === 0 || (year % 100 != 0 && year % 4 === 0))
    monthLength[1] = 29;

  // Check the range of the day
  return {
    isValid: day > 0 && day <= monthLength[month - 1],
    message: "Date"
  };

};
