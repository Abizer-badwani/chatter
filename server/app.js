
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

app.use(express.static(path.join(path.resolve('../client/build'))))

app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve('..'), "client", "build", "index.html"))
})



app.use('/auth', userRouter)
app.use('/chat', chatRouter)
app.use('/msg', msgRouter)

app.listen(process.env.PORT)

