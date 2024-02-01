const multer = require('multer')
const fs = require('fs')
const { randomString } = require('../config/helper.config')

const myStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        const path = './public/uploads'
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, {
                recursive:true
            })
        }
        cb(null,path)
    },
    filename: (req, file, cb) => {
        const ext = (file.originalname.split('.')).pop()
        const fileName = randomString() + '.' + ext
        cb(null,fileName)
    }
})
const imageFilter = (req,file, cb)=> {
    const ext = (file.originalname.split('.')).pop()
    if (['jpg', 'jpeg', 'png', 'svg', 'webp', 'bmp'].includes(ext.toLowerCase())) {
        cb(null,true)
    } else {
        cb({code:422,message:"fileformat not supported"})
    }
}
const uploader = multer({
    storage: myStorage,
    fileFilter: imageFilter,
    limits: {
        fileSize:5000000
    }
})
module.exports = uploader;