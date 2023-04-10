declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      DATABASE_URL: string;
      NOTIFICATION_TOPIC: string;
      NOTIFICATION_SERVICE_URL: string;
      PORT: string;
      SERVICE_NAME: string;
      CHECK_PRODUCT_PRICE_IN_MINS: string;
      PRODUCT_LAST_CHECK_IN_MINS: string;
    }
  }
}

export {};
