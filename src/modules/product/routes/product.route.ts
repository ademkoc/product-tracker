import { type FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';

import { CreateProductSchema, IdParamSchema } from '../../../schemas/product';
import * as ProductController from '../controllers/product.controller';

export const autoPrefix = '/products';

export const plugin: FastifyPluginCallbackTypebox = function (fastify, opts, next) {
  fastify.get(
    '/',
    {
      schema: {
        tags: ['Product'],
      },
    },
    ProductController.index,
  );

  fastify.post(
    '/',
    {
      schema: {
        tags: ['Product'],
        body: CreateProductSchema,
      },
    },
    ProductController.create,
  );

  fastify.get(
    '/:id',
    {
      schema: {
        tags: ['Product'],
        params: IdParamSchema,
      },
    },
    ProductController.show,
  );

  fastify.put(
    '/:id',
    {
      schema: {
        tags: ['Product'],
        params: IdParamSchema,
      },
    },
    ProductController.update,
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        tags: ['Product'],
        params: IdParamSchema,
      },
    },
    ProductController.destroy,
  );

  next();
};

export default plugin;
