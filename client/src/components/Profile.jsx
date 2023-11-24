import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { CiUser } from "react-icons/ci"
import { HiOutlineMail } from "react-icons/hi"

import Image from '../assets/profile.png'
import { logOut } from '../utils/apis/User'

import { UseContext } from '../context/Context'
import '../scss/Profile.scss'

const Profile = ({ showProfile, setShowProfile }) => {
    
    const navigate = useNavigate()
    const {user, userDispatch, msgDispatch, chatDispatch, socket} = UseContext()

    const logoutUser = async () => {
        const data = await logOut()
        if (data?.success) {
            userDispatch({ type: 'UN_AUTH' })
            chatDispatch({ type: 'REMOVE' })
            msgDispatch({type: 'REMOVE'})
            navigate('/', { replace: true })
            socket.emit('forceDisconnect', user.username)
            return toast.success(data?.message)
        }
        else toast.error(data?.message)
    }

    return (
            <div className={showProfile ? "wrapper show" : "wrapper"}>
                <section onClick={() => setShowProfile(prev => !prev)}>
                </section>
                <aside className="profile-container">
                    <mark>
                        <div className="profile-icon"><img src={Image} alt='' /></div>
                        <div className="profile-name"><CiUser size={'25'} />{user?.username}</div>
                        <div className="profile-email"><HiOutlineMail size={'25'} />{user?.email}</div>
                    </mark>
                    <button onClick={logoutUser}>logout</button>
                </aside>
            </div>
    )
}

export default Profile