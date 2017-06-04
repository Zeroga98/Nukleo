import { Component } from '@nestjs/common'
import { HttpException } from '@nestjs/core'
import { db } from '../../config/db.connection'

@Component()
export class UserService {

/*******************************************************
 * Get all Users
 *******************************************************/
    getAllUsers() {
      return new Promise ((resolve, reject) => {
        db().query(
          'SELECT * FROM user', (err, result)=> {
            return !err
            ? resolve (result)
            : reject (new HttpException (err, 500))
          }
        )
      })
    }

/*******************************************************
 * Get One User by Id
 *******************************************************/
    getUser(id: number) {
      return new Promise ((resolve, reject)=> {
        db().query(
          'SELECT * FROM user WHERE id_user = ?', [id], (err, result)=> {
            return !err
            ? resolve (result)
            : reject (new HttpException (err, 500))
          }
        )
      })
    }

/*******************************************************
 * Update User
 *******************************************************/




/*******************************************************
 * Delete User by id
 *******************************************************/
    deleteUser (id: number) {
      return new Promise ((resolve, reject)=> {
        db().query(
          'DELETE  FROM user WHERE id_user = ?', [id], (err, result)=> {
            return !err
            ? resolve ('Usuario Eliminado')
            : reject (new HttpException (err, 500))
          }
        )
      })
    }
    
}