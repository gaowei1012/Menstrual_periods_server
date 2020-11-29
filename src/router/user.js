const router = require('koa-router')()
const controller = require('../controller/user')

router.get('/api/test', controller.test)
router.post('/api/user/register', controller.register)

module.exports = router
