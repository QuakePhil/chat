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

// create the server
wss = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wss.on('request', function(request) {
  console.log('Request');
  var connection = request.accept(null, request.origin);

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      // process WebSocket message
      chat.update(request, message);
    }
  });

  connection.on('close', function(connection) {
    console.log('Connection closed', connection);
    // close user connection
  });
});

