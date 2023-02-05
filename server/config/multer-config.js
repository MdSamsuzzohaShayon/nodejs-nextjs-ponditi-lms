/* eslint-disable no-return-assign */
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, '../uploads'));
  },
  filename(req, file, cb) {
    // console.log({ file: file.originalname.toString().slice(-4) });
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = file.originalname.toString().slice(-4);
    // cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    cb(null, `${file.fieldname}-${uniqueSuffix}.jpeg`);
  },
  fileFilter: (req, file, cb) => {
    // console.log(file.mimetype);
    const fileTypeList = ['png', 'jpg', 'jpeg'];
    let fileTypes = '';
    fileTypeList.forEach((c, i) => (i === 0 ? (fileTypes += c) : (fileTypes += `|${c}`)));
    const re = new RegExp(`(${fileTypes})$`);
    // file.mimetype === "application/pdf"
    // console.log(file);
    // console.log("re.test(file.mimetype) - ", re.test(file.mimetype));
    // console.log("originalname - ", file.originalname);
    if (re.test(file.originalname) === true) {
      cb(null, true);
    } else {
      cb(new Error('File not acceptable'), false);
    }
  },
});

const upload = multer({ storage });

module.exports = upload;
