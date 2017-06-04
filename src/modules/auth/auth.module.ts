import { Module } from '@nestjs/common';
import { AuthController } from "./auth.controller";
import { LoginService } from "./login.service";
import { SignUpService } from './signup.service';
import { PasswordService } from './password.service';
import { AuthHelper } from './auth.helper';

@Module({
  controllers: [ AuthController ],
  components: [ LoginService, SignUpService, PasswordService, AuthHelper ]
})
export class AuthModule {}
