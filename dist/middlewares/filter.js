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
exports.filter = void 0;
let ObjectId = require('mongoose').Types.ObjectId;
const mongoose_1 = __importDefault(require("mongoose"));
const filter = (model) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let query;
    // Regular expressions
    const nonSpecialCharactersRegex = /[a-zA-z0-9]$/;
    // Object contain all queries
    let obj = req.query;
    // Loop through queries and check for special charaters
    for (const key in obj) {
        if (!nonSpecialCharactersRegex.test(obj[key])) {
            res.filter = {
                success: true,
                rowCount: 0,
                data: []
            };
            return next();
        }
    }
    //* Cleaning queries
    // Copying Queries
    const queryObj = Object.assign({}, req.query);
    // Don't need to filter over select, sort, page, ..etc
    const removeFields = ['select', 'sort', 'page', 'limit', 'like'];
    removeFields.forEach(param => delete queryObj[param]);
    // Greater than, less than, ..etc queries support
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq|ne)\b/g, match => `$${match}`);
    //* Reparse the json string after cleaning
    let params = JSON.parse(queryStr);
    for (const param in params) {
        if ((!removeFields.includes(param) && isNaN(params[param])) && typeof params[param] != "object" && !ObjectId.isValid(params[param])) {
            params[param] = { $regex: '.*' + params[param] + '.*' };
        }
    }
    query = mongoose_1.default.model(model).find(params);
    // SELECT fields
    if (req.query.select) {
        const fields = req.query.select.toString().split(',').join(' ');
        query = query.select(fields);
    }
    // SORTING fields
    if (req.query.sort) {
        const sortBy = req.query.sort.toString().split(',').join(' ');
        query = query.sort(sortBy);
    }
    else {
        query = query.sort('-createdAt');
    }
    // PAGINATION
    let pageCount = 1;
    const total = yield query.clone().countDocuments();
    let paginationResults = {
        next: {},
        prev: {},
        rowcount: total,
        countperpage: pageCount
    };
    //PAGINATION
    if (req.query.limit) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        pageCount = Math.ceil(total / limit);
        paginationResults.countperpage = pageCount;
        query = query.skip(startIndex).limit(limit);
        if (startIndex > 0) {
            paginationResults.next = {
                page: page + 1,
                limit: limit
            };
        }
        if (endIndex < total) {
            paginationResults.prev = {
                page: page - 1,
                limit: limit
            };
        }
    }
    const results = query;
    res.filter = {
        success: true,
        totalCount: paginationResults.rowcount,
        pageCount: paginationResults.countperpage,
        data: results
    };
    next();
});
exports.filter = filter;
