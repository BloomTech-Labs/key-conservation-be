const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");


// This creates an authenticated S3 instance
const s3 = new aws.S3({
  apiVersion: "2006-03-01",
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY_ID
  }
});

// This is middleware that will process the multipart file upload
const upload = multer({
  storage: multerS3({
    s3, // The s3 instance from above
    // The name of your S3 bucket
    bucket:process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    key: (req, file, next) => {
      console.log(file, 'Multer File ===========')
      // This names the file. This example prepends the
      // UNIX timestamp to original name of the file,
      // which helps with duplicate file names
      next(null, `files/${Date.now()}_${file.originalname}`);
    }
  })
});

module.exports = {
  upload
}
