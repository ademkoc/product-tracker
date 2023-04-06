import { type FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';

import * as ProductController from '../controllers/product.controller';
import * as S from '../schemas/product.route.schema';

export const plugin: FastifyPluginCallbackTypebox = function (fastify, opts, next) {
  fastify
    .get('/products', S.GET_PRODUCT_INDEX, ProductController.index)
    .post('/products', S.POST_PRODUCT_CREATE, ProductController.create)
    .get('/products/:id', S.GET_PRODUCT_SHOW, ProductController.show)
    .get('/products/:id/history', S.GET_PRODUCT_SHOW_HISTORY, ProductController.showHistory)
    .put('/products/:id', S.PUT_PRODUCT_UPDATE, ProductController.update)
    .delete('/products/:id', S.DELETE_PRODUCT_DESTROY, ProductController.destroy);

  next();
};

export default plugin;
