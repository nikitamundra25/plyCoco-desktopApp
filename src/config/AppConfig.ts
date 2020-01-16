let data: any;
export const EnviornmentType: any = {
  DEV: 'development',
  PROD: 'production',
};

export const env: any = process.env.NODE_ENV || EnviornmentType.DEV;
data = {
  GRAPHQL_ENDPOINT:
    env === EnviornmentType.DEV
      ? 'http://192.168.2.104:8001/graphql'
      : 'http://192.168.2.104:8001/graphql',
  FILES_ENDPOINT:
    env === EnviornmentType.DEV
      ? 'http://192.168.2.104:8001'
      : 'http://192.168.2.104:8001',

  API_VERSION: 'api/v2',
};

data.DEFAULT_DATE_FORMAT = 'LLL';

export const AppConfig = data;
