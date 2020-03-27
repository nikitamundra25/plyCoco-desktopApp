export const errorFormatter = (error: any): string => {
  const message = (typeof error === "string" ? error : error.message)
    .replace("SequelizeValidationError: ", "")
    .replace("Validation error: ", "")
    .replace("GraphQL error: ", "");
  return message;
};
