'use strict';
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./app/uploads');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null,file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

const checkFileType=(file, cb)=>{
    // Allowed ext
    const filetypes = /jpeg|jpg|png|tif|psd/;

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


var maxSize = 5*1000*1000*1000; //5gb
var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
});

module.exports = {upload}