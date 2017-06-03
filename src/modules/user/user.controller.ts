import { Controller, Get, Delete, Request, Response, Param, Body, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service'

@Controller('users')
export class UsersController {

    constructor(
        private userService: UserService
        ){}


    @Get()
    public async getAllUsers(@Response() res) {
        let users = await this.userService.getAllUsers();
        res.status(HttpStatus.OK).json(users);
    }

    @Get('/:id')
    async getUser(@Response() res, @Param('id') id ) {
        console.log(id);
        let user = await this.userService.getUser(id)
        res.status(HttpStatus.OK).json(user);
    }


    @Delete('/:id')    
     async deleteUser (@Response() res, @Param('id') id ) {
        let user = await this.userService.deleteUser(id)
        res.status(HttpStatus.OK).json(user);
    }
    
}