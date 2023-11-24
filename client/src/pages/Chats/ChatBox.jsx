import React from 'react'
import toast from 'react-hot-toast'
import { GoTrash } from "react-icons/go"

import Messages from '../../components/Massages'
import { UseContext } from '../../context/Context'
import MessageBox from '../../components/MessageBox'
import { clearChat } from '../../utils/apis/Chats'
import { GetChatMutate } from '../../utils/queries/Chat'

import '../../scss/Chatbox.scss'

const ChatBox = ({getMessage}) => {

    const { chat, chatDispatch, msgDispatch } = UseContext()
    const {mutate: chatMutate} = GetChatMutate()
    
    const clear = async () => {
        const data = await clearChat(chat.id)
        if (data?.success) {
            chatDispatch({ type: 'REMOVE' })
            chatMutate()
            msgDispatch({ type: 'REMOVE' })
            toast.success(data?.message)
        }
    }

    return (
        <div className='chat-box-container'>
            {chat?.id ?
                <>
                    <header>
                        <span>{chat?.receiver}</span>
                        <GoTrash size={'22'} fill='#777' className='dustbin' onClick={clear} />
                    </header>
                    <Messages />
                    <MessageBox getMessage={getMessage} />
                </>
                :
                <mark>Tap a Chat</mark>
            }
        </div>
    )

}

export default ChatBox