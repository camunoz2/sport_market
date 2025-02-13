import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "./aws.js";

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const uniqueName = `uploads-sportmarket/${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  }),
});

export default upload;
