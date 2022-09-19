import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import ErrorHandler from "../utils/error";

const handleValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorHandler(400, "Validation Error"));
    }
    return next();
};

export default handleValidation;
