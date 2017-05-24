import { HttpException } from '@nestjs/core';
import { Middleware, NestMiddleware } from '@nestjs/common';
import { UsersService } from './users.service';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) {}

    resolve(): (req, res, next) => void {
        return async (req, res, next) => {
            const userName = req.headers["x-access-token"];
            const users = await this.usersService.getAllUsers();

            const user = users.find((user) => user.name === userName);
            if (!user) {
                throw new HttpException('User not found.', 401);
            }
            req.user = user;
            next();
        }
    }
}