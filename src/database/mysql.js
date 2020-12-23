const mysql = require('mysql')
const {database} = require('../config/index')
const {users} = require('./init')

const pool = mysql.createPool({
    host        :   database.HOST,
    user        :   database.USERNAME,
    password    :   database.PASSWORD,
    database    :   database.DATABASE,
    port        :   database.PORT
})

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

// 创建表类
const createTable = (sql) => {
    return query(sql, [])
}

// 创建表
createTable(users)

/**
 * 用户注册
 * @param val 传入参数
 */
exports.insterUserData = (val) => {
    const _sql = 'insert into users set user_id=?, username=?, password=?, create_at=?;'
    return query(_sql, val)
}

/**
 * 用户登录
 * @param {string} username 用户名
 * @param {string} password 密码
 */
exports.findUser = (username, password) => {
    const _sql = `select * from users where username='${username}' and password='${password}';`
    return query(_sql)
} 

/**
 * 查询用户名唯一性
 */
exports.findOnesUser = (username) => {
    const _sql = `select * from users where username='${username}';`
    return query(_sql)
}

