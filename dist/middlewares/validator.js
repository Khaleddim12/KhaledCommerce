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
exports.validate = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = __importDefault(require("mongoose"));
const express_validator_1 = require("express-validator");
//* Utility functions
const errorMessages_1 = require("../utils/messages/errorMessages");
let validate = (field) => {
    let validateObj = {
        result: (0, express_validator_1.check)(),
        field: function () {
            this.result = (0, express_validator_1.check)(field);
            return this;
        },
        //* Check string format
        isString: function () {
            this.result = this.result
                .isString()
                .withMessage((0, errorMessages_1.errorMessages)("string", field))
                .bail();
            return this;
        },
        isNumber: function () {
            this.result = this.result
                .isNumeric()
                .withMessage((0, errorMessages_1.errorMessages)("number", field))
                .bail();
            return this;
        },
        isObjectID: function () {
            this.result = this.result
                .custom((value) => __awaiter(this, void 0, void 0, function* () {
                if (!mongoose_2.default.isValidObjectId(value))
                    return Promise.reject("Not valid object ID");
            }))
                .bail();
            return this;
        },
        //check length between minimum and maximum
        length: function (min) {
            this.result = this.result
                .isLength({ min: min })
                .withMessage(`length must be more than ${min} characters`)
                .bail();
            return this;
        },
        //check if field is boolean
        isBoolean: function () {
            this.result = this.result
                .isBoolean()
                .withMessage((0, errorMessages_1.errorMessages)("boolean", field))
                .bail();
            return this;
        },
        //check if field is date
        isDate: function () {
            this.result = this.result
                .isISO8601()
                .toDate()
                .withMessage((0, errorMessages_1.errorMessages)("date", field))
                .bail();
            return this;
        },
        //check if field is required
        isRequired: function () {
            this.result = this.result
                .exists({ checkFalsy: true })
                .withMessage((0, errorMessages_1.errorMessages)("required", field))
                .bail();
            return this;
        },
        //check uf field is optinal
        isOptional: function () {
            this.result = this.result.optional();
            return this;
        },
        //check if field is email
        isEmail: function () {
            this.result.isEmail().withMessage((0, errorMessages_1.errorMessages)("email", field)).bail();
            return this;
        },
        //check if field is unique
        isUnique: function (model) {
            this.result = this.result
                .custom((value) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const document = yield mongoose_1.default
                        .model(model)
                        .findOne({ [field]: value });
                    if (document)
                        return Promise.reject((0, errorMessages_1.errorMessages)("unique", field));
                }
                catch (error) {
                    return Promise.reject(error);
                }
            }))
                .bail();
            return this;
        },
        //check if exist in db
        isExist: function (model, path) {
            this.result = this.result.custom((value) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const document = yield mongoose_1.default
                        .model(model)
                        .findOne({ [path]: value });
                    if (!document)
                        return Promise.reject((0, errorMessages_1.errorMessages)("exist", field));
                }
                catch (error) {
                    return Promise.reject(error);
                }
            }));
        },
        // Return results for express validator to be executed
        exec: function () {
            return this.result;
        },
    };
    return validateObj.field();
};
exports.validate = validate;
