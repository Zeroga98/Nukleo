import { Controller, Get, Delete, Request, Response, Param, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private usersService: UserService) {}

    @Get()
    async getAllUsers (@Response() res) {
      const users = await this.usersService.getAllUsers()
      res.status(HttpStatus.OK).json(users)
    }

    @Get('/:id')
    async getUser (@Response() res,
                              @Param('id') id) {       
      const user = await this.usersService.getUser(id)
      res.status(HttpStatus.OK).json(user)
    }

    @Delete('/:id')
    async deleteUser (@Response() res,
                                   @Param('id') id) {       
      const user = await this.usersService.deleteUser(id)
      res.status(HttpStatus.OK).json(user)
    }
}
