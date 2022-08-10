const jwt = require('./tokenMiddleware')
const auth = require('./authMiddleware')

module.exports = { jwt, auth }