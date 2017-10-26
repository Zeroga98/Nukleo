import { Component } from '@nestjs/common'
import { HttpException } from '@nestjs/core'
import { db } from '../../../config/db.connection'
import * as async from 'async'

@Component()
export class DevicesService {


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

  /*******************************************************
   * Get My Devices
   *******************************************************/
  getMyDevices(apikey) {
    return new Promise((resolve, reject) => {
      db().query(
        'SELECT ' +
        'd.id_device AS id, ' +
        'd.device_name AS name, ' +
        'm.model_version AS model, ' +
        'm.model_img AS image ' +
        'FROM ' +
        'acl l ' +
        'INNER JOIN device d ON l.fk_devices = d.id_device ' +
        'INNER JOIN model m ON m.id_model = d.fk_model ' +
        'WHERE ' +
        'l.fk_customer = ( ' +
        'SELECT ' +
        'p.id_customer ' +
        'FROM ' +
        'user c ' +
        'INNER JOIN customer p ON p.fk_user = c.id_user ' +
        'WHERE ' +
        'c.user_apikey = ? );', apikey, (err, result) => {
          return !err
            ? resolve(result)
            : reject(new HttpException(err, 500))
        }
      )
    })
  }

  /*******************************************************
   * Get One Device by Id
   *******************************************************/
  getDevice(apikey: string, deviceId: number) {
    return new Promise((resolve, reject) => {
      db().query(
        'SELECT * ' +
        'FROM ' +
        'device_detaild ' +
        'WHERE ' +
        'device_detaild.fk_customer = ( ' +
        'SELECT ' +
        'p.id_customer ' +
        'FROM ' +
        'user c ' +
        'INNER JOIN customer p ON p.fk_user = c.id_user ' +
        'WHERE ' +
        'c.user_apikey = ?) ' +
        'and device_detaild.id_device= ?;', [apikey, deviceId], (err, result) => {
          if (err) reject(new HttpException(err, 500));
          else async.map(result, getActions, function(err, devices) {
            resolve((devices));
          });
        }
      )
    })

    function getActions(device, callback) {
      db().query(
        "select * from action " +
        "where action.fk_model= ( " +
        "SELECT " +
        "p.fk_model " +
        "FROM " +
        "model c " +
        "INNER JOIN device p ON p.fk_model = c.id_model " +
        "WHERE " +
        "p.id_device = ? )", [device.id_device], function(err, actions) {
          if (err) return callback(err);
          device.actions = actions;
          callback(null, device);
        });
    }
  }


  /*******************************************************
   * Delete Device by id
   *******************************************************/
  deleteDevice(id: number) {
    return new Promise((resolve, reject) => {
      db().query(
        'DELETE  FROM device WHERE device_id = ?', [id], (err, result) => {
          return !err
            ? resolve('Dispositivo Eliminado')
            : reject(new HttpException(err, 500))
        }
      )
    })
  }

  public async getDeviceActions(device_id: number){
    return new Promise((resolve, reject) => {
      db().query(
        `SELECT *
        FROM device d
        left join event e on e.fk_deviceExec = d.id_device
        left join action a on e.fk_actionExec = a.id_action
        where d.id_device = ?`, [device_id], (err, result) => {
          return !err
            ? resolve('Dispositivo Eliminado')
            : reject(new HttpException(err, 500))
        }
      )
    })
  }

}