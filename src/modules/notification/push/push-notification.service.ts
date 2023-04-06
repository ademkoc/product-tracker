import { fetch } from 'undici';
import { NotifyOptions } from './push-notification.types';
import { INotificationService } from '../notification.type';

export class PushNotificationService implements INotificationService {
  public static URL = `${process.env.NOTIFICATION_SERVICE_URL}/${process.env.NOTIFICATION_TOPIC}`;

  async notify(opts: NotifyOptions) {
    let options = {
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
