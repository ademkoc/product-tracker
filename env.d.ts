declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      DATABASE_URL: string;
      NOTIFICATION_TOPIC: string;
      NOTIFICATION_SERVICE_URL: string;
      PORT: string;
      SERVICE_NAME: string;
      CHECK_PRICE_JOB_INTERVAL_IN_MINS: string;
      PRODUCT_SINCE_LAST_CHECK_IN_MINS: string;
    }
  }
}

export {};
