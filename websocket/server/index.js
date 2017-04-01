'use strict'

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3100, '0.0.0.0');

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.emit('connected', { hello: 'Hello, Selamat Datang' });

    console.log('Isi dari pesan pas tombol ditekan: ', data);

    socket.on('tombol ditekan', function (data) {
        console.log('Isi dari pesan pas tombol ditekan: ', data);
    });
});

