import multer from "multer";
import fs from "fs";
import path from "path";
import { ErrorResponse } from "./error response/errorResponse";
import { errorMessages } from "./messages";
import { Request } from "express";

export const categoryStorage = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Form path and check if it's exist
      let fullPath = `./public/category`;
      fs.exists(fullPath, (exist) => {
        // Create path if not exist
        if (!exist) {
          return fs.mkdir(fullPath, (error) => cb(error, fullPath));
        }
        return cb(null, fullPath);
      });
    },
    filename: function (req:Request, file, cb) {
      // Forming unique name
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            req.fileName = 'file-' + uniqueSuffix + path.extname(file.originalname)
            cb(null, req.fileName);
    },
  });

  return multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new ErrorResponse(errorMessages("image", "image"), 404));
      }
    },
  });
};

export const productStorage = ()=>{
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Form path and check if it's exist
      let fullPath = `./public/product`;
      fs.exists(fullPath, (exist) => {
        // Create path if not exist
        if (!exist) {
          return fs.mkdir(fullPath, (error) => cb(error, fullPath));
        }
        return cb(null, fullPath);
      });
    },
    filename: function (req:Request, file, cb) {
      // Forming unique name
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            req.fileName = 'file-' + uniqueSuffix + path.extname(file.originalname)
            cb(null, req.fileName);
    },
  });

  return multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new ErrorResponse(errorMessages("image", "image"), 404));
      }
    },
  });
}
