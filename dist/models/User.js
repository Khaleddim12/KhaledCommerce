"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_2.Schema({
    username: String,
    slug: String,
    password: {
        type: String,
        select: false
    },
    address: {
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
            required: true,
        },
    },
    phoneNo: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: String,
    createdAt: {
        type: Date,
        immutable: true,
        default: () => new Date(),
    },
    updatedAt: Date,
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
});
exports.UserSchema = UserSchema;
UserSchema.virtual('reviews', {
    ref: "Review",
    localField: '_id',
    foreignField: "user",
    justOne: false
});
UserSchema.path('username').validate(function (value) {
    return __awaiter(this, void 0, void 0, function* () {
        let count = yield mongoose_1.default.models["User"].findOne({ "username": value }).countDocuments();
        if (count > 0) {
            return false;
        }
        else {
            return true;
        }
    });
}, 'A user with same user name already exists');
UserSchema.path('email').validate(function (value) {
    return __awaiter(this, void 0, void 0, function* () {
        let count = yield mongoose_1.default.models["User"].findOne({ "email": value }).countDocuments();
        if (count > 0) {
            return false;
        }
        else {
            return true;
        }
    });
}, 'A user with same email already exists');
UserSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        // Hashing password
        if (this.isModified("password")) {
            const salt = yield bcrypt_1.default.genSalt(10);
            this.password = yield bcrypt_1.default.hash(this.password, salt);
        }
        // Setting up date and slug
        this.updatedAt = new Date();
        this.slug = (0, slugify_1.default)(this.username, { lower: true });
    });
});
/*** Static methods ***/
// Get jwt token
UserSchema.methods.getSignedJwtToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
// Match password
UserSchema.methods.matchPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(enteredPassword, this.password);
    });
};
UserSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto_1.default.randomBytes(20).toString("hex");
    // Hash token and set to reset password token field
    this.resetPasswordToken = crypto_1.default
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
};
const User = (0, mongoose_2.model)("User", UserSchema);
exports.User = User;
