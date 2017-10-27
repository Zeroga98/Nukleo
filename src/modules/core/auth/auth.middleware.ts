import { Middleware, NestMiddleware } from '@nestjs/common'
import { Config } from '../../../config'
import { db } from '../../../config/db.connection'
import * as jwt from 'jsonwebtoken'

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}
  resolve() {
    return(req, res, next) => {
      if(req.headers.authorization && req.headers.authorization.split (' ')[0] === 'Bearer') {
        let token = req.headers.authorization.split (' ')[1]
        jwt.verify(token, Config.SECRET, function(err, payload) {
          if(!err) {
            req.apikey = payload.id; 
            next();
          } 
          else {
            return res.status(403).json(err)
          }
        })
      } else {
          return res.status(401).json('Usted debe proveer un token de autenticación válido.');
        }
    }
  }     
}