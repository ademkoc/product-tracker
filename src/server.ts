import { build } from './app';

async function server() {
  const server = await build();
  await server.listen({ port: 3000 });
}

void server();
