/**
 * @description Module dependencies
 */

import express, { Request, Response, IRoute, IRouter, NextFunction } from 'express'
import v1Routes from './v1/index'
const router : IRouter = express.Router()

router.get('/', (req: Request, res: Response)=>{
  res.status(200).json({ title : "Welcome to API route" })
})

router.use('/v1', v1Routes)
export default router;