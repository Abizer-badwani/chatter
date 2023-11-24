import axios from "axios"
import toast from "react-hot-toast"
axios.defaults.withCredentials = true
const URL = 'http://localhost:8085'

const getMsg = async (chatId) => {
    try {
        const { data } = await axios.post(`${URL}/msg/`, { chatId })
        return data
    } catch (err) {
        console.log(err.message)
        toast.error('Network Error')
    }
}

const addMsg = async (chatId, text, receiverId) => {
    try {
        const { data } = await axios.post(`${URL}/msg/add`, { chatId, text, receiverId })
        return data    
    } catch (err) {
        console.log(err.message)
        toast.error('Network Error')
    }
}


export {getMsg, addMsg}
