import { NestFactory } from '@nestjs/core'
import { ApplicationModule } from './app.module'
import { MqttBroker } from './mqtt/mqtt.broker'

import { Config } from './config'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

const server = express ()
server.use (bodyParser.json ())
server.use (bodyParser.urlencoded ({ extended: false }))
server.use(cors())

const app = NestFactory.create (ApplicationModule, server)

const mqtt = app.connectMicroservice({
  strategy: new MqttBroker(Config.MQTT_PORT, Config.SOCKET_PORT),
});
app.startAllMicroservices(() => console.log('All microservices are listening...'));
app.listen (Config.PORT, () => console.log (`Application is listening on port ${ Config.PORT }`))