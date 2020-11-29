

exports.test = async = (ctx, next) => {
    ctx.body = {
        code: 200,
        data: [new Date().getTime()]
    }
}


/**
 * 用户注册
 * @param {*} ctx 
 * @param {*} next 
 */
exports.register = async (ctx, next) => {
    const {mobile,avatar,username,password} = ctx.request.body;
    let create_at = new Date();
    console.log('username', username)
    await UserModal.insterUserData([username,password,mobile,avatar,create_at])
        .then(result => {
            ctx.body = {
                code: 200,
                message: '注册成功'
            }
        })
        .catch(err => {
            ctx.body = {
                code: 500,
                message: '注册失败'
            }
        })

    await next()
}
