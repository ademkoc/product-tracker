import { fastifyAutoload } from '@fastify/autoload';
import { fastifyAwilixPlugin, diContainer } from '@fastify/awilix';
import Swagger from '@fastify/swagger';
import SwaggerUI from '@fastify/swagger-ui';
import Fastify from 'fastify';

import { registerDependencies } from './infrastructure/ioc';

export async function build() {
  const server = Fastify({
    logger: {},
  });

  registerDependencies(diContainer, {
    logger: server.log,
  });

  await server.register(Swagger, { openapi: {} });
  await server.register(SwaggerUI);
  await server.register(fastifyAwilixPlugin, { disposeOnClose: true, disposeOnResponse: true });

  await server.register(fastifyAutoload, {
    dir: `${__dirname}/modules`,
    dirNameRoutePrefix: false,
    matchFilter: /.*route(\.ts|\.js|\.cjs|\.mjs)$/,
  });

  return server;
}
