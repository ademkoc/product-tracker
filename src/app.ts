import Fastify from "fastify";
import AutoLoad from "@fastify/autoload";
import Swagger from "@fastify/swagger";
import SwaggerUI from "@fastify/swagger-ui";

export function build() {
  const server = Fastify();

  server.register(Swagger, { openapi: {} });
  server.register(SwaggerUI);

  server.register(AutoLoad, {
    dir: `${__dirname}/modules`,
    matchFilter: /.*route(\.ts|\.js|\.cjs|\.mjs)$/,
  });

  return server;
}
