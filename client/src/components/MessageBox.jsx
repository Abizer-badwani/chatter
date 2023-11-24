import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoSend } from "react-icons/io5"
import InputImoji from 'react-input-emoji'
import { addMsg } from '../utils/apis/Msg'
import { UseContext } from '../context/Context'

import '../scss/Messagebox.scss'

const MessageBox = ({getMessage}) => {

    const [text, setText] = useState('')
    const { chat, socket } = UseContext()

    const add = async (event) => {
        event.preventDefault()
        if (!text) return toast.error('Enter message')

        const data = await addMsg(chat.id, text, chat.receiverId)
        if (data?.success) {
            const {receiver_chat_id : rChatId} = data
            setText('')
            getMessage(chat.id)
            socket.emit('send-msg', chat, rChatId)
        }
    }

    return (
        <form className="message-box" onSubmit={add}>
            <InputImoji
                borderRadius='5px'
                value={text}
                onChange={setText}
                borderColor='#fff'
                fontSize={'1.2rem'}
                keepOpened={true}
            />
            <button className='send-btn' type='submit'><IoSend className='io-send' /></button>
        </form>
    )
}

export default MessageBox