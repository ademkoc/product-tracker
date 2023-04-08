import type { IParser } from 'src/modules/parsers';

import { AbstractParser } from '../abstract-parser';

import { trendyolConfig } from './trendyol.parser.config';

export class TrendyolParser extends AbstractParser implements IParser {
  public readonly name = 'trendyol';

  public constructor() {
    super();

    this.setConfig(trendyolConfig);
  }
}
