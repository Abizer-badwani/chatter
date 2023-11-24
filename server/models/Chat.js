
import mongoose from 'mongoose'

const ChatSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}
)

export default new mongoose.model('Chat', ChatSchema)