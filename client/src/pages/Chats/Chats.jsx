import React, { useEffect, useState } from 'react'

import { UseContext } from '../../context/Context'
import Navbar from '../../components/Navbar'
import ChatList from './ChatList'
import ChatBox from './ChatBox'

import '../../scss/Chats.scss'
import { GetChatMutate } from '../../utils/queries/Chat'
import { getMsg } from '../../utils/apis/Msg'

var selected = null

const Chats = () => {
  
  const { user, chat, socket, msgDispatch } = UseContext()
  const [active, setActive] = useState([])
  const { mutate } = GetChatMutate()


  useEffect(() => {
    socket.emit('new-user', user.username)

    socket.on('got-user', (user) => {
      setActive(user)
    })

    socket.on('got-msg', (id) => {
      if (selected === id) {   
        mutate()
        getMessage(id)
      }
      else {
        //notify
      }
  })

  }, [socket])

  useEffect(() => {
    if (chat.id) {
      selected = chat.id
      getMessage(chat.id)
    }
  }, [chat])

  const getMessage = async (id) => {
    const data = await getMsg(id)
    if (data?.success) {
      const { message: { messages } } = data
      msgDispatch({type: 'ADD', payload: messages})
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <ChatList active={active} />
        <ChatBox getMessage={getMessage} />
      </main>
    </>
  )
}

export default Chats