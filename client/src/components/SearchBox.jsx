import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoIosArrowForward } from 'react-icons/io'

import { searchUsers } from '../utils/apis/User'
import { createChat } from '../utils/apis/Chats'
import { UseContext } from '../context/Context'
import { GetChatMutate } from '../utils/queries/Chat'

import '../scss/Searchbox.scss'

const SearchBox = ({ showSearch, setShowSearch }) => {

    let { chatDispatch } = UseContext()
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const { mutate } = GetChatMutate()

    const create = async (user) => {
        try {
            const data = await createChat(user)
            if (data?.success) {
                chatDispatch({ type: 'ADD', payload: { id: data.chat._id, receiver: user.username, receiverId: user._id } })
                setShowSearch(false)
                setSearch('')
                setData([])
                mutate()
            }
        } catch (err) {
            console.log(err)
        }
    }

    const searchUser = async (event) => {
        event.preventDefault()
        const data = await searchUsers(search)
        if (data?.success) {
            return setData(data.user)
        }
        return toast.error(data?.message)
    }

    return (
        <div className={showSearch ? "wrapper-two show" : "wrapper-two"}>
            <aside>
                <form onSubmit={searchUser}>
                    <input type="text"
                        placeholder='search user'
                        value={search}
                        onChange={(event) => setSearch(event.target.value)} />
                    <button><IoIosArrowForward size={'20'} /></button>
                </form>
                <article>
                    {
                        data?.map((_user, ind) => <mark key={ind} onClick={() => { create(_user) }}>
                            {_user.username}
                        </mark>)
                    }
                </article>
            </aside>
            <section onClick={() => setShowSearch(prev => !prev)}></section>
        </div>
    )
}

export default SearchBox