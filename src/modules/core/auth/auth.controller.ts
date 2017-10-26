import { Controller, Post, Delete, Request, Response, Body, HttpStatus } from '@nestjs/common'
import { LoginService } from './login.service';
import { SignUpService } from "./signup.service";

@Controller()

export class AuthController {

  constructor(
    private loginService: LoginService,
    private signupService: SignUpService
  ) {}
  
  @Post('/login')
  public async login(@Response() res, 
    @Body('email') email, 
    @Body('password') password
  ) {
    const auth = await this.loginService.login(email, password)
    res.status(HttpStatus.OK).json(auth)
  }

  @Post('/signup')
  public async signUp (
    @Response() res,
    @Body('email') email,
    @Body('password') password,
    @Body('username') username
  ) {
    const response = await this.signupService.signUpCustomer(email, password, username)
    res.status(HttpStatus.OK).json(response)
  }

  @Post('/request')
  public async signUpMaker (
    @Response() res,
    @Body('email') email,
    @Body('password') password,
    @Body('name') name,
    @Body('address') adress,
    @Body('phone') phone,
    @Body('logo') logo,
    @Body('description') description
  ) {
    const auth = await this.signupService.signUpMaker (email, password, name, adress, phone, description, logo)
    res.status (HttpStatus.OK).json(auth)
  }

}