import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '../config/config.service';
import { lastValueFrom } from 'rxjs';
import { AxiosRequestConfig } from "axios";

@Injectable()
export class RequestService {
  private readonly logger = new Logger(RequestService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async placeOrder(orderDetails: any): Promise<any> {
    const url = 'https://gw-client-api-rest.inx.co/api/order/addLimitOrder';

    try {
      return await this.sendPost(url, orderDetails);
    } catch (error) {
      this.logger.error(`Failed to place order: ${error.message}`);
      throw error;
    }
  }

  async cancelOrder(orderId: string): Promise<any> {
    const url = 'https://gw-client-api-rest.inx.co/api/order/cancelOrder';

    try {
      return await this.sendPost(url, { orderId });
    } catch (error) {
      this.logger.error(`Failed to cancel order ${orderId}: ${error.message}`);
      throw error;
    }
  }

  private async sendPost(url: string, payload: unknown): Promise<unknown> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(url, payload, {
          headers: this.getHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to place order: ${error.message}`);
      throw error;
    }
  }

  private getHeaders() {
    return {
      nonce: new Date().getTime(),
      timestamp: new Date().getTime(),
      apiKeyId: this.apiKeyId,
      signedContext: this.signedContext,
    };
  }
  private get apiKeyId(): string {
    return this.configService.inxApiKey;
  }

  private get signedContext(): string {
    return this.configService.signedContext;
  }
}
