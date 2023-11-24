import React from 'react'
import { UseContext } from '../context/Context'

import '../scss/Messages.scss'

const Messages = () => {
    const { user, msg } = UseContext()
    
    return (
        <article className='messages'>
            {
                msg.map((_msg, ind) => {
                    return <div key={ind} id={_msg?.sender === user.id ? 'right' : ''}>
                        <span >{_msg?.text} <br />
                        </span>
                    </div>
                })
            }
        </article>
    )
}

export default Messages