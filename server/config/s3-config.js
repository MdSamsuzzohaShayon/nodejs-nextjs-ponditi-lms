/* eslint-disable no-return-assign */
const { S3 } = require('aws-sdk');
const { compressImage, bufferToReadableStream } = require('../utils/fileFunctions')

const s3 = new S3({
  accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
  secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

// AWS.config.update({
//   accessKeyId: "YOUR_ACCESS_KEY_ID",
//   secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
//   region: "YOUR_REGION"
// });

// const s3 = new AWS.S3();

const uploadImageToS3 = async (uploadedFile) => {
  const { filename } = uploadedFile;
  const filePath = `${__dirname}/../uploads/${filename}`;
  // const fileStream = fs.createReadStream(filePath); // get file by syze of chunk

  const tempImageToUpload = await compressImage(filePath);
  const readableStream = await bufferToReadableStream(tempImageToUpload); // get file by syze of chunk
  // console.log(readableStream);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    Body: readableStream,
    // ContentType: uploadedFile.mimetype,
    // ACL: 'public-read',
  };

  try {
    const data = await s3.upload(params).promise();
    console.log(`Image uploaded successfully to ${data.Location}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { s3, uploadImageToS3 };
