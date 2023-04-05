import { Prisma } from "@prisma/client";

export function amountTransformer(priceStr: any) {
  const amount = parseFloat(
    priceStr.slice(0, -3)
      .replace(".", "")
      .replace(",", "."),
  );
  return new Prisma.Decimal(amount);
}

export function currencyTransformer(priceStr: any) {
  const currency = priceStr.slice(-2);
  return currency;
}
