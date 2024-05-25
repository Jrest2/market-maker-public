import { Hedging } from '../../interfaces/hedging.interface';
export declare class HedgingStub implements Hedging {
    private readonly logger;
    executeTrade(asset: string, amount: number): Promise<void>;
}
