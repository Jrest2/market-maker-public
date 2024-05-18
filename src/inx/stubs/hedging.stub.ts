import { Injectable, Logger } from '@nestjs/common';
import { Hedging } from '../../interfaces/hedging.interface';

@Injectable()
export class HedgingStub implements Hedging {
  private readonly logger = new Logger(HedgingStub.name);

  async executeTrade(asset: string, amount: number): Promise<void> {
    this.logger.log(asset, amount);
  }
}
