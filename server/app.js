
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

import userRouter from './routes/User.js'
import chatRouter from './routes/Chats.js'
import msgRouter from './routes/Msg.js'

import './config/db.js'

const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

app.use(express.static('../client/build'))

app.use('/auth', userRouter)
app.use('/chat', chatRouter)
app.use('/msg', msgRouter)

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"))
})

app.listen(process.env.PORT)

