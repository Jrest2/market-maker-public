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
var RequestService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_service_1 = require("../config/config.service");
const rxjs_1 = require("rxjs");
let RequestService = RequestService_1 = class RequestService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.logger = new common_1.Logger(RequestService_1.name);
    }
    async placeOrder(orderDetails) {
        const url = 'https://gw-client-api-rest.inx.co/api/order/addLimitOrder';
        try {
            return await this.sendPost(url, orderDetails);
        }
        catch (error) {
            this.logger.error(`Failed to place order: ${error.message}`);
            throw error;
        }
    }
    async cancelOrder(orderId) {
        const url = 'https://gw-client-api-rest.inx.co/api/order/cancelOrder';
        try {
            return await this.sendPost(url, { orderId });
        }
        catch (error) {
            this.logger.error(`Failed to cancel order ${orderId}: ${error.message}`);
            throw error;
        }
    }
    async sendPost(url, payload) {
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.post(url, payload, {
                headers: this.getHeaders(),
            }));
            return response.data;
        }
        catch (error) {
            this.logger.error(`Failed to place order: ${error.message}`);
            throw error;
        }
    }
    getHeaders() {
        return {
            nonce: new Date().getTime(),
            timestamp: new Date().getTime(),
            apiKeyId: this.apiKeyId,
            signedContext: this.signedContext,
        };
    }
    get apiKeyId() {
        return this.configService.inxApiKey;
    }
    get signedContext() {
        return this.configService.signedContext;
    }
};
exports.RequestService = RequestService;
exports.RequestService = RequestService = RequestService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_service_1.ConfigService])
], RequestService);
//# sourceMappingURL=request.service.js.map