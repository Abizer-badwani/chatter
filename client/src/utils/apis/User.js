import axios from 'axios'
import toast from 'react-hot-toast'
axios.defaults.withCredentials = true
const URL = "http://localhost:8085"


const getProfile = async () => {
    try {
        const { data } = await axios.get(`${URL}/auth/profile`)
        return data
    } catch (err) {
        console.log(err.message)
        return toast.error('NetWork Error')

    }
}

const signUp = async (credentials) => {
    try {
        const { data } = await axios.post(`${URL}/auth/signup`, credentials)
        return data
    } catch (err) {
        console.log(err.message)
        return toast.error('NetWork Error')
    }
}

const logIn = async (credentials) => {
    try {
        const { data } = await axios.post(`${URL}/auth/login`, credentials)
        return data
    } catch (err) {
        console.log(err.message)
        return toast.error('NetWork Error')
    }
}

const logOut = async () => {
    try {
        const { data } = await axios.get(`${URL}/auth/logout`)
        return data
    } catch (err) {
        console.log(err.message)
        return toast.error('NetWork Error')
    }
}

const searchUsers = async (search) => {
    try {
        const { data } = await axios.post('http://localhost:8085/auth/search', { search })
        return data
    } catch (err) {
        console.log(err.message)
        return toast.error('NetWork Error')
    }
}

export { getProfile, signUp, logIn, logOut, searchUsers }