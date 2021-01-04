const UserModal = require('../database/mysql')
const {genPassword} = require('../utils/crypto')
const {secret} = require('../utils/secret')
const moment = require('moment')
const redis = require('../utils/redis')
const {v4: uuidv4} = require('uuid')
const jwt = require('jsonwebtoken')

exports.test = async = (ctx, next) => {
    ctx.body = {
        code: 200,
        data: [new Date().getTime().toString()],
    }
}

/**
 * 用户注册
 * @param {*} ctx
 * @param {*} next
 */
exports.register = async (ctx, next) => {
    const {username, password} = ctx.request.body
    const create_at = moment().format()
    const user_id = uuidv4()
    if (username === undefined || password === undefined) {
        ctx.body = {
            code: -1,
            message: '用户名密码不能为空',
        }
    } else if (username === '' || password === '') {
        ctx.body = {
            code: -1,
            message: '缺少必传参数',
        }
    } else {
        // 检查用户名是否被注册过
        const result = await UserModal.findOnesUser(username)
        if (result.length !== 0) {
            ctx.body = {
                code: -2,
                message: '用户名重复',
            }
        } else {
            await UserModal.insterUserData([
                user_id,
                username,
                genPassword(password),
                create_at,
            ])
                .then((result) => {
                    ctx.body = {
                        code: 200,
                        message: '注册成功',
                    }
                })
                .catch((err) => {
                    ctx.body = {
                        code: 500,
                        message: '注册失败',
                    }
                })

            await next()
        }
    }
}

/**
 * 用户登录
 * @param {*} ctx
 * @param {*} next
 */
exports.login = async (ctx, next) => {
    const {username, password} = ctx.request.body
    const payload = {username:username,time:new Date().getTime(),timeout:1000*60*60*2}
    const token = jwt.sign(payload, secret)
    if (username === undefined || password === undefined) {
        ctx.body = {
            code: -1,
            message: '用户名密码不能为空',
        }
    } else if (username === '' || password === '') {
        ctx.body = {
            code: -1,
            message: '缺少必传参数',
        }
    } else {
        await UserModal.findUser(username, genPassword(password))
            .then((result) => {
                redis.set('token', token)
                ctx.body = {
                    code: 200,
                    message: '登录成功',
                    data: [
                        {
                            user_id: result[0].user_id,
                            token: token,
                            username: result[0].username,
                            create_at: result[0].create_at,
                        },
                    ],
                }
            })
            .catch((err) => {
                ctx.body = {
                    code: 500,
                    message: `登录失败失败: ${err}`,
                }
            })

        await next()
    }
}

/**
 * 用户登出
 * 只能调取一次
 * @param {*} ctx 
 * @param {*} next 
 */
exports.logout = async (ctx, next) => {
    const del = await redis.del('token')
    if (del === 1) {
        ctx.body = {
            code: 200,
            message: '退出成功'
        }
    } else if (del === 0) {
        ctx.body = {
            code: -1,
            message: '已登出，或者退出失败'
        }
    }

    await next()
} 