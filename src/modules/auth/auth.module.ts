import { Module } from '@nestjs/common';
import { AuthController } from "./auth.controller";
import { LoginService } from "./login.service";

@Module({
     controllers: [ AuthController ],
     components: [ LoginService ]
})
export class AuthModule { }