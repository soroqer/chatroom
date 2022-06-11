const app = require('express')();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fliter = require("./filter");
const port = process.env.PORT || '8585';


app.get('/0x1991E121fA90c333B3F5815545462fB72Aa95651', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


// connection auth (check blacklist and mark)
io.use((socket,next) => {
    const address = socket.handshake.auth.address;
    // socket.black = false;
    console.log("new connection apply",address)
    next();
});



// connection
io.on('connection', (socket) => {

    socket.join('default')

    let rooms = Array.from(socket.rooms)
    socket.leave(rooms[0])

    socket.on('join room',msg => {
        let rooms = Array.from(socket.rooms)
        socket.leave(rooms[0])
        socket.join(msg.room)
    })

    socket.on('chat message', msg => {

        if (socket.black == true) {
            socket.emit('system message', {'code':1,'content':'Can not speak, because of blacklist'});
            return
        }

        // check send interval
        const dateNow = Date.now();
        if (socket.lastSend != undefined && dateNow - socket.lastSend < 5000) {
            socket.emit('system message', {'code':2,'content':'Speaking too often'});
            return
        }

        // check sensitive words
        if (!fliter.check(msg.content)) {
            socket.emit('system message', {'code':3,'content':'Sensitive words'});
            return
        }

        socket.lastSend = dateNow;
        let rooms = Array.from(socket.rooms)
        msg.room = rooms[0];
        msg.sender = socket.handshake.auth.address;
        io.in(msg.room).emit('chat message', msg);
    });
});

server.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
