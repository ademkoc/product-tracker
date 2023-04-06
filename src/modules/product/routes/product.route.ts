import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

import * as ProductController from '../controllers/product.controller';
import { CreateProductSchema, IdParamSchema } from '../../../schemas/product';

export const autoPrefix = '/products';

export const plugin: FastifyPluginAsyncTypebox = async function (fastify, opts) {
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
};

export default plugin;
