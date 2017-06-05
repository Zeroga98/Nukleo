import * as jwt from 'jsonwebtoken';
import { Config } from '../../../config';
import { db } from '../../../config/db.connection'

export class AuthHelper {

/*******************************************************
 * Return a Jwt Token
 *******************************************************/
  public setToken(user) {
    return {
      token: jwt.sign ({
        id: user[0].user_apikey,
        email: user[0].user_email,
        role: user[0].user_rol,
        exp: Math.round(new Date().getTime() / 1000) + 604800 // 1 week
      }, Config.SECRET)
    }
  }

}