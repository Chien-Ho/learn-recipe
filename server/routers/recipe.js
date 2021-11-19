const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')

const Recipe = require('../models/Recipe')

router.get('/', verifyToken, async (req, res) => {
    try {
        const recipes = await Recipe.find({ user: req.userId }).populate('user', ['username'])
        res.json({
            success: true,
            recipes
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: 'lay recipes khong thanh cong'
        })
    }

})

router.post('/', verifyToken, async (req, res) => {
    const { name, description, url, status } = req.body
    //validation
    if (!name)
        return res.status(400).json({
            success: false,
            messsage: 'vui long nhap ten cong thuc'
        })
    //all good
    try {
        const newRecipe = new Recipe({
            name,
            description,
            url: url.startsWith('http://') ? url : `http://${url}`,
            status: status || 'TO COOK',
            user: req.userId
        })
        await newRecipe.save()
        return res.json({
            success: true,
            message: 'Tạo Recipe Thành Công',
            newRecipe

        })
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success: false,
            message: 'Tạo Recipe Không Thành Công'
        })
    }
})

router.put('/:id', verifyToken, async (req, res) => {
    const { name, description, url, status } = req.body
    //validation
    if (!name)
        return res.status(400).json({
            success: false,
            message: 'Vui lòng nhập tên công thức'
        })
    //all good
    try {
        let newRecipe = {
            name,
            description: description || '',
            url: url.startsWith('http://') ? url : `http://${url}`,
            status: status || 'TO COOK'
        }
        const updateRecipeCondition = { id: req.params._id, user: req.userId }
        newPost = await Recipe.findOneAndUpdate(
            updateRecipeCondition,
            newRecipe,
            { new: true }
        )
        if (!newPost)
            return res.status(401).json({
                success: false,
                message: 'cập nhật Recipe không thành công'
            })
        res.json({
            success: true,
            message: 'cập nhật Recipe thành công',
            newRecipe
        })
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success: false,
            message: 'server sập'
        })
    }
})
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deleteCondition = { _id: req.params.id, user: req.userId }
        const deleteRecipe = await Recipe.findOneAndDelete(deleteCondition)

        if (!deleteRecipe)
            return res.status(401).json({
                success: false,
                message: 'xoa recipe khong thanh cong'
            })
        res.json({
            success: true,
            message: 'xoa recipe thanh cong'
        })
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success: false,
            message: 'server sap'
        })
    }

})
module.exports = router