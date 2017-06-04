import { Component } from '@nestjs/common'
import { HttpException } from '@nestjs/core'
import { AuthHelper } from './auth.helper'
import { db } from '../../config/db.connection'
import * as bcrypt  from 'bcryptjs'

@Component()
export class LoginService {

  constructor (
    private authHelper: AuthHelper
  ){}

/*******************************************************
* Basic Login with credentials
*******************************************************/
  public login(email, password) {

    if (!email){
      return(new HttpException ("El email es requerido", 422))
    }
    if (!password){
      return(new HttpException ("Porfavor escriba su contraseña", 422))
    }
    return new Promise ((resolve, reject)=> {
      db().query (
        "SELECT * FROM user where user_email = ?", [email], (err, user)=> {
          if (err) {
            return reject (new HttpException(err, 503))
          } else {
            if (user.length === 0) {
              return reject (new HttpException ('El usuario no existe', 401))
            } else {
              if (!bcrypt.compareSync(password, user[0].user_password)) {
                  return reject (new HttpException ('Contraseña incorrecta', 401 ))
              } else
              return resolve(this.authHelper.setToken(user))
            }
          }
        }
       )
    })
  }
}