const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let count = 0

 app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    socket.on("restart",()=>{
        count=0
        socket.emit("count-value",count)
    })
    socket.on("new-value",()=>{
        count++
        socket.emit("count-value",count)
    })
    
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});