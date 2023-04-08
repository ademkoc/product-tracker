import { PrismaClient } from '@prisma/client';
import { SimpleIntervalJob, Task, ToadScheduler } from 'toad-scheduler';

import { PushNotificationService } from './notification/push/push-notification.service';
import { ColinsParser, MaviParser, ParserFacade } from './parsers';
import { CheckProductPriceJob } from './product';

export function registerJobs() {
  const prismaService = new PrismaClient();
  const parser = new ParserFacade([new ColinsParser(), new MaviParser()]);
  const notificationService = new PushNotificationService();

  const job = new SimpleIntervalJob(
    { minutes: 10 },
    new Task('CheckProductPriceJob', () => {
      const job = new CheckProductPriceJob({
        prismaService,
        notificationService,
        parser,
      });
      void job.process();
    }),
  );

  new ToadScheduler().addSimpleIntervalJob(job);
}
