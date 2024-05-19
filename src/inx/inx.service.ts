import { Injectable, Logger } from '@nestjs/common';
import { PriceFeed } from '../interfaces/price-feed.interface';
import { Hedging } from '../interfaces/hedging.interface';
import { ConfigService } from '../config/config.service';
import { RequestService } from './request.service';
import * as WebSocket from 'ws';

@Injectable()
export class InxService {
  private readonly logger = new Logger(InxService.name);
  private ws: WebSocket;

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
      this.logger.log(
        new Date().toUTCString(),
        'New order via WS order book channel: ',
        message,
      );
      return message;
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
      this.logger.log(
        new Date().toUTCString(),
        'New trade report via WS: ',
        message,
      );
    });

    this.ws.on('error', (error) => {
      this.logger.error(`WebSocket error: ${error.message}`);
    });

    this.ws.on('close', () => {
      this.logger.log('Disconnected from INX trade report WebSocket');
    });
  }

  async addOrder(
    marketName: string,
    side: string,
    amount: number,
    price: number,
    externalOrderId: string,
  ) {
    try {
      const orderDetails = { marketName, amount, side, price, externalOrderId };
      const result = await this.requestService.placeOrder(orderDetails);
      this.logger.log(new Date().toUTCString(), 'Added order result', result);
      return result;
    } catch (error) {
      throw new Error(`Failed to add order: ${error.message}`);
    }
  }

  async cancelOrder(orderId: string) {
    try {
      await this.requestService.cancelOrder(orderId);
      this.logger.log(new Date().toUTCString(), 'Canceled order ', orderId);
    } catch (error) {
      this.logger.error(`Failed to cancel order: ${error.message}`);
    }
  }
}
