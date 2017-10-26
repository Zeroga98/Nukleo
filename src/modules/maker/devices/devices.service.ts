import { Component } from '@nestjs/common'
import { HttpException } from '@nestjs/core'
import { db } from '../../../config/db.connection'
import * as async from 'async'

@Component()
export class DevicesService {

  public getAll(apikey: String){
    return new Promise((resolve, reject) => {
      db().query(
        "SELECT " +
        "mdl.*, " +
        "d.* " +
        "FROM user u " +
        "inner join maker m on u.id_user = m.fk_user " +
        "left join model mdl on mdl.fk_maker = m.id_maker " +
        "left join device d on d.fk_model = mdl.id_model " +
        "where u.user_apikey = ?;", apikey, (err, result) => {
          return !err
            ? resolve(result)
            : reject(new HttpException(err, 500))
        }
      )
    })
  }

  /*********************************************************************
   * Pair a device
   *********************************************************************/
  public pairDevice(device: String, apikey: String, latitude: String, longitude: String) {

    return new Promise((resolve, reject) => {
      db().query(
        'CALL pairing(?, ?, ?,?)', [device, apikey, latitude, longitude], (err, result) => {
          return !err
            ? resolve({ 'message': 'Dispositivo emparejado' })
            : reject(new HttpException(err.message, 500))
        }
      )
    })
  }

}