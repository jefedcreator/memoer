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
  apiKey: string;
  domain: string;
  sender: string;
  email: string;
  password: string;
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
  redis: {
    host: secrets.REDIS_HOST,
    port: Number(secrets.REDIS_PORT),
    user: secrets.REDIS_USERNAME,
    password: secrets.REDIS_PASSWORD,
  } as RedisConfigs,
  mail: {
    domain: secrets.MAILER_SEND_DOMAIN,
    apiKey: secrets.MAILER_SEND_API_KEY,
    sender: secrets.MAILER_SEND_FROM,
    email: secrets.EMAIL,
    password: secrets.PASSWORD,
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
