import { SimpleIntervalJob, Task, ToadScheduler } from 'toad-scheduler';

import { CheckProductPriceJob } from './product';
import { PrismaClient } from '@prisma/client';
import { ColinsParser } from './parsers';
import { PushNotificationService } from './notification/push/push-notification.service';

export function registerJobs() {
  const prismaService = new PrismaClient();
  const parser = new ColinsParser();
  const notificationService = new PushNotificationService();

  const job = new SimpleIntervalJob(
    { minutes: 1 },
    new Task('CheckProductPriceJob', () =>
      new CheckProductPriceJob({
        prismaService,
        notificationService,
        parser,
      }).process(),
    ),
  );

  new ToadScheduler().addSimpleIntervalJob(job);
}
