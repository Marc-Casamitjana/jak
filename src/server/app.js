const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

io.on('connection', function (socket) {
  console.log(`user ${socket.id} connected`);
  // socket.join(`${socket.id}`, () => {
    console.log(Object.keys(socket.rooms));

  // });

  socket.on('say to someone', (msg, id) => {
    console.log('messag', msg, id);
    
    // send a private message to the socket with the given id
    // socket.to(id).emit('my message', msg);
  });

  socket.on('add-message', (msg) => {  
    console.log(msg);
    msg.time = new Date();
    io.emit('new-message', msg);
  });
});

app.get('/connect', function (req, res) {
  console.log('aaa')
});

app.get('/login', function (req, res) {
  console.log(req);
  
});

http.listen(3000, () => {
  console.log('server listening to 3000')
});