import { Injectable, Logger } from '@nestjs/common';
import { PriceFeed } from '../interfaces/price-feed.interface';
import { Hedging } from '../interfaces/hedging.interface';

@Injectable()
export class InxService {
  private readonly logger = new Logger(InxService.name);

  constructor(private priceFeed: PriceFeed, private hedging: Hedging) {}

  subscribeOrderBooks() {
    // Implementation to subscribe to INX order books
  }

  addOrder(asset: string, amount: number, price: number) {
    // Implementation to add order on INX
  }

  cancelOrder(orderId: string) {
    // Implementation to cancel order on INX
  }

  handleOrderExecution(asset: string, amount: number) {
    this.hedging.executeTrade(asset, amount).then(() => {
      this.logger.log(`Hedging trade executed for ${amount} of ${asset}`);
    });
  }
}
