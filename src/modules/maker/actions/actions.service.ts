import { Component } from '@nestjs/common'
import { HttpException } from '@nestjs/core'
import { db } from '../../../config/db.connection'
import * as async from 'async'

@Component()
export class ActionService {

  public signup(fk_model: string, action_name: string, action_value: string){
    return new Promise((resolve, reject) => {
      db().query(
        "INSERT INTO action (fk_model, action_name, value) " +
        "VALUES " +
        "(?, ?, ?) ", [fk_model, action_name, action_value], (err, result) => {
          return !err
            ? resolve({ id_action: result.insertId })
            : reject(new HttpException(err.message, 500))
        }
      )
    })
  }

  public delete(action_id: string){
    return new Promise((resolve, reject) => {
      db().query(
        "DELETE FROM action WHERE id_action = ?", [action_id], (err, result) => {
          return !err
            ? resolve({ state: "OK" })
            : reject(new HttpException(err.message, 500))
        }
      )
    })
  }

}