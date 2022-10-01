"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successMessages = exports.successData = void 0;
const successData = (path) => {
    const sentances = {
        create: `${path} has been created successfully`,
        edit: `${path} has been edited successfully`,
        delete: `${path} has been delete successfully`,
        emailSent: `Email is sent successfully`,
        resetPass: `Password reset successfully`,
    };
    return sentances;
};
exports.successData = successData;
const successMessages = (type, path) => {
    const successSentance = successData(path);
    return successSentance[type];
};
exports.successMessages = successMessages;
