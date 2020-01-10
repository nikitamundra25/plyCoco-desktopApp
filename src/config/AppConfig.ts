
let data: any;
export const EnviornmentType: any = {
    DEV: 'development',
    PROD: 'production',
};

export const env: any = process.env.NODE_ENV || EnviornmentType.DEV;
data = {
    GRAPHQL_ENDPOINT:
        env === EnviornmentType.DEV
            ? 'http://192.168.2.138:3005/graphql'
            : 'http://3.210.57.154/',

    API_VERSION: 'api/v2',
};

data.DEFAULT_DATE_FORMAT = 'LLL';

export const AppConfig = data;