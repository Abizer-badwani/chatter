import { Server } from 'socket.io'

const io = new Server(8080, {cors: { origin: 'http://localhost:3000', credentials: true } })

let activeUsers = []

io.on('connection', (socket) => {

    socket.on('new-user', (username) => {
        if(!activeUsers.some((user) => user.name === username))
            activeUsers.push({name: username, socketId: socket.id})
        io.emit('got-user', activeUsers)
    })
    
    socket.on('send-msg', (chat, rChatId) => {
        const { receiver } = chat
        const found = activeUsers.find((data) => data.name === receiver)
        if (found) {
            io.to(found.socketId).emit('got-msg', rChatId)
        }
    })

    socket.on('forceDisconnect', (username) => {
        activeUsers = activeUsers.filter((user) => user.name !== username)
        io.emit('got-user', activeUsers)
    })

    socket.on('disconnect', () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        io.emit('got-user', activeUsers)
    })
})
