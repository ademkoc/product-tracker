import type { IParser } from 'src/modules/parsers';

import { AbstractParser } from '../abstract-parser';

import { amazonConfig } from './amazon.strategy.config';

export class AmazonStrategy extends AbstractParser implements IParser {
  public readonly name = 'amazon';

  public constructor() {
    super();

    this.setConfig(amazonConfig);
  }
}
