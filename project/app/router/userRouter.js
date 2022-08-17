const router = require('express').Router()
const _usercontroller = require('../controller/userController')
const midd = require('../middleware/projectMiddleware')
const {upload} = require('../helper/filehelper');

router.get('/all', [midd.jwt.tokenRequired, midd.jwt.tokenAdmin], _usercontroller.all)
router.post('/edit/:id', [midd.jwt.tokenRequired, midd.jwt.sameUser], _usercontroller.edit)
router.post('/upload-images', upload.array('files',12), _usercontroller.uploadFile);
router.get('/image-paths',_usercontroller.getAllFilesPath );

module.exports = router
