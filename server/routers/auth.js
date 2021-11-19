
const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const verifyToken = require('../middleware/verifyToken')

router.get(('/'), verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user)
            return res.status(400).json({
                success: false,
                message: 'loi'
            })
        res.json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: 'server sap'
        })
    }

})
router.post('/register', async (req, res) => {
    const { username, password, confirmPassword } = req.body

    if (!username || !password)
        return res.status(400).json({
            success: false,
            message: "nhap username or password"
        })
    try {
        const user = await User.findOne({ username })
        if (user)
            return res.status(400).json({
                success: false,
                message: "username or password da duoc su dung"
            })
        if (confirmPassword !== password)
            return res.status(400).json({
                success: false,
                message: "mat khau khong khop"
            })
        //all good 
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({ username, password: hashedPassword })
        await newUser.save()

        //return token
        const accessToken = jwt.sign({
            userId: newUser._id
        }, process.env.ACCESS_TOKEN_SECRET)
        res.json({
            success: true,
            message: "tao account thanh cong",
            accessToken
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "sap mamg"
        })
    }

})
//login
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password)
        return res.status(400).json({
            success: false,
            message: "nhap username or password"
        })
    try {
        const user = await User.findOne({ username })
        if (!user)
            return res.status(400).json({
                success: false,
                message: "username incorrect",

            })
        // check password
        const passwordChecked = await argon2.verify(user.password, password)
        if (!passwordChecked)
            return res.status(400).json({
                success: false,
                message: "password incorrect"
            })
        //all good 
        //return token
        const accessToken = jwt.sign({
            userId: user._id
        }, process.env.ACCESS_TOKEN_SECRET)
        res.json({
            success: true,
            message: "login thanh cong",
            accessToken
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "sap mamg"
        })
    }

})
module.exports = router