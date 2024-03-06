import type { Environment } from './config.type';
import { getEnv, getMandatoryEnv } from './config.utils';

export function getConfig() {
  return {
    serviceName: getEnv('SERVICE_NAME') || 'product_tracker',
    environment: getMandatoryEnv('NODE_ENV') as Environment,
    port: Number(getEnv('PORT')) || 3000,
    databaseURL: getMandatoryEnv('DATABASE_URL'),
    notificationTopic: getMandatoryEnv('NOTIFICATION_TOPIC'),
    notificationServiceURL: getMandatoryEnv('NOTIFICATION_SERVICE_URL'),
    checkPriceJobIntervalInMins: Number(getEnv('CHECK_PRICE_JOB_INTERVAL_IN_MINS')) || 5,
    productSinceLastCheckInMins: Number(getEnv('PRODUCT_SINCE_LAST_CHECK_IN_MINS')) || 15,
  };
}
