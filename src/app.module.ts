import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppLogger } from './utils/app.logger';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ReaderModule } from './models/reader/reader.module';
import { ResponseInterceptor } from './utils/response.interceptor';

dotenv.config({
  path: `./env-setup/.env.${process.env.NODE_ENV || 'dev'}`,
});
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
    useFactory: async () => ({
      type: 'mssql',
      host: 'ECOM-ELPMC-DEV01',
      port: 1433,
      username: 'cs_ELPMC_Dev',
      password: 'xagG|w*mE1-M',
      database: 'elpmc',
      synchronize: false,
      logging: !!process.env.DB_LOGGING,
      entities: [__dirname + '/models/**/*.entity{.ts,.js}'],
    }),
  }), 
    ReaderModule,],
  controllers: [AppController],
  providers: [AppService,{
    provide: Logger,
    useClass: AppLogger,
  },{
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },
],
})
export class AppModule {}
