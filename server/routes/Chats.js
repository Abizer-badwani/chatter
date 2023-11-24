
import express from "express";
import verifyUser from "../middlewares/Auth.js";
import {  createChat, deleteChat, getChatList } from "../controllers/Chats.js";

const router = express.Router()

router.get('/', verifyUser, getChatList)
router.post('/create', verifyUser, createChat)
router.delete('/delete', verifyUser, deleteChat)


export default router