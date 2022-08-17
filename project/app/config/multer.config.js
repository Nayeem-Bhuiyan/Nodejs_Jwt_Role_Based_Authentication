const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("FileDirectory :"+'./app/uploads')
        cb(null,'./app/uploads');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null,file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});
var maxSize = 5*1000*1000*1000;
var uploadInFolder = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
});


const checkFileType=(file, cb)=>{
    // Allowed ext
    const filetypes = /jpeg|jpg|png|tif/;

    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    //check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    }else{
        cb('Error')
    }
}


module.exports = {uploadInFolder};