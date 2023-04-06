import { build } from './app';
import { registerJobs } from './modules/jobs';

async function server() {
  const server = await build();

  registerJobs();

  server.listen({ port: 3000 }, function (err) {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  });
}

void server();
