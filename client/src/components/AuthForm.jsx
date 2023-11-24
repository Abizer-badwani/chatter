import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CiUser } from "react-icons/ci"
import { HiOutlineMail } from "react-icons/hi"
import { IoTextOutline } from "react-icons/io5"
import { TbPassword } from "react-icons/tb"
import '../scss/Form.scss'

const AuthForm = ({ title, handleSubmit }) => {

    const [credentials, setCredentials] = useState({ username: "", email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleInput = (event) => setCredentials(prev => ({ ...prev, [event.target.name]: event.target.value }))


    return (
        <section className='form-container'>
            <div>{title}</div>
            <form onSubmit={(event) => handleSubmit(credentials, event, setCredentials)}>
                <div>
                    <input type="text" placeholder='Enter username' name='username' value={credentials.username} onChange={handleInput} autoComplete='off' />
                    <CiUser className='icons' size={'25'}/>
                </div>
                {
                    title === "signup" &&
                    <div>
                            <input type="email" placeholder='Enter Email' name='email' value={credentials.email} onChange={handleInput} autoComplete='off' />
                            <HiOutlineMail className='icons' size={'25'}/>
                    </div>
                }
                <div>
                <input type={showPassword ? "text" : "password"} placeholder='Enter Password' name='password' value={credentials.password} onChange={handleInput} autoComplete='off' />
                    {
                        showPassword ?
                        <IoTextOutline className='icons' size={'20'} onClick={() => setShowPassword(prev => !prev)} />
                        :
                        <TbPassword className='icons' size={'25'} onClick={() => setShowPassword(prev => !prev)} />
                    }
                </div>
                <button type='submit'>{title}</button>
                {
                    title !== 'signup' &&
                    <span onClick={() => navigate('/signup')}>create account</span>
                }
            </form>
        </section>
    )
}

export default AuthForm