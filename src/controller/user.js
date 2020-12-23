const UserModal = require('../database/mysql')
const {genPassword} = require('../utils/crypto')
const {v4: uuidv4} = require('uuid')

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
    let create_at = new Date().toString()
    let user_id = uuidv4()
    if (username === '' || password === '') {
        ctx.body = {
            code: -1,
            message: '缺少必传参数',
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

/**
 * 用户登录
 * @param {*} ctx
 * @param {*} next
 */
exports.login = async (ctx, next) => {
    const {username, password} = ctx.request.body
    if (username === '' || password === '') {
        ctx.body = {
            code: -1,
            message: '缺少必传参数',
        }
    } else {
        await UserModal.findUser(username, genPassword(password))
            .then((result) => {
                ctx.body = {
                    code: 200,
                    message: '登录成功',
                    data: [
                        {
                            _id: result[0].id,
                            user_id: result[0].user_id,
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
