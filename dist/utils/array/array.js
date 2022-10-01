"use strict";
// transfer any data to array
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrify = void 0;
const arrify = (data) => {
    if (!Array.isArray(data)) {
        data = new Array(data);
    }
    return data;
};
exports.arrify = arrify;
