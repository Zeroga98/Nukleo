import { Module, MiddlewaresConsumer } from '@nestjs/common';
import { AuthMiddleware } from '../../auth/auth.middleware';
import { DeviceController } from "./device.controller";
import { DeviceService } from "./device.service";

@Module({
  controllers: [ DeviceController ],
  components: [ DeviceService ]
})
export class DeviceModule {
  configure (consumer: MiddlewaresConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(DeviceController)
  }
}