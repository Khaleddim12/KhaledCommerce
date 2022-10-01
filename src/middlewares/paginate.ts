import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const paginate =
  (model: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const total = await mongoose.model(model).countDocuments().exec();
    let pageCount = 1;
    let rowCount = 0;
    
    

    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    pageCount = Math.ceil(total / limit);

    let paginationResults = {
      next: {},
      prev: {},
      results: {},
      rowcount: total,
      countperpage:pageCount
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

    paginationResults.results = await mongoose
      .model(model)
      .find()
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.paginatedResults = paginationResults;
  };

export { paginate };
