"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidate = void 0;
const validator_1 = require("../validator");
const productValidate = (validationCase) => {
    switch (validationCase) {
        case "create":
            return [
                (0, validator_1.validate)("name").isRequired().isString().isUnique("Product").length(4).exec(),
                (0, validator_1.validate)("category").isRequired().isObjectID().exec(),
                (0, validator_1.validate)("price").isRequired().isNumber().exec(),
                (0, validator_1.validate)("count").isRequired().isNumber().exec(),
                (0, validator_1.validate)("description").isRequired().length(15).exec(),
            ];
        case "edit":
            return [
                (0, validator_1.validate)("name").isOptional().isString().isUnique("Product").length(4).exec(),
                (0, validator_1.validate)("category").isOptional().isObjectID().exec(),
                (0, validator_1.validate)("price").isOptional().isNumber().exec(),
                (0, validator_1.validate)("count").isOptional().isNumber().exec(),
                (0, validator_1.validate)("description").isOptional().length(15).exec(),
            ];
        case "assign":
            return [
                (0, validator_1.validate)("count").isRequired().isNumber().exec()
            ];
        default: return [];
    }
};
exports.productValidate = productValidate;
