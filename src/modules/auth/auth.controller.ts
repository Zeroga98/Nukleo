import { Controller, Get, Post, Delete, Request, Response, Body, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service'

@Controller()
export class AuthController {

    constructor(
        private loginService: LoginService
        ){}


    @Post('/login')
    public async getAllUsers(@Response() res,
                             @Body('email') email,
                             @Body('password') password) {
        let users = await this.loginService.login(email, password);
        res.status(HttpStatus.OK).json(users);
    }

    
}