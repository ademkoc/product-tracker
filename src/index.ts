import { ColinsParser } from "./domain";

async function main() {
  const productURL =
    "https://www.colins.com.tr/p/regular-fit-dugmeli-cepli-bej-erkek-mont-39024";

  const parser = new ColinsParser();
  const result = await parser.parse(productURL);

  console.log({ result });
}

main();
