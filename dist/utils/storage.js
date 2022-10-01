"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productStorage = exports.categoryStorage = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const errorResponse_1 = require("./error response/errorResponse");
const messages_1 = require("./messages");
const categoryStorage = () => {
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            // Form path and check if it's exist
            let fullPath = `./public/category`;
            fs_1.default.exists(fullPath, (exist) => {
                // Create path if not exist
                if (!exist) {
                    return fs_1.default.mkdir(fullPath, (error) => cb(error, fullPath));
                }
                return cb(null, fullPath);
            });
        },
        filename: function (req, file, cb) {
            // Forming unique name
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            req.fileName = 'file-' + uniqueSuffix + path_1.default.extname(file.originalname);
            cb(null, req.fileName);
        },
    });
    return (0, multer_1.default)({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" ||
                file.mimetype == "image/jpg" ||
                file.mimetype == "image/jpeg") {
                cb(null, true);
            }
            else {
                cb(null, false);
                return cb(new errorResponse_1.ErrorResponse((0, messages_1.errorMessages)("image", "image"), 404));
            }
        },
    });
};
exports.categoryStorage = categoryStorage;
const productStorage = () => {
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            // Form path and check if it's exist
            let fullPath = `./public/product`;
            fs_1.default.exists(fullPath, (exist) => {
                // Create path if not exist
                if (!exist) {
                    return fs_1.default.mkdir(fullPath, (error) => cb(error, fullPath));
                }
                return cb(null, fullPath);
            });
        },
        filename: function (req, file, cb) {
            // Forming unique name
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            req.fileName = 'file-' + uniqueSuffix + path_1.default.extname(file.originalname);
            cb(null, req.fileName);
        },
    });
    return (0, multer_1.default)({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" ||
                file.mimetype == "image/jpg" ||
                file.mimetype == "image/jpeg") {
                cb(null, true);
            }
            else {
                cb(null, false);
                return cb(new errorResponse_1.ErrorResponse((0, messages_1.errorMessages)("image", "image"), 404));
            }
        },
    });
};
exports.productStorage = productStorage;
