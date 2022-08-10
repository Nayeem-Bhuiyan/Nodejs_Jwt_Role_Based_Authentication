const router = require('express').Router()
const controller = require('../controller/userController')
const midd = require('../middleware/projectMiddleware')

router.get('/all', [midd.jwt.tokenRequired, midd.jwt.tokenAdmin], controller.all)
router.post('/edit/:id', [midd.jwt.tokenRequired, midd.jwt.sameUser], controller.edit)

module.exports = router
