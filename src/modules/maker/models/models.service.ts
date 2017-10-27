import { Component } from '@nestjs/common'
import { HttpException } from '@nestjs/core'
import { db } from '../../../config/db.connection'
import * as async from 'async'

@Component()
export class ModelsService {

  public getAll(apikey: String){
    return new Promise((resolve, reject) => {
      db().query(
        "SELECT " +
        "mdl.*, " +
        "COUNT(d.id_device) as total_devices " +
        "FROM user u " +
        "inner join maker m on u.id_user = m.fk_user " +
        "left join model mdl on mdl.fk_maker = m.id_maker " +
        "left join device d on d.fk_model = mdl.id_model " +
        "where u.user_apikey = ? " + 
        "GROUP BY mdl.id_model", apikey, (err, result) => {
          return !err
            ? resolve(result)
            : reject(new HttpException(err, 500))
        }
      )
    })
  }

  public getDetail(modelId: String) {
    return new Promise((resolve, reject) => {
      db().query(
        "SELECT " +
        "mdl.*, " +
        "f.*, " +
        "GROUP_CONCAT(a.action_name, ',') as action_name, " +
        "GROUP_CONCAT(a.value, ',') as action_value " +
        "FROM model mdl " +
        "left join firmware f on f.fk_model = mdl.id_model " +
        "left join action a on a.fk_model = mdl.id_model " +
        "where mdl.id_model = ? " + 
        "GROUP BY mdl.id_model, f.id_firmware", modelId, (err, result) => {
          result[0].actions = this.parseGroupConcats(result[0], ["action_name", "action_value"]);
          return !err
            ? resolve(result)
            : reject(new HttpException(err.message, 500))
        }
      )
    })
  }

  public insert(apikey: string, version: string, img: string, description: string){
    return new Promise((resolve, reject) => {
      db().query(
        "INSERT INTO model (fk_maker, model_version, model_img, model_description) " +
        "VALUES " +
        "((SELECT m.id_maker FROM user u INNER JOIN maker m ON m.fk_user = u.id_user WHERE u.user_apikey = ?), " + 
        "?, ?, ?) ", [apikey, version, img, description], (err, result) => {
          return !err
            ? resolve({ id_model: result.insertId })
            : reject(new HttpException(err.message, 500))
        }
      )
    })
  }

  private parseGroupConcats(data: any, fields: any){
    let parse = [];
    for (let i = 0; i < fields.length; ++i) {
      let array = data[fields[i]].split(",");
      array = array.filter(arr => {
        return arr.length > 0
      });

      for (let j = 0; j < array.length; ++j) {
        if(!parse[j]){
          let json = {};
          json[fields[i]] = array[j];
          parse.push(json);
        } else {
          parse[j][fields[i]] = array[j];
        }
      }
    }
    return parse;
  }

} 