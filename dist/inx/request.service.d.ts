import { HttpService } from '@nestjs/axios';
import { ConfigService } from '../config/config.service';
export declare class RequestService {
    private readonly httpService;
    private readonly configService;
    private readonly logger;
    constructor(httpService: HttpService, configService: ConfigService);
    placeOrder(orderDetails: any): Promise<any>;
    cancelOrder(orderId: string): Promise<any>;
    private sendPost;
    private getHeaders;
    private get apiKeyId();
    private get signedContext();
}
