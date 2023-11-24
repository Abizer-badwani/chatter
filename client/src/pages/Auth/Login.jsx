import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import AuthForm from '../../components/AuthForm'
import { logIn } from '../../utils/apis/User'
import { ProfileMutate } from '../../utils/queries/User'

const Login = () => {

    const { mutate } = ProfileMutate()
    const navigate = useNavigate()

    const handleSubmit = async (credentials, event, setCredentials) => {
        try {
            event.preventDefault()
            const data = await logIn(credentials)

            if (data?.success) {
                setCredentials({ username: "", email: "", password: "" })
                mutate()
                navigate('/', { replace: true })
                toast.success(data?.message)
            }
            else {
                toast.error(data?.message)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return <AuthForm title={"login"} handleSubmit={handleSubmit} />

}

export default Login