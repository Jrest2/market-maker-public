"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InxModule = void 0;
const common_1 = require("@nestjs/common");
const inx_service_1 = require("./inx.service");
const price_feed_stub_1 = require("./stubs/price-feed.stub");
const hedging_stub_1 = require("./stubs/hedging.stub");
let InxModule = class InxModule {
};
exports.InxModule = InxModule;
exports.InxModule = InxModule = __decorate([
    (0, common_1.Module)({
        providers: [
            inx_service_1.InxService,
            { provide: 'PriceFeed', useClass: price_feed_stub_1.PriceFeedStub },
            { provide: 'Hedging', useClass: hedging_stub_1.HedgingStub },
        ],
        exports: [inx_service_1.InxService],
    })
], InxModule);
//# sourceMappingURL=inx.module.js.map