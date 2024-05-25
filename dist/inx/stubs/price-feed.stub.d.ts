import { PriceFeed } from '../../interfaces/price-feed.interface';
export declare class PriceFeedStub implements PriceFeed {
    subscribe(): void;
    getPrice(asset: string): Promise<number>;
}
