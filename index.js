var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var contar = 0;
var jogador = 0;

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  contar++;
  jogador++;
  io.emit('contar', contar);
  io.emit('jogador', jogador);
  
  socket.on('disconnect', function() {
	  contar--;
	  io.emit('contar', contar);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});