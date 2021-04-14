
import ApiError from './../utils/exceptions/api-error'
import BaseError from './../utils/exceptions/base-error'
import { Request, Response, NextFunction } from 'express'


/**
 * @description Error handler middleware
 * @param {error} ApiError 
 */

 const handleErrors = (error : ApiError | BaseError, req : Request, res : Response, next : NextFunction ) => {
    if(error instanceof ApiError || error instanceof BaseError){
        next(error)
        return res.status(error.statusCode).json({
          error : error.name,
          message : error.message
        })
    }

    next(error)
    return res.status(500).json({
      error : 'Unknown error',
      message : `There's been a glitch in the system`
    })
 }

 export default handleErrors