import { CreateProductSchema, IdParamSchema } from '../../../schemas';

export const GET_PRODUCT_INDEX = {
  schema: {
    tags: ['Product'],
  },
};

export const GET_PRODUCT_SHOW = {
  schema: {
    tags: ['Product'],
    params: IdParamSchema,
  },
};

export const POST_PRODUCT_CREATE = {
  schema: {
    tags: ['Product'],
    body: CreateProductSchema,
  },
};

export const PUT_PRODUCT_UPDATE = {
  schema: {
    tags: ['Product'],
    params: IdParamSchema,
  },
};

export const DELETE_PRODUCT_DESTROY = {
  schema: {
    tags: ['Product'],
    params: IdParamSchema,
  },
};
