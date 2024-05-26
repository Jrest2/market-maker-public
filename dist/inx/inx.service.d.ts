import { PriceFeed } from '../interfaces/price-feed.interface';
import { Hedging } from '../interfaces/hedging.interface';
import { ConfigService } from '../config/config.service';
import { RequestService } from './request.service';
export declare class InxService {
    private priceFeed;
    private hedging;
    private configService;
    private requestService;
    private readonly logger;
    private ws;
    constructor(priceFeed: PriceFeed, hedging: Hedging, configService: ConfigService, requestService: RequestService);
    subscribeOrderBooks(): void;
    subscribeTradeReport(): void;
    addOrder(marketName: string, side: string, amount: number, price: number, externalOrderId: string): Promise<any>;
    cancelOrder(orderId: string): Promise<void>;
}
