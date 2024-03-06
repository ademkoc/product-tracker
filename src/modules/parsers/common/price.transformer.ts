/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prisma } from '@prisma/client';

export function amountTransformer(priceStr: any) {
  const amount = parseFloat(priceStr.slice(0, -2).replace('.', '').replace(',', '.'));
  return new Prisma.Decimal(amount);
}

export function currencyTransformer(currency: any) {
  return currency;
}
