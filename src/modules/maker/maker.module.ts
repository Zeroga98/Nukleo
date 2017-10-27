import { Module, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import { AuthMiddleware } from '../core/auth/auth.middleware';

/*********************************************************************
 * Controllers
 *********************************************************************/
 import { DevicesController } from './devices/devices.controller';
 import { ModelsController } from './models/models.controller';


/*********************************************************************
 * Components (Services, helpers, etc)
 *********************************************************************/
import { DevicesService } from './devices/devices.service';
import { ModelsService } from './models/models.service';

@Module({
  controllers: [ DevicesController, ModelsController ],
  components: [ DevicesService, ModelsService ]
})
export class MakerModule {
  configure (consumer: MiddlewaresConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
    	{ path: '/maker/devices/get-all', method: RequestMethod.GET },

        { path: '/maker/models/get-all', method: RequestMethod.GET },
        { path: '/maker/models/signup', method: RequestMethod.POST },
        { path: '/maker/models/add-actions', method: RequestMethod.POST },
   	)
  }
}