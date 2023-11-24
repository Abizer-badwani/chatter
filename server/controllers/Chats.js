import Chat from '../models/Chat.js'
import Msg from '../models/Msg.js'

const getChatList = async (req, res) => {
    try {
        const { id } = req.user

        const chats = await Chat.find({ owner: id }).populate('owner receiver')
        return res.json({ success: true, chats })
    } catch (err) {
        console.log(err)
        return res.json({ success: false, message: 'Internal Server Error' })
    }
}

const createChat = async (req, res) => {
    try {
        const { id } = req.user
        const { userId } = req.body

        if (!userId) return res.json({ success: false })

        const is_chat_exists = await Chat.findOne({ owner: id, receiver: userId})
        if (is_chat_exists) return res.json({ success: true, chat: is_chat_exists })

        const new_chat = await Chat.create({ owner: id, receiver: userId })
        if (!new_chat) return res.json({ success: false})
        await Msg.create({ chatId: new_chat._id })

        return res.json({ success: true, chat: new_chat})
    }
    catch (err) {
        console.log(err)
        return res.json({ success: false, message: 'Internal Server Error' })
    }

}

const deleteChat = async (req, res) => {
    try {
        const { chatId } = req.body
        
        await Chat.deleteOne({ _id: chatId })
        await Msg.deleteOne({ chatId })
        return res.json({ success: true, message: "Chat Deleted" })
    }
    catch (err) {
        console.log(err)
        return res.json({ success: false, message: 'Internal Server Error' })
    }

}

export { getChatList, createChat, deleteChat }