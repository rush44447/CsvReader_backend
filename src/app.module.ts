import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppLogger } from './utils/app.logger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './utils/response.interceptor';
import { UserModule } from './models/reader/user.module';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'qwerty',
        database: 'public',
        logging: !!process.env.DB_LOGGING,
        entities: [__dirname + '/models/**/*.entity{.ts,.js}'],
      }),
    }),
    MulterModule.register({
      dest: './uploads', // Destination folder for uploaded files
    }),
    UserModule,],
  controllers: [AppController],
  providers: [AppService, {
    provide: Logger,
    useClass: AppLogger,
  }, {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule { }
