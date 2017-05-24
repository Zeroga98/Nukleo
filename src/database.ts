import 'dotenv/config';
import * as mysql from 'mysql';
import { Config } from './config';

export const  db =  () =>{
  return mysql.createPool(Config.db);      
  
}

