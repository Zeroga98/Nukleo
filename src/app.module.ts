import { Module } from '@nestjs/common'
import { CoreModule } from './modules/core/core.module'
import { CustomerModule } from './modules/customer/customer.module'
import { MakerModule } from './modules/maker/maker.module'
import { AdminModule } from './modules/admin/admin.module'
import { DatabaseModule } from './modules/database/database.module'

@Module({
  modules: [ 
         CoreModule,
         CustomerModule,
         MakerModule,
         AdminModule,
         DatabaseModule
   ]
})
export class ApplicationModule { }