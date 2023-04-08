import { build } from './app';
import { buildContainer } from './infrastructure/ioc';
import { registerJobs } from './modules/jobs';

async function server() {
  const server = await build();
  buildContainer();
  registerJobs(server);

  server.listen({ host: '0.0.0.0', port: 3000 }, function (err) {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  });
}

void server();
