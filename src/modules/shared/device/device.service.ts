import { Component } from '@nestjs/common'
import { HttpException } from '@nestjs/core'
import { db } from '../../../config/db.connection'

@Component()
export class DeviceService {

/*******************************************************
 * Get all Devices
 *******************************************************/
    getAllDevices () {
      return new Promise ((resolve, reject) => {
        db().query(
          'SELECT * FROM device', (err, result)=> {
            return !err
            ? resolve (result)
            : reject (new HttpException (err, 500))
          }
        )
      })
    }

/*******************************************************
 * Get One Device by Id
 *******************************************************/
    getDevice (id: number) {
      return new Promise ((resolve, reject)=> {
        db().query(
          'SELECT * FROM device WHERE device_id = ?', [id], (err, result)=> {
            return !err
            ? resolve (result)
            : reject (new HttpException (err, 500))
          }
        )
      })
    }

/*******************************************************
 * Update Device
 *******************************************************/




/*******************************************************
 * Delete Device by id
 *******************************************************/
    deleteDevice (id: number) {
      return new Promise ((resolve, reject)=> {
        db().query(
          'DELETE  FROM device WHERE device_id = ?', [id], (err, result)=> {
            return !err
            ? resolve ('Dispositivo Eliminado')
            : reject (new HttpException (err, 500))
          }
        )
      })
    }
    
}