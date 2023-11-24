
import mongoose from 'mongoose'

const msgSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    messages: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            text: {
                type: String,
            },
            date: {
                type: Date
            }
        }
    ]
})

export default new mongoose.model('Message', msgSchema)