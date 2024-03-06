import type { FastifyInstance } from 'fastify';
import { SimpleIntervalJob, Task, ToadScheduler } from 'toad-scheduler';

export function registerJobs(app: FastifyInstance) {
  const { checkProductPriceJob, config } = app.diContainer.cradle;

  const job = new SimpleIntervalJob(
    { minutes: config.checkPriceJobIntervalInMins },
    new Task('CheckProductPriceJob', () => {
      void checkProductPriceJob.process();
    }),
  );

  new ToadScheduler().addSimpleIntervalJob(job);
}
