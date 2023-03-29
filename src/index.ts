import { parse } from "muninn";
import { fetch } from "undici";
import camelcase from "camelcase";

import { convertTurkishChars as en } from "./utils";

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
      details: {
        selector: "div#tabitem1 table tbody tr | array",
        schema: {
          key: {
            selector: "th:nth-child(1)",
            transform: (value: any) => camelcase(en(value.slice(0, -2))),
          },
          value: "td:nth-child(2)",
        },
      },
      images: {
        "selector": ".product-detail-left img | array",
        "attr": "src",
      },
    },
  };

  const result = parse(html, config);

  return result;
}

async function main() {
  const productURL =
    "https://www.colins.com.tr/p/regular-fit-dugmeli-cepli-bej-erkek-mont-39024";
  const html = await readProductSource(productURL);
  const result = await decodeSource(html);

  console.log({ result });
}

main();
