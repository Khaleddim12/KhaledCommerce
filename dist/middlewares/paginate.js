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
exports.paginate = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paginate = (model) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const total = yield mongoose_1.default.model(model).countDocuments().exec();
    let pageCount = 1;
    let rowCount = 0;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    pageCount = Math.ceil(total / limit);
    let paginationResults = {
        next: {},
        prev: {},
        results: {},
        rowcount: total,
        countperpage: pageCount
    };
    if (endIndex < total) {
        paginationResults.next = {
            page: page + 1,
            limit: limit,
        };
    }
    if (startIndex > 0) {
        paginationResults.prev = {
            page: page - 1,
            limit: limit,
        };
    }
    paginationResults.results = yield mongoose_1.default
        .model(model)
        .find()
        .limit(limit)
        .skip(startIndex)
        .exec();
    res.paginatedResults = paginationResults;
});
exports.paginate = paginate;
