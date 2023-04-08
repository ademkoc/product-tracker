import type { FastifyReply, FastifyRequest } from 'fastify';
import type { CreateProductSchemaType, IdParamSchemaType } from 'src/schemas';

export const index = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const data = await req.diScope.cradle.productService.getProducts();

  return reply.send({ data });
};

export const create = async (
  req: FastifyRequest<{ Body: CreateProductSchemaType }>,
  reply: FastifyReply,
): Promise<void> => {
  const { url } = req.body;

  const product = await req.diScope.cradle.parser.parseContent(url);

  return reply.send({ data: product });
};

export const show = async (
  req: FastifyRequest<{ Params: IdParamSchemaType }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = req.params;

  const result = await req.diScope.cradle.productService.getProduct(id);

  if (result.error) {
    throw new Error('Product not found');
  }

  return reply.send({ data: result.result });
};

export const update = async (
  req: FastifyRequest<{ Params: IdParamSchemaType }>,
  reply: FastifyReply,
): Promise<void> => {
  throw new Error('Not Implemented!');
};

export const destroy = async (
  req: FastifyRequest<{ Params: IdParamSchemaType }>,
  reply: FastifyReply,
): Promise<void> => {
  throw new Error('Not Implemented!');
};
