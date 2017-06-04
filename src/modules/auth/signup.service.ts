import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { AuthHelper } from './auth.helper';
import { db } from '../../config/db.connection'
import * as bcrypt  from 'bcryptjs'

console.log(db);
@Component()
export class SignUpService {

    constructor (
      private authHelper: AuthHelper
    ){}
    
/*********************************************************************
 * Register User 'customer'
 *********************************************************************/
    public signUpCustomer (email: String, password: String, username: String) {
      
        return new Promise ((resolve, reject) => {
        db().query(
          'CALL customer_signup(?, ?, ?)', [email, bcrypt.hashSync (password, 10), username], (err, result)=> {
            return !err
            ? resolve (result)
            : reject (new HttpException (err.message, 500))
          }
        )
      })
    }

/*********************************************************************
 * Register User 'maker'
 *********************************************************************/
    public signUpMaker (email: String, password: String, name: String, adress: String, phone: String, logo: String) {
      
        return new Promise ((resolve, reject) => {
        db().query(
          'CALL maker_signup(?, ?, ?)', [email, bcrypt.hashSync (password, 10), name, adress, phone, logo], (err, result)=> {
            return !err
            ? resolve (result)
            : reject (new HttpException (err.message, 500))
          }
        )
      })
    }
}