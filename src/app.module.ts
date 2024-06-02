import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InxModule } from './inx/inx.module';
import { LoggingInterceptor } from './logger/logger.interceptor';
import { WinstonModule } from 'nest-winston';
import { loggerConfig } from './logger/logger.config';

@Module({
  imports: [
    InxModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    WinstonModule.forRoot(loggerConfig),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
