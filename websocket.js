const fs = require('fs'),
  https = require('https'),
  chat = require.main.require('./chat'),
  WebSocketServer = require('websocket').server;

const options = {
  key: fs.readFileSync('config/privkey.pem').toString(),
  cert: fs.readFileSync('config/cert.pem').toString()
};

var server = https.createServer(options).listen(1337, function() {
  console.log('Listening');
});

wss = new WebSocketServer({ httpServer: server });

wss.on('request', function(request) {
  console.log('Request');
  var connection = request.accept(null, request.origin);

  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      chat.update(request, message.utf8Data);
    }
  });

  connection.on('close', function(connection) {
    console.log('Connection closed', connection);
    // close user connection
  });
});

