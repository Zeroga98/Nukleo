import * as mysql from 'mysql';
import { Config } from './index';

export const db = ()=>{
  return mysql.createPool(Config.db)
  .on('connection', function(connection) {
    console.log(connection.threadId)
   }) 
}