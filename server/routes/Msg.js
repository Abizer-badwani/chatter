
import express from 'express'
import verifyUser from '../middlewares/Auth.js'
import { addMsg, getMsg } from '../controllers/Msg.js'

const router = express.Router()

router.post('/', verifyUser, getMsg)
router.post('/add', verifyUser, addMsg)

export default router
