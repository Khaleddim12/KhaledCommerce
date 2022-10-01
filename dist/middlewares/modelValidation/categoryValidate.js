"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const validator_1 = require("../validator");
const categoryValidation = (validationCase) => {
    switch (validationCase) {
        case "create":
            return [
                (0, validator_1.validate)("name").isRequired().isString().isUnique("Category").length(4).exec(),
            ];
        case "edit":
            return [
                (0, validator_1.validate)("name").isOptional().isString().isUnique("Category").length(4).exec(),
            ];
        default:
            return [];
    }
};
exports.categoryValidation = categoryValidation;
