import { NestFactory } from '@nestjs/core'
import { ApplicationModule } from './app.module'
import { MqttBroker } from './mqtt/mqtt.broker'

import { Config } from './config'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

async function bootstrap() {

  	const app = await NestFactory.create(ApplicationModule);
	const mqtt = app.connectMicroservice({
	  strategy: new MqttBroker(Config.MQTT_PORT, Config.SOCKET_PORT),
	});

  	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cors());
	await app.startAllMicroservicesAsync();
  	await app.listen(Config.PORT, () => console.log(`Application is listening on port ${Config.PORT}`));
}
bootstrap();