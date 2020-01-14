import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { CatsModule } from './modules/cats/cats.module'
import { DatabaseModule } from './modules/database/database.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import conf from '../config'


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'static'),
      // rootPath: `${conf.root}/static`,
    }),
    // TypeOrmModule.forRoot(), 
    CatsModule,
    // DatabaseModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
      )
      .forRoutes('cats');
  }
}
