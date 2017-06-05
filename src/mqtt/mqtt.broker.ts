import * as mosca from 'mosca';

import { Server, CustomTransportStrategy } from '@nestjs/microservices';
import { Observable } from 'rxjs/Observable';

export class MqttBroker extends Server implements CustomTransportStrategy {
    private broker = null;

    constructor(
        private readonly puerto: string, 
        private readonly socket: string ) {
            super();
        }

    public async listen(callback: () => void) {
      await this.init()
    }

    public close() {}

    private handleMessage(message) {}

    private sendMessage(message) {}

    private async init() {

      // Acepta la conexión si el usuario y contraseña son válidos
      var authenticate = function(client, username, password, callback) {
        var authorized = (username === '1000003' && password.toString() === '25bd95c4-484a-11e7-8835-0242ac110002');
        console.log(authorized);

        if (authorized) client.user = username;
        callback(null, authorized);
      }

// In this case the client authorized as alice can publish to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
var authorizePublish = function(client, topic, payload, callback) {

  callback(null, client.user == topic.split('/')[1]);
}

// In this case the client authorized as alice can subscribe to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
var authorizeSubscribe = function(client, topic, callback) {
        console.log(topic.split('/')[1])

  callback(null, client.user == topic.split('/')[1]);
}

var server = new mosca.Server({
        port: 1883, 
        http: {
            port: 4000,
            bundle: true,
            static: './src/mqtt/public'
        }
    });
server.on('ready', setup);

  function setup() {
     console.log("conectado mqtt")
    server.authenticate = authenticate;
    server.authorizePublish = authorizePublish;
    server.authorizeSubscribe = authorizeSubscribe;
  }

 
      server.on('clientConnected', function (client) {
        console.log('Client connected', client.id)
      })

    }
} 