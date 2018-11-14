/*server.js*/
const express = require('express');
const https = require('https');
const fs = require('fs');

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem')

const options = {
  key: sslkey,
  cert: sslcert
};

const app = express();
const server = https.createServer(options, app);
const io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  const socketid = socket.id;
  console.log('user is connected with session id: ' + socketid);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('message', (jsonMsg) => {
    console.log('received message from the client: ' + JSON.stringify(jsonMsg));
    socket.$broadcast.emit('message', jsonMsg);
  })
});

server.listen(3000);

/*
const server = https.createServer(function (req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
server.listen(port, hostname, function () {
  console.log('Server running at https://' + hostname + ':' + port + '/');
});*/
