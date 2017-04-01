'use strict'

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3100, '0.0.0.0');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.emit('connected', { hello: 'Hello, Selamat Datang' });

    socket.on('connected', msg => {
        console.log('pesan dari client: ', msg)
    })

    console.log('Ada koneksi baru');
});


