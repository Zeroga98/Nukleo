import { Controller, Get, Post, Delete, Request, Response, Body, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service'

@Controller('auth')
export class AuthController {

    constructor(
        private loginService: LoginService
        ){}


    @Post('/login')
    public async Login(@Response() res, @Body('email') email) {
                                 console.log(email);
        /*let users = await this.loginService.login(email, password);*/
        res.status(HttpStatus.OK).json("");
    }
}