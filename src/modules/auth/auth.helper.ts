import * as jwt from 'jsonwebtoken';
import { Config } from '../../config';

export class AuthHelper {

/*******************************************************
 * Return a Jwt Token
 *******************************************************/
    public setToken(user) {
      console.log(user[0].user_email)
      return {
        token: jwt.sign ({
          id: user[0].id_user,
          email: user[0].user_email,
          role: user[0].user_rol,
          exp: Math.round(new Date().getTime() / 1000) + 604800 // 1 week
        }, Config.secret)
      }
  }

}