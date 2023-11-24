import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Profile from './Profile'
import Image from '../assets/profile.png'
import { UseContext } from '../context/Context'

import '../scss/Navbar.scss'

const Navbar = () => {

    const { user } = UseContext()
    const [showProfile, setShowProfile] = useState(false)

    return (
        <>
            <nav>
                <div>chatter</div>
                {
                    user?.id &&
                    <mark>
                        <img src={Image} alt='' onClick={() => setShowProfile(prev => !prev)} />
                    </mark>
                }
            </nav>
            <Profile showProfile={showProfile} setShowProfile={setShowProfile} />
            <Outlet />
        </>
    )


}
export default Navbar