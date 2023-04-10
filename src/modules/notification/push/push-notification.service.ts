import type { ICradle } from 'src/infrastructure';
import type { IConfig } from 'src/infrastructure/config/config.type';
import { fetch } from 'undici';

import type { INotificationService } from '../notification.type';

import type { NotifyOptions } from './push-notification.types';

type ConstructorOptions = Pick<ICradle, 'config'>;

export class PushNotificationService implements INotificationService {
  private readonly config: IConfig;
  private readonly serviceURL: string;

  public constructor(opts: ConstructorOptions) {
    this.config = opts.config;
    this.serviceURL = new URL(
      this.config.notificationTopic,
      this.config.notificationServiceURL,
    ).toString();
  }

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

    await fetch(this.serviceURL, options);
  }
}
