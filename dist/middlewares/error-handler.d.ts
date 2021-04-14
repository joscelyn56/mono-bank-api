import ApiError from './../utils/exceptions/api-error';
import BaseError from './../utils/exceptions/base-error';
import { Request, Response, NextFunction } from 'express';
/**
 * @description Error handler middleware
 * @param {error} ApiError
 */
declare const handleErrors: (error: ApiError | BaseError, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export default handleErrors;
