declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NOTIFICATION_TOPIC: string;
      NOTIFICATION_SERVICE_URL: string;
    }
  }
}

export {}
