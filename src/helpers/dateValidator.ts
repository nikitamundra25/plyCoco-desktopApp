//  leap year
// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
export const dateValidator = (dateString: string) => {
  console.log("date string is", dateString);
  const date = dateString ? dateString.replace(/\D+/g, "") : "";
  // First check for the pattern
  if (date !== "") {
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
      return {
        isValid: false,
        message: "Please enter a valid date"
      };
  }
  // Parse the date parts to integers
  var parts: string[] = dateString ? dateString.split("/") : [];
  var day: number = parseInt(parts[1], 10);
  var month: number = parseInt(parts[0], 10);
  var year: number = parseInt(parts[2], 10);

  const format = new Date().getFullYear();
  console.log("format is", format);
  const difference = format - 100;
  console.log("difference is", difference);

  if (year < difference || year > format)
    return {
      isValid: false,
      message: "Please enter a valid year"
    };
  if (year < 1950 || year > 2010) {
    console.log("year should be in range");
    return {
      isValid: false,
      message: "Date must be between a range of 1950 to 2010"
    };
  }
  // && day > 31 && (month === 0 || month > 12
  // || month === 0 || month > 12
  // Check the ranges of month and year
  if (year < 1950 || year > 2010)
    return {
      isValid: false,
      message: "Date must be between a range"
    };

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (date !== "") {
    if (year % 400 === 0 || (year % 100 != 0 && year % 4 === 0))
      monthLength[1] = 29;
    console.log(" inside last func");
    return {
      isValid: day > 0 && day <= monthLength[month - 1],
      message: "Please enter a valid date"
    };
  } else {
    return {
      isValid: true,
      message: "Date is valid"
    };
  }

  // Adjust for leap years
  //   if (date !== "") {
  //     if (year % 400 === 0 || (year % 100 != 0 && year % 4 === 0)) {
  //       monthLength[1] = 29;
  //       console.log(" inside last func");

  //       return {
  //         isValid: day > 0 && day <= monthLength[month - 1],
  //         message: "Please enter a valid date"
  //       };
  //     } else {
  //       return {
  //         isValid: true,
  //         message: "Date is valid"
  //       };
  //     }
  //   } else {
  //     return {
  //       isValid: true,
  //       message: "Date is valid"
  //     };
  //   }
  // };
};
