import { Module, MiddlewaresConsumer } from '@nestjs/common';
import { AuthMiddleware } from '../core/auth/auth.middleware';

/*********************************************************************
 * Controllers
 *********************************************************************/
 import { DevicesController } from './devices/devices.controller';


/*********************************************************************
 * Components (Services, helpers, etc)
 *********************************************************************/
import { DevicesService } from './devices/devices.service';

@Module({
  controllers: [ DevicesController ],
  components: [ DevicesService ]
})
export class CustomerModule {
  configure (consumer: MiddlewaresConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(DevicesController)
  }
}