import type { Schema } from 'muninn';
import { parse } from 'muninn';
import type { ProductSchemaType } from 'src/schemas';
import { fetch } from 'undici';

import type { ParserConfigs, Price } from './parser.types';

export abstract class AbstractParser {
  private contentConfig = {};
  private priceConfig = {};

  protected setConfig(opts: ParserConfigs) {
    this.contentConfig = opts.content;
    this.priceConfig = opts.price;
  }

  async #readSource(url: string) {
    const response = await fetch(url);

    if (response.redirected) {
      throw new Error('FETCH_RESPONSE_IS_REDIRECTED');
    }

    if (!response.ok) {
      throw new Error('FETCH_RESPONSE_NOT_OK');
    }

    const html = await response.text();

    return html;
  }

  #decodeSource(html: string, config: Schema) {
    const result = parse(html, config);

    if (!result) {
      throw new Error('CONFIG_NOT_MATCHED');
    }

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
