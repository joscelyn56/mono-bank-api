/**
 * @description Module dependencies
 */

import express, { Request, Response, IRoute, IRouter, NextFunction } from 'express'
import ApiRoutes from './api/index'

const router : IRouter = express.Router()

router.get('/', (req: Request, res: Response)=>{
  res.status(200).json({ title : process.env.APP_NAME })
})

router.use('/api', ApiRoutes)
export default router;