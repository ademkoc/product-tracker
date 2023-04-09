import type { FastifyInstance } from 'fastify';
import { SimpleIntervalJob, Task, ToadScheduler } from 'toad-scheduler';

const CHECK_PRODUCT_PRICE_IN_MINS = 10;

export function registerJobs(app: FastifyInstance) {
  const { checkProductPriceJob } = app.diContainer.cradle;

  const job = new SimpleIntervalJob(
    { minutes: CHECK_PRODUCT_PRICE_IN_MINS },
    new Task('CheckProductPriceJob', () => {
      void checkProductPriceJob.process();
    }),
  );

  new ToadScheduler().addSimpleIntervalJob(job);
}
