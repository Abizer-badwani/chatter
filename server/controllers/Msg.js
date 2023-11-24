import Msg from '../models/Msg.js'
import Chat from '../models/Chat.js'

const getMsg = async (req, res) => {
    try {
        const { chatId } = req.body
        const message = await Msg.findOne({ chatId }).populate('messages')
        if (!message) return res.json({ success: false })
        return res.json({success: true, message}) 
    }
    catch (err) {
        console.log(err.message)
        return res.json({success: false, message: 'Internal Server Error'})
    }
 }

const addMsg = async (req, res) => {
    try {
        const { id } = req.user
        const { chatId, text, receiverId } = req.body
        
        await Msg.findOneAndUpdate({ chatId }, { '$push': { 'messages': { sender: id, text, date: new Date() } } })

        const is_receiver_chat_exists = await Chat.findOne({ owner: receiverId, receiver: id })
        if (is_receiver_chat_exists) {
            await Msg.findOneAndUpdate({ chatId: is_receiver_chat_exists._id }, {'$push': {'messages': {sender: id, text, date: new Date()}}})
            return res.json({success: true, receiver_chat_id: is_receiver_chat_exists._id})
        }
        
        const new_reciever_chat = await Chat.create({ owner: receiverId, receiver: id })
        if (new_reciever_chat) await Msg.create({ chatId: new_reciever_chat._id })
        await Msg.findOneAndUpdate({ chatId: new_reciever_chat._id }, {'$push': {'messages': {sender: id, text, date: new Date()}}})
        
        return res.json({ success: true, receiver_chat_id: new_reciever_chat._id })
    } catch (err) {
        console.log(err)
        return res.json({success: false, message: 'Internal Server Error'})
    }
}

export {getMsg, addMsg }