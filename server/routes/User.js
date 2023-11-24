
import express from 'express'
import { Login, Logout, Signup, getProfile, searchUsers } from '../controllers/User.js'
import verifyUser from '../middlewares/Auth.js'

const router = express.Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.get('/profile', verifyUser, getProfile)
router.get('/logout', verifyUser, Logout)
router.post('/search', verifyUser, searchUsers)


export default router