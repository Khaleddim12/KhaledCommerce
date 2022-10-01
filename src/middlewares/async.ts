import { RequestHandler } from "express";

const asyncHandler = (handler:any) : RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(handler(req, res, next)).catch(next);
    };
  };

  export{asyncHandler};