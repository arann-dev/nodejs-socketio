const express = require('express');
const app = express();
const path = require('path')

const http = require('http');
const server = http.createServer(app);
const cors = require('cors')
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'tesst.html'))
});

setInterval(() => {
    io.emit('image', 'some data');
}, 1000)
let users = [];
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({userId, socketId});
};


const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};


const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};


io.on('connection', (socket) => {
    console.log('user connect')

    socket.on('addUser', (userId) => {
        console.log(userId);
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    })

    socket.on('sendMessage', ({senderId, receiveId, text}) => {
        const user = getUser(receiveId);
        io.to(user.socketId).emit('getMessage', {
            senderId, text
        });
    })

    socket.on('disconnect', () => {
        console.log("a user disconnected!!")
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
})

server.listen(3000, () => {
    console.log('listening on *:3000');
});