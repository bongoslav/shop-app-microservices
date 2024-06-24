import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";
import * as dotenv from "dotenv";
dotenv.config();

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    const uploadDir = path.join(__dirname, "../../uploads");
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name.replace(/ /g, "") +
        "-" +
        Math.floor(Math.random() * 1e6) +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
