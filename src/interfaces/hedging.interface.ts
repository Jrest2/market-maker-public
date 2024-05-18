export interface Hedging {
  executeTrade(asset: string, amount: number): Promise<void>;
}
