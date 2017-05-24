import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { db } from "../../database";

@Component()
export class UserService {
    private users = [
        { 'id': 1, 'name': "John Doe" },
        { 'id': 2, 'name': "Alice Caeiro" },
        { 'id': 3, 'name': "Who Knows" },
    ];
    getAllUsers() {
        return new Promise ((resolve, reject)=>{
            db().query(
                'SELECT * FROM user',(err, result)=>{
                    return !err?
                    resolve(result):
                    reject(new HttpException(err, 500));
                }
            )
        });
    }
    getUser(id: number) {
        return new Promise ((resolve, reject)=>{
            db().query(
                'SELECT * FROM user WHERE id_user = ?', [id] ,(err, result)=>{
                    return !err?
                    resolve(result):
                    reject(new HttpException(err, 500));
                }
            )
        });
    }
    deleteUser(id: number) {
       return new Promise ((resolve, reject)=>{
            db().query(
                'DELETE  FROM user WHERE id_user = ?', [id] ,(err, result)=>{
                    return !err?
                    resolve('Usuario Eliminado'):
                    reject(new HttpException(err, 500));
                }
            )
        });
    }
}
