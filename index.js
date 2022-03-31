const app = require('express')();
const http = require('http').Server(app,{
    transports: ['websocket'] });
const io = require('socket.io')(http);
const port = process.env.PORT || 8585;



io.on('connection', (socket) => {

    console.log("connected");
    // check black list & mark

    socket.on('chat message', msg => {
        console.log('chat message',msg.sender,msg.content);

        let dateNow = Date.now();
        if (dateNow - socket.lastSend >= 5000 || socket.lastSend == undefined) {
            socket.lastSend = dateNow;
            io.emit('chat message', msg);
        }else{
            socket.emit('system message', {"code":2,"content":"Speaking too often"});
        }
    });
});

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
