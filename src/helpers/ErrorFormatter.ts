export const errorFormatter = (error: any): string => {
  const message = error.message
    .replace('SequelizeValidationError: ', '')
    .replace('Validation error: ', '')
    .replace('GraphQL error: ', '');
  return message;
};
