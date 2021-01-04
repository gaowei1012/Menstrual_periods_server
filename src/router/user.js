const router = require('koa-router')()
const controller = require('../controller/user')

router.get('/api/test', controller.test)
router.post('/api/user/register', controller.register)
router.post('/api/user/login', controller.login)
router.post('/api/user/logout', controller.logout)

module.exports = router
