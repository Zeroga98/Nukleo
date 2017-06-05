  var MQTTWS_BROKER = '127.0.0.1' // IP del Broker MQTT
  var WS_PORT = 4000 // Puerto del WebSocket
  var MQTT = new Paho.MQTT.Client(MQTTWS_BROKER, WS_PORT, 'Domoty-' + new Date().getTime()) // Create MQTT client

  MQTT.onConnectionLost = function (responseObject) {
    console.log('Status: ' + responseObject.errorMessage)
  }

  MQTT.onMessageArrived = function (message) {
    console.log(message.destinationName, ' -- ', message.payloadString)
  }

  function init () {
    MQTT.connect({
      timeout: 3,
      userName: '1000003',
      password: '25bd95c4-484a-11e7-8835-0242ac110002',
      onSuccess: function () {
        console.log('Connected to Broker MQTT')
        MQTT.subscribe('25bd95c4-484a-11e7-8835-0242ac110002/1000003', {qos: 1}) // Subscribe to "domoty/esp8266" Topic
      },
      onFailure: function (message) {
        console.log('Fail connection: ' + message.errorMessage)
      }
    })
  }

  $(document).ready(function () {
    $('#btn-on').click(function () { // Event: Switch ON
      message = new Paho.MQTT.Message('1') // Create Message
      message.destinationName = '25bd95c4-484a-11e7-8835-0242ac110002/1000003' // Destine message to the "domoty/esp8266" Topic
      MQTT.send(message) // Send Message
    })

    $('#btn-off').click(function () { // Event: Switch OFF
      message = new Paho.MQTT.Message('0') // Create Message
      message.destinationName = '25bd95c4-484a-11e7-8835-0242ac110002/1000003' // Destine message to the "domoty/esp8266" Topic
      MQTT.send(message) // Send Message
    })
  })

  init()
