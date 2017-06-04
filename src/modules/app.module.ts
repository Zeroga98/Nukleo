import { Module } from '@nestjs/common';
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { DeviceModule } from "./shared/device/device.module";

@Module({
     modules: [ 
         UserModule,
         AuthModule,
         DeviceModule
      ]
})
export class ApplicationModule { }