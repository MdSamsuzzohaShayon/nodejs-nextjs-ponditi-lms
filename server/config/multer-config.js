const multer = require('multer');
const path = require('path');




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        // console.log({ file: file.originalname.toString().slice(-4) });
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = file.originalname.toString().slice(-4);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
})

const upload = multer({ storage: storage })





module.exports = upload;