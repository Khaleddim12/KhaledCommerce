let ObjectId = require('mongoose').Types.ObjectId;
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const filter  = (model:string) => async(req:Request, res:Response, next:NextFunction) => {
    let query;

    
    // Regular expressions
    const nonSpecialCharactersRegex = /[a-zA-z0-9]$/;

    // Object contain all queries
    let obj = req.query;
    
    // Loop through queries and check for special charaters
    for (const key in obj) {
        if(!nonSpecialCharactersRegex.test(obj[key] as string)){
            res.filter = {
                success: true, 
                rowCount: 0,
                data: []
            }
            return next()
        }
    }

    //* Cleaning queries

    // Copying Queries
    const queryObj = { ...req.query };

    // Don't need to filter over select, sort, page, ..etc
    const removeFields = ['select', 'sort', 'page', 'limit', 'like'];
    removeFields.forEach(param => delete queryObj[param]);


    // Greater than, less than, ..etc queries support
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq|ne)\b/g, match => `$${match}`);

    //* Reparse the json string after cleaning
    let params = JSON.parse(queryStr);

    for(const param in params) {
        if((!removeFields.includes(param) && isNaN(params[param])) && typeof params[param] != "object" && !ObjectId.isValid(params[param])){
            params[param] = { $regex: '.*' + params[param] + '.*' }
        }
    }
    query = mongoose.model(model).find(params);

    
    // SELECT fields
    if(req.query.select){
        const fields = req.query.select.toString().split(',').join(' ');
        query = query.select(fields);
    }
    // SORTING fields
    if(req.query.sort){
        const sortBy = req.query.sort.toString().split(',').join(' ');
        query = query.sort(sortBy);
    }
    else{
        query = query.sort('-createdAt');
    }



    // PAGINATION
    let pageCount = 1;
   

    const total = await query.clone().countDocuments();
    let paginationResults = {
        next: {},
        prev: {},
        rowcount: total,
        countperpage:pageCount
      };
    
    

    //PAGINATION
    if(req.query.limit){
        const page = parseInt(req.query.page as string)||1
        const limit = parseInt(req.query.limit as string)||10
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        pageCount = Math.ceil(total / limit);
        paginationResults.countperpage =pageCount;
    
        query = query.skip(startIndex).limit(limit);

        if(startIndex>0){
            paginationResults.next={
                page:page+1,
                limit:limit
            }
        }
        if(endIndex<total){
            paginationResults.prev={
                page:page-1,
                limit:limit
            }
        }

    }
    
    
    const results = query;
    res.filter = {
        success: true, 
        totalCount: paginationResults.rowcount,
        pageCount:paginationResults.countperpage,
        data: results
    };
    next();
}

export {filter};