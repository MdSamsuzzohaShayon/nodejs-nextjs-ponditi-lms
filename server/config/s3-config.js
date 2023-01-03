/* eslint-disable no-return-assign */
const { S3 } = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');



const s3 = new S3({
  accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
  secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    // acl: 'public-read',

    // acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      // console.log("File - ", file); // { fieldname: 'resume', originalname: 'Keycode.pdf', encoding: '7bit', mimetype: 'application/pdf' }
      const re = /.{3}$/;
      const fileExt = re.exec(file.originalname)[0];
      let newFileName = null;
      if (file.originalname.length > 10) {
        newFileName = `${file.originalname.substring(0, 9)}-${new Date().getSeconds()}-${file.fieldname}.${fileExt}`;
      } else {
        newFileName = `${file.originalname}-${new Date().getSeconds()}-${file.fieldname}.${fileExt}`;
      }
      cb(null, newFileName);
    },
  }),
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

module.exports = { s3, upload };
