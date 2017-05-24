import { Module } from '@nestjs/common';
import { UsersController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
     controllers: [ UsersController ],
     components: [ UserService ]
})
export class UserModule { }