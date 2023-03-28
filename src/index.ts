import { parse } from "muninn";
import { fetch } from "undici";

export async function readProductSource(url: string) {
  const response = await fetch(url);

  const html = await response.text();

  return html;
}

export async function decodeSource(html: string) {
  const config = {
    schema: {
      title: ".product-detail-product-name",
      price: ".product-detail-price",
    },
  };

  return parse(html, config);
}

async function main() {
  const productURL =
    "https://www.colins.com.tr/p/regular-fit-dugmeli-cepli-bej-erkek-mont-39024";
  const html = await readProductSource(productURL);
  const result = await decodeSource(html);

  console.log({ result });
}

main();
