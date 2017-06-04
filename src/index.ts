import { NestFactory } from '@nestjs/core'
import { ApplicationModule } from './modules/app.module'
import { Config } from './config'
import * as express from 'express'
import * as bodyParser from 'body-parser'

const server = express ()
server.use (bodyParser.json ())
server.use (bodyParser.urlencoded ({ extended: false }))

const app = NestFactory.create (ApplicationModule, server)

app.listen (Config.port, () => console.log (`Application is listening on port ${ Config.port }`))

