export interface PriceFeed {
    subscribe(): void;
    getPrice(asset: string): Promise<number>;
}
