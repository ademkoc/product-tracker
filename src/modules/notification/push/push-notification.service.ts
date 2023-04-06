import { fetch } from 'undici';

import type { INotificationService } from '../notification.type';

import type { NotifyOptions } from './push-notification.types';

export class PushNotificationService implements INotificationService {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  public static URL = `${process.env.NOTIFICATION_SERVICE_URL}/${process.env.NOTIFICATION_TOPIC}`;

  async notify(opts: NotifyOptions) {
    const options = {
      method: 'POST',
      body: opts.message,
      headers: {
        Title: opts.title,
        Priority: opts.priority,
        Tags: opts.tags.join(','),
        Click: opts.actionLink || '',
      },
    };

    await fetch(PushNotificationService.URL, options);
  }
}
