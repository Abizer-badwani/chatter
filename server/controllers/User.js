import validator from "validator"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

const Signup = async (req, res) => {
    try {
        let { username, email, password } = req.body

        if (!username) return res.json({ success: false, message: 'Enter Username' })
        if (!email) return res.json({ success: false, message: 'Enter Email' })
        if (!password) return res.json({ success: false, message: 'Enter Password' })

        username = username.toLowerCase()
        email = email.toLowerCase()

        if (!validator.isEmail(email)) return res.json({ success: false, message: 'Enter Valid Email!' })
        if (!validator.isStrongPassword(password)) return res.json({ success: false, message: 'Enter Strong Password' })

        const is_username_exists = await User.findOne({ username })
        if (is_username_exists) return res.json({ success: false, message: 'Username Already Exists' })

        const is_email_exists = await User.findOne({ email })
        if (is_email_exists) return res.json({ success: false, message: 'Email Already Exists' })

        const salt = bcryptjs.genSaltSync(10)
        const hash_password = bcryptjs.hashSync(password, salt)

        const new_user = await User.create({ username, email, password: hash_password })

        const token = jwt.sign({ id: new_user._id }, process.env.JWT_SECRET)

        return res.cookie('token', token).json({ success: true, message: 'User Registered Successful' })
    }
    catch (err) {
        console.log(err.message)
        return res.json({ success: false, message: 'Internal Server Error' })
    }
}

const Login = async (req, res) => {
    try {
        let { username, password } = req.body
        
        if (!username) return res.json({ success: false, message: 'Enter Username' })
        if (!password) return res.json({ success: false, message: 'Enter Password' })

        username = username.toLowerCase()

        const is_user_exists = await User.findOne({ username })
        if (!is_user_exists) return res.json({ success: false, message: 'User Not Found' })
        
        const is_password_match = bcryptjs.compareSync(password, is_user_exists.password)
        if (!is_password_match) return res.json({ success: false, message: 'Incorrect Password' })
        
        const token = jwt.sign({id: is_user_exists._id}, process.env.JWT_SECRET) 
        return res.cookie('token', token).json({success: true, message: 'Login Successful'})
    }
    catch (err) {
        console.log(err)
        return res.json({success: false, message: 'Internal Server Error'})
    }
}

const getProfile = async (req, res) => {
    try {
        const { id } = req.user
        
        const user = await User.findOne({ _id: id }).select('-password -__v')   
        if (!user) return res.json({ success: false})
        
        return res.json({success: true, user})
    }
    catch (err) {
        console.log(err)
        return res.json({success: false, message: 'Internal Server Error'})
    }
}

const Logout = async (req, res) => {
    try {
        return res.clearCookie('token').json({success: true, message: 'Logout Successful'})
    }
    catch (err) {
        console.log(err.message)
        return res.json({success: false, message: "Internal Server Error"})
    }
 }

 const searchUsers = async (req, res) => {
    try {
        const { id } = req.user
        const { search } = req.body

        const SpecialChar = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`
        if (SpecialChar.split('').some(char => search.includes(char)))
            return res.json({ success: false, message: 'Wrong Input' })

        const keyword = { 'username': { $regex: search, $options: 'i' } }
        const user = await User.find(keyword).find({ _id: { $ne: id } })

        return res.json({ success: true, user })
    }
    catch (err) {
        console.log(err.message)
        return res.json({ success: false, message: 'Internal Server Error' })
    }
}

export { Signup, Login, getProfile, Logout, searchUsers }
