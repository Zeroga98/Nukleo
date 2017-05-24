import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { db } from "../../database";

@Component()
export class LoginService {
  
    login(email: string , password: string) {
        return new Promise ((resolve, reject)=>{
            db().query(
                'SELECT * FROM user where user_email = ?' [email],(err, user)=>{
                    if (err) {
                        return reject(new HttpException(err, 503));                        
                    }else {
                        if (user.length === 0) {
                            return reject( new HttpException('El usuario no existe',401));
                        }else{
                            if (user[0].password!=password) {
                                return reject( new HttpException('Contraseña incorrecta',401 ));
                            }else
                            resolve(user);
                        }
                    }
                    
                }
            )
        });
    }
    
    
}
