import { fetch } from "undici";
import { parse } from "muninn";

import { ParserConfigs, Price } from "./parser.types";
import { CreateProductDTO } from "src/schemas/product";

export type IParser = {
  parseContent: (url: string) => Promise<CreateProductDTO>;
  parsePrice: (url: string) => Promise<Price>;
};

export abstract class AbstractParser {
  private contentConfig = {};
  private priceConfig = {};

  protected setConfig(opts: ParserConfigs) {
    this.contentConfig = opts.content;
    this.priceConfig = opts.price;
  }

  async #readSource(url: string) {
    const response = await fetch(url);

    const html = await response.text();

    return html;
  }

  #decodeSource(html: string, config: any) {
    const result = parse(html, config);

    return result;
  }

  async parseContent(url: string): Promise<CreateProductDTO> {
    const html = await this.#readSource(url);
    const result = this.#decodeSource(html, this.contentConfig);
    return { ...result, url } as CreateProductDTO;
  }

  async parsePrice(url: string): Promise<Price> {
    const html = await this.#readSource(url);
    const result = this.#decodeSource(html, this.priceConfig);
    return result as Price;
  }
}
