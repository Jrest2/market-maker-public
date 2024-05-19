"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var InxService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InxService = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../config/config.service");
const request_service_1 = require("./request.service");
const WebSocket = require("ws");
let InxService = InxService_1 = class InxService {
    constructor(priceFeed, hedging, configService, requestService) {
        this.priceFeed = priceFeed;
        this.hedging = hedging;
        this.configService = configService;
        this.requestService = requestService;
        this.logger = new common_1.Logger(InxService_1.name);
    }
    subscribeOrderBooks() {
        const wsUrl = 'wss://gw-client-api-ws.inx.co/orderBook/subscribeOrderBook';
        this.ws = new WebSocket(wsUrl);
        this.ws.on('open', () => {
            this.logger.log('Connected to INX order books WebSocket');
        });
        this.ws.on('message', (data) => {
            const message = JSON.parse(data);
            this.logger.log(new Date().toUTCString(), 'New order via WS order book channel: ', message);
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
        const wsUrl = 'wss://gw-client-api-ws.inx.co/tradeReport/subscribeTradeReport';
        this.ws = new WebSocket(wsUrl);
        this.ws.on('open', () => {
            this.logger.log('Connected to INX trade report WebSocket');
        });
        this.ws.on('message', (data) => {
            const message = JSON.parse(data);
            this.logger.log(new Date().toUTCString(), 'New trade report via WS: ', message);
        });
        this.ws.on('error', (error) => {
            this.logger.error(`WebSocket error: ${error.message}`);
        });
        this.ws.on('close', () => {
            this.logger.log('Disconnected from INX trade report WebSocket');
        });
    }
    async addOrder(marketName, side, amount, price, externalOrderId) {
        try {
            const orderDetails = { marketName, amount, side, price, externalOrderId };
            const result = await this.requestService.placeOrder(orderDetails);
            this.logger.log(new Date().toUTCString(), 'Added order result', result);
            return result;
        }
        catch (error) {
            throw new Error(`Failed to add order: ${error.message}`);
        }
    }
    async cancelOrder(orderId) {
        try {
            await this.requestService.cancelOrder(orderId);
            this.logger.log(new Date().toUTCString(), 'Canceled order ', orderId);
        }
        catch (error) {
            this.logger.error(`Failed to cancel order: ${error.message}`);
        }
    }
};
exports.InxService = InxService;
exports.InxService = InxService = InxService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object, Object, config_service_1.ConfigService,
        request_service_1.RequestService])
], InxService);
//# sourceMappingURL=inx.service.js.map