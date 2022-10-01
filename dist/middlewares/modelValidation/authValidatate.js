"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const validator_1 = require("../validator");
const authValidation = (validationCase) => {
    switch (validationCase) {
        case "login":
            return [
                (0, validator_1.validate)("username").isRequired().exec(),
                (0, validator_1.validate)("password").isRequired().exec(),
            ];
        case "register":
            return [
                (0, validator_1.validate)("username").isRequired().isString().isUnique("User").exec(),
                (0, validator_1.validate)("password").isRequired().length(8).exec(),
                (0, validator_1.validate)("email").isRequired().isEmail().isUnique("User").exec(),
            ];
        case "reset":
            return [(0, validator_1.validate)("password").isRequired().isString().exec()];
        default:
            return [];
    }
};
exports.authValidation = authValidation;
