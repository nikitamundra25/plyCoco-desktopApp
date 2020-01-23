export const EnviornmentType: any = {
  DEV: "development",
  PROD: "production"
};

export const env: any = process.env.NODE_ENV || EnviornmentType.DEV;

export const AppConfig = {
  GRAPHQL_ENDPOINT: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  FILES_ENDPOINT: process.env.REACT_APP_FILES_ENDPOINT,
  API_VERSION: process.env.REACT_APP_API_VERSION,
  DEFAULT_DATE_FORMAT: process.env.REACT_APP_DEFAULT_DATE_FORMAT
};
