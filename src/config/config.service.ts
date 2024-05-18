import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get inxApiKey(): string {
    return this.configService.get<string>('INX_API_KEY');
  }

  get signedContext(): string {
    return this.configService.get<string>('INX_SIGNED_CONTEXT');
  }
}
