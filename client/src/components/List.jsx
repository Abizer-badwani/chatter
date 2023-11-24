import React from 'react'
import { UseContext } from '../context/Context'

import '../scss/List.scss'

const List = ({ active }) => {
    let { chat, list, chatDispatch } = UseContext()

    const showChat = (id, receiver, receiverId) => {
        chatDispatch({ type: 'ADD', payload: { id, receiver, receiverId } })
    }

    return (
        <div className="list">
            {
                list?.map(({_id, receiver: {username, _id: rId}}, ind) => {
                    return <mark key={ind}
                        className={chat?.receiver === username ? 'chat color' : 'chat'}
                        onClick={() => { showChat(_id, username, rId) }}
                        >
                        <span className='chat'>{username}</span>
                        <span className='small-chat'>{username.charAt(0)}</span>
                        {active.some(user => user.name === username) ? <blockquote></blockquote> : <></>}
                    </mark>
                })
            }
        </div>
    )
}

export default List