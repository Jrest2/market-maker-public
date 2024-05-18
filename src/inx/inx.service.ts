import { Injectable, Logger } from '@nestjs/common';
import { PriceFeed } from '../interfaces/price-feed.interface';
import { Hedging } from '../interfaces/hedging.interface';
import { ConfigService } from '../config/config.service';
import * as WebSocket from 'ws';
import { RequestService } from "./request.service";

@Injectable()
export class InxService {
  private readonly logger = new Logger(InxService.name);
  private ws: WebSocket;

  private OrderBookMap: Map<string, object>;

  constructor(
    private priceFeed: PriceFeed,
    private hedging: Hedging,
    private configService: ConfigService,
    private requestService: RequestService,
  ) {}

  subscribeOrderBooks() {
    const wsUrl = 'wss://gw-client-api-ws.inx.co/orderBook/subscribeOrderBook';
    this.ws = new WebSocket(wsUrl);

    this.ws.on('open', () => {
      this.logger.log('Connected to INX order books WebSocket');
    });

    this.ws.on('message', (data: string) => {
      const message = JSON.parse(data);
      this.handleOrderBookUpdate(message);
    });

    this.ws.on('error', (error) => {
      this.logger.error(`WebSocket error: ${error.message}`);
    });

    this.ws.on('close', () => {
      this.logger.log('Disconnected from INX order books WebSocket');
    });
  }

  subscribeTradeReport() {
    const wsUrl =
      'wss://gw-client-api-ws.inx.co/tradeReport/subscribeTradeReport';

    this.ws = new WebSocket(wsUrl);

    this.ws.on('open', () => {
      this.logger.log('Connected to INX trade report WebSocket');
    });

    this.ws.on('message', (data: string) => {
      const message = JSON.parse(data);
      this.handleTradeReport(message);
    });

    this.ws.on('error', (error) => {
      this.logger.error(`WebSocket error: ${error.message}`);
    });

    this.ws.on('close', () => {
      this.logger.log('Disconnected from INX trade report WebSocket');
    });
  }

  handleOrderBookUpdate(message: any) {
    this.logger.log(`Received order book update: ${JSON.stringify(message)}`);
  }

  handleTradeReport(message: any) {
    this.logger.log(`Received trade report update: ${JSON.stringify(message)}`);
  }

  async addOrder(
    marketName: string,
    side: string,
    amount: number,
    price: number,
    externalOrderId: string,
  ) {
    const orderDetails = { marketName, amount, side, price, externalOrderId };
    const result = await this.requestService.placeOrder(orderDetails);
    const orderId = result.orderId;
    this.OrderBookMap.set(orderId, {});
  }

  cancelOrder(orderId: string) {
    this.OrderBookMap.delete(orderId);
  }

  handleOrderExecution(asset: string, amount: number) {
    this.hedging.executeTrade(asset, amount).then(() => {
      this.logger.log(`Hedging trade executed for ${amount} of ${asset}`);
    });
  }
}
