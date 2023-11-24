import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Signup from '../pages/Auth/Signup'
import Login from '../pages/Auth/Login'
import Chats from '../pages/Chats/Chats'
import NotFound from '../pages/Helper/NotFound'

import { UseContext } from '../context/Context'

const Router = () => {

    const { user } = UseContext()

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                    {
                        user.id ?
                            <Route index element={<Chats />} />
                            :
                            <>
                                <Route index element={<Login />} />
                                <Route path='signup' element={<Signup />} />
                            </>
                    }
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router