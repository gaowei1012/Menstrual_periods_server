const Koa = require('koa')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const {host, port} = require('./config')

const app = new Koa()

const sessionMysqlConfig = {
    user: database.USERNAME,
    password: database.PASSWORD,
    database: database.DATABASE,
    host: database.HOST,
}

app.use(
    session({
        key: 'USER_SID',
        store: new MysqlStore(sessionMysqlConfig),
    })
)

app.use(koaBody())
app.use(logger())

app.listen(port, () => {
    console.log(`http://${host}:${port}`)
})
