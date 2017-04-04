'use strict'

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const messages = [
    "Hello There",
    "Pesan Random #2",
    "Pesan Random #3",
    "Pesan Random #4",
    "Pesan Random #5",
    "Harry Ganteng",
    "Pesan Random #7",
    "Pesan Random #8",
];

server.listen(3100, '0.0.0.0');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.emit('connected', { msg: "Terkoneksi dengan server" });

    socket.on('pinged', () => {
        const idx = Math.floor(Math.random() * messages.length);

        socket.emit('connected', { msg: messages[idx] });

        console.log('pesan yang dikirim ke client: ', { msg: messages[idx] })
    })

    console.log('Ada koneksi baru');
});


