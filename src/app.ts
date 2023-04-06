// eslint-disable-next-line import/default
import AutoLoad from '@fastify/autoload';
import Swagger from '@fastify/swagger';
import SwaggerUI from '@fastify/swagger-ui';
import Fastify from 'fastify';

export async function build() {
  const server = Fastify({ logger: {} });

  await server.register(Swagger, { openapi: {} });
  await server.register(SwaggerUI);

  await server.register(AutoLoad, {
    dir: `${__dirname}/modules`,
    dirNameRoutePrefix: false,
    matchFilter: /.*route(\.ts|\.js|\.cjs|\.mjs)$/,
  });

  return server;
}
