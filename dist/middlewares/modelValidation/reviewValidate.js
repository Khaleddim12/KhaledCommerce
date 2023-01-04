"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidate = void 0;
const validator_1 = require("../validator");
const reviewValidate = (validationCase) => {
    switch (validationCase) {
        case "addReview":
            return [
                (0, validator_1.validate)("rating").isRequired().isNumber().exec(),
                (0, validator_1.validate)("comment").isRequired().isString().length(15).exec()
            ];
        default: return [];
    }
};
exports.reviewValidate = reviewValidate;
