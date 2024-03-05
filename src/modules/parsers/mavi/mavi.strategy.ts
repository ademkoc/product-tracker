import type { IParser } from 'src/modules/parsers';

import { AbstractParser } from '../abstract-parser';

import { maviConfig } from './mavi.strategy.config';

export class MaviStrategy extends AbstractParser implements IParser {
  public readonly name = 'mavi';

  public constructor() {
    super();

    this.setConfig(maviConfig);
  }
}
