const fs = require('fs').promises;
const sharp = require('sharp');
const stream = require('stream');

module.exports.unlinkFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log(`File "${filePath}" was deleted successfully.`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`File "${filePath}" does not exist.`);
    } else {
      console.error(error);
    }
  }
};

/*
// Delete file locally
const fileAbsPath = `${__dirname}/../uploads/${findCustomer.dataValues.image}`;
// console.log({ existingFile: findCustomer.dataValues.image, fileAbsPath });
try {
  const openFile = await fsPromise.open(fileAbsPath);
  if (openFile) {
    await fsPromise.unlink(fileAbsPath);
  }
  // console.log(openFile);
} catch (fileUnlinkErr) {
  console.log(fileUnlinkErr);
}
*/

module.exports.compressImage = async (filePath) => {
  try {
    // eslint-disable-next-line newline-per-chained-call
    const fileData = await sharp(filePath).rotate().resize(200).jpeg({ mozjpeg: true }).toBuffer();

    return fileData;
  } catch (err) {
    console.log(err);
  }
  return null;
};
module.exports.bufferToReadableStream = async (bufferData) => {
  const buffer = Buffer.from(bufferData); // Your buffer here

  const readableStream = new stream.Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readableStream;
};
