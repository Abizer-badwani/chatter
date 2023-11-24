import axios from "axios"
import toast from "react-hot-toast"
axios.defaults.withCredentials = true
const URL = "http://localhost:8085"


const getChats = async () => {
    try {
        const { data } = await axios.get(`${URL}/chat/`)
        return data
    } catch (err) {
        console.log(err)
        return toast.error('NetWork Error')
    }
}

const createChat = async (user) => {
    try {
        const { data } = await axios.post(`${URL}/chat/create`, { userId: user._id })
        return data
    } catch (err) {
        console.log(err.message)
        return toast.error('NetWork Error')
    }
}

const clearChat = async (chatId) => {
    try {
        const { data } = await axios.delete(`${URL}/chat/delete`, { data: { chatId } })
        return data
    } catch (err) {
        console.log(err.message)
        return toast.error('NetWork Error')
    }
}

export { getChats, createChat, clearChat }