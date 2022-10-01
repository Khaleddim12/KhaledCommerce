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
const errorMessages_1 = require("../messages/errorMessages");
let validate = (query) => {
    let validationObject = {
        result: (0, express_validator_1.check)(),
        query: function () {
            this.result = (0, express_validator_1.check)(query);
            return this;
        },
        isRequired: function () {
            this.result = this.result
                .exists({
                checkFalsy: true,
            })
                .withMessage((0, errorMessages_1.errorMessages)("required", query))
                .bail();
            return this;
        },
        optional: function () {
            this.result = this.result.optional();
            return this;
        },
        //* Check string format
        isString: function () {
            this.result = this.result
                .isString()
                .withMessage((0, errorMessages_1.errorMessages)("string", query))
                .bail();
            return this;
        },
        //check if document already exist
        isUnique: function (model) {
            this.result = this.result
                .notEmpty()
                .custom((value) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let found = yield mongoose_1.default.model(model).findOne({ [query]: value });
                    // If a document is found then return error
                    if (found) {
                        return Promise.reject((0, errorMessages_1.errorMessages)("unique", query));
                    }
                }
                catch (error) {
                    return Promise.reject(error);
                }
            }))
                .bail();
            return this;
        },
        isDate: function () {
            this.result = this.result
                .isISO8601()
                .toDate()
                .withMessage((0, errorMessages_1.errorMessages)("date", query))
                .bail();
            return this;
        },
        //* Check if email
        isEmail: function () {
            this.result = this.result
                .isEmail()
                .withMessage((0, errorMessages_1.errorMessages)("email", query))
                .bail();
            return this;
        },
        //check if exist
        isExist: function (model, field, returnData = false) {
            this.result = this.result
                .custom((value, { req }) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let data = yield mongoose_1.default.model(model).find({
                        [field]: value,
                    });
                    if (data.length > 0)
                        return Promise.reject((0, errorMessages_1.errorMessages)("exist", query));
                    if (returnData)
                        req.body.validationResults = { [model]: document };
                }
                catch (error) {
                    return Promise.reject(error);
                }
            }))
                .bail();
            return this;
        },
        isObjectId: function () {
            this.result = this.result
                .custom((value) => __awaiter(this, void 0, void 0, function* () {
                if (!mongoose_2.default.isValidObjectId(value)) {
                    return Promise.reject("Not valid object ID");
                }
            }))
                .bail();
            return this;
        },
        isLengthWise: function (min, max) {
            this.result = this.result.isLength({
                max: max,
                min: min
            }).withMessage((0, errorMessages_1.errorMessages)("betweenLength", query, `must be minimum ${min} characters and maximum ${max} characters`))
                .bail();
            return this;
        }
    };
    return validationObject.query();
};
exports.validate = validate;
