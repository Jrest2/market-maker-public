import { Injectable } from '@nestjs/common';
import { Hedging } from '../interfaces/hedging.interface';

@Injectable()
export class HedgingStub implements Hedging {
  async executeTrade(asset: string, amount: number): Promise<void> {
    // Заглушка для виконання торгівлі
  }
}
