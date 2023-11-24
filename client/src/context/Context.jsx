import { createContext, useContext, useReducer, useRef, useState } from "react";
import { chatReducer, msgReducer, userReducer } from "./Reducer";
import { ProfileQuery } from "../utils/queries/User";
import {io} from "socket.io-client";


const Context = createContext()

const ContextProvider = ({ children }) => {
var socket = io('http://localhost:8080')
    
    const [user, userDispatch] = useReducer(userReducer, {id: null, username: null, email: null})
    const [chat, chatDispatch] = useReducer(chatReducer, { id: null, receiver: null, receiverId: null })
    const [msg, msgDispatch] = useReducer(msgReducer, [])
    const [list, setList] = useState([])

    
    const onSuccess = (data) => { 
        if (data?.success) {
            const {_id, email, username} = data.user
            userDispatch({type: 'AUTH', payload: {id: _id, username, email}})
        }
    }
    ProfileQuery(onSuccess)

    return <Context.Provider value={{ user, userDispatch, chat, chatDispatch, msg, msgDispatch, list, setList, socket }}>
        {children}
    </Context.Provider>
}

const UseContext = () => useContext(Context)

export {ContextProvider, UseContext}