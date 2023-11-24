
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import morgan from 'morgan'
dotenv.config()

import userRouter from './routes/User.js'
import chatRouter from './routes/Chats.js'
import msgRouter from './routes/Msg.js'

import './config/db.js'

const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(morgan('tiny'))


app.use('/auth', userRouter)
app.use('/chat', chatRouter)
app.use('/msg', msgRouter)

app.listen(process.env.PORT)

