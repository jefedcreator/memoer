import * as dotenv from "dotenv";
// dotenv.config();
// const secrets: any =
//   process.env.APP_ENV === 'production' ? fetchSecrets() : process.env;

// if (process.env.NODE_ENV !== 'production') {
//   dotenv.config();
// } else {
//   dotenv.config({ path: '.env.production' });
// }
dotenv.config();

export const environments = {
  dev: "development",
  stg: "staging",
  prd: "production",
} as const;

export type EnvironmentKeys = keyof typeof environments;
export type Environments = (typeof environments)[EnvironmentKeys];
const PORT = 3000;

const secrets = process.env;

type MailConfigs = {
  host: string;
  apiKey: string;
  domain: string;
  port: number;
  sender: string;
};

type MongoConfigs = {
  host: string;
  user: string;
  password: string;
  name: string;
};

type RedisConfigs = {
  host: string;
  port: number;
  user: string;
  password: string;
};

export const config = {
  baseUrl: secrets.BASE_URL,
  port: PORT,
  appEnv: secrets.APP_ENV,
  jwt: {
    user: secrets.USER_JWT as string,
    admin: secrets.ADMIN_JWT as string,
  },
  identity: {
    publicKey: secrets.QOREID_CLIENT_ID,
    secretKey: secrets.QOREID_SECRET_KEY,
    host: secrets.QOREID_BASE_URL,
  },
  mongo: {
    name: secrets.MONGODB_NAME,
    host: secrets.MONGODB_URI,
  } as MongoConfigs,
  redis: {
    host: secrets.REDIS_HOST,
    port: Number(secrets.REDIS_PORT),
    user: secrets.REDIS_USERNAME,
    password: secrets.REDIS_PASSWORD,
  } as RedisConfigs,
  mail: {
    host: secrets.MAIL_HOST,
    domain: secrets.MAIL_DOMAIN,
    port: Number(secrets.MAIL_PORT),
    apiKey: secrets.MAIL_API_KEY,
    sender: secrets.MAIL_SENDER,
  } as MailConfigs,
  payment: {
    host: secrets.PAYMENT_BASE_URL,
    publicKey: secrets.PAYMENT_PUBLIC_KEY,
    secretKey: secrets.PAYMENT_PRIVATE_KEY,
  },
  sms: {
    simpu: {
      host: secrets.SIMPU_URL,
      secret: secrets.SIMPU_SECRET,
    },
    termii: {
      host: secrets.TERMII_URL,
      secret: secrets.TERMII_SECRET,
    },
  },
  storage: {
    bucketName: secrets.BUCKET_STORAGE_NAME,
  },
  otp: {
    secret: secrets.OTP_SECRET,
  },
  notification: {
    host: secrets.NOTIFICATION_HOST,
  },
  chat: {
    secretKey: secrets.CHAT_SECRET,
    apiKey: secrets.CHAT_API_KEY,
  },
};
