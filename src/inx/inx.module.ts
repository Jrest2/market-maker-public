import { Module } from '@nestjs/common';
import { InxService } from './inx.service';
import { PriceFeedStub } from "./price-feed.stub";
import { HedgingStub } from "./hedging.stub";

@Module({
  providers: [
    InxService,
    { provide: 'PriceFeed', useClass: PriceFeedStub },
    { provide: 'Hedging', useClass: HedgingStub },
  ],
  exports: [InxService],
})
export class InxModule {}
