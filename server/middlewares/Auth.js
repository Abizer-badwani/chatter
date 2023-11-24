import jwt from 'jsonwebtoken'

const verifyUser = (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) return res.json({ success: false })

        const id = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return res.json({ success: false })

        req.user = id
        next()

    } catch (err) {
        console.log(err.message)
        return res.json({ success: false })
    }
}

export default verifyUser
