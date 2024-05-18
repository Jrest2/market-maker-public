import { Injectable } from '@nestjs/common';
import { PriceFeed } from '../interfaces/price-feed.interface';

@Injectable()
export class PriceFeedStub implements PriceFeed {
  /**
   * Subscribe to an event.
   *
   * @returns {void} This method does not return a value.
   */
  subscribe(): void {
    // Stub for implementing subscribe method
  }

  /**
   * Retrieves the price of an asset.
   *
   * @param {string} asset - The asset for which the price is to be retrieved.
   * @returns {Promise<number>} - A Promise that resolves to the price of the asset.
   */
  async getPrice(asset: string): Promise<number> {
    // Stub for getting price
    return 100;
  }
}
