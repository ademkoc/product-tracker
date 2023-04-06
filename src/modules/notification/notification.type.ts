import type { NotifyOptions } from './push/push-notification.types';

export interface INotificationService {
  notify: (opts: NotifyOptions) => object;
}
