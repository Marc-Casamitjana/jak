var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('add-message', (msg) => {
    io.emit('new-message', msg);
    console.log('message:', msg);
    
  });
});

app.get('/', function (req, res) {
  res.send('<h1>Hello world</h1>');
});

app.get('/connect', function (req, res) {
  console.log('aaa')
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});