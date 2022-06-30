module.exports = app => {
    const express = require('express')
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const router = express.Router({
        mergeParams: true
    })

    // 创建资源
    router.post('/', async (req, res) => {
        // const model = await req.Model.create(req.body)
        console.log(req.body)
        res.send('model')
    })
    // 更新资源
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    // 删除资源
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })
    // 资源列表
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })
    // 资源详情
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')
    const resourceMiddleware = require('../../middleware/resource')
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    app.post('/admin/api/login', async (req, res) => {
        const {username, password} = req.body
        // 1.根据用户名找用户

        const user = await AdminUser.findOne({username}).select('+password')
        assert(user, 422, '用户不存在')
        // 2.校验密码
        const isValid = require('bcryptjs').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // 3.返回token
        const token = jwt.sign({id: user._id}, app.get('secret'))
        res.send({token})
    })

    app.use('/admin/api/user/register', async (req, res) => {
        const {username, password} = req.body
        let {_id: id} = await AdminUser.create({username, password})
        const token = jwt.sign({id}, app.get('secret'), {
            expiresIn: 60 * 60 * 24 * 2 // 2天
        })
        res.send(token)
    })

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        console.log(err)
        const {name} = err
        if (name === 'TokenExpiredError') {
            return res.status(400).send({
                message: 'token has been expired',
            })
        }
        res.status(err.statusCode || 500).send({
            message: err.message,
            err
        })
    })
}
