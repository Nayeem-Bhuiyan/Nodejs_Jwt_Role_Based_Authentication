const router = require('express').Router()
const controller = require('../controller/authController')
const midd = require('../middleware/projectMiddleware')

router.post('/sign-up', [midd.auth.existRole, midd.auth.existEmail], controller.signUp)
router.post('/sign-in', controller.signIn)
router.post('/forgot-password', controller.forgotPassword)



module.exports = router
