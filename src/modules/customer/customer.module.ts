import { Module, MiddlewaresConsumer } from '@nestjs/common';
import { AuthMiddleware } from '../core/auth/auth.middleware';
import { DevicesController } from './devices/devices.controller';
import { DevicesService } from './devices/devices.service';
 import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [ DevicesController ],
  components: [ DevicesService ],
  modules: [ DatabaseModule ]
})
export class CustomerModule {
  configure (consumer: MiddlewaresConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(DevicesController)
  }
}