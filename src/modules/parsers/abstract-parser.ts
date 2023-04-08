import type { Schema } from 'muninn';
import { parse } from 'muninn';
import type { ProductSchemaType } from 'src/schemas';
import { fetch } from 'undici';

import type { ParserConfigs, Price } from './parser.types';

export type IParser = {
  name: string;
  parseContent: (url: string) => Promise<ProductSchemaType>;
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

  #decodeSource(html: string, config: Schema) {
    const result = parse(html, config);

    return result;
  }

  async parseContent(url: string): Promise<ProductSchemaType> {
    const html = await this.#readSource(url);
    const result = this.#decodeSource(html, this.contentConfig);
    return { ...result, url } as ProductSchemaType;
  }

  async parsePrice(url: string): Promise<Price> {
    const html = await this.#readSource(url);
    const result = this.#decodeSource(html, this.priceConfig);
    return result as Price;
  }
}
