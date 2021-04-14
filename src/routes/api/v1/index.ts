/**
 * @description Module dependencies
 */

import express, { IRouter, Request, Response } from 'express'
import userRoutes from './user'
import accountRoutes from './account'
import customerRoutes from './customer'

const router: IRouter = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({title: "Welcome to Mono Bank API Version 1"})
})

router.use('/user', userRoutes)
router.use('/account', accountRoutes)
router.use('/customer', customerRoutes)

export default router;
