"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const __1 = require("..");
const userValidator = (validationCase) => {
    switch (validationCase) {
        case "edit":
            return [
                (0, __1.validate)("username").isOptional().isString().length(2).isUnique("User").exec(),
                (0, __1.validate)("email").isOptional().isEmail().isUnique("User").exec(),
                (0, __1.validate)("password").isOptional().length(8).exec(),
            ];
        default:
            return [];
    }
    ;
};
exports.userValidator = userValidator;
