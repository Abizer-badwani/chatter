import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci"

import { GetChatMutate, GetChatQuery } from '../../utils/queries/Chat'
import SearchBox from '../../components/SearchBox'
import List from '../../components/List'
import { UseContext } from '../../context/Context'

import '../../scss/Chatlist.scss'

const ChatList = ({ active }) => {

  const {list} = UseContext()
  const [showSearch, setShowSearch] = useState(false)
  const {mutate} = GetChatMutate()
  
  GetChatQuery()

  useEffect(() => {
    mutate()
  }, [list])

  return (
    <>
      <div className='chat-list-container'>
        <section>
          <p>chats</p>
          <span><CiSearch size='25' onClick={() => setShowSearch(prev => !prev)} /></span>
        </section>
        <List active={active} />
      </div>
      <SearchBox showSearch={showSearch} setShowSearch={setShowSearch} />
    </>
  )
}

export default ChatList