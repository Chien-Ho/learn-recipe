const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const header = req.header('Authorization')
    const token = header && header.split(' ')[1]

    if (!token)
        return res.status(400).json({
            success: false,
            message: 'khong co token',
            token
        })
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success: false,
            message: 'sai token'
        })
    }
}
module.exports = verifyToken