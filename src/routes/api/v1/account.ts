/**
 * @description Module dependencies
 */

import express, { IRouter } from 'express'
import { createTransferSchema } from '../../../middlewares/validators/account-validator'
import { AccountController } from '../../../controllers/account'
import { authenticate } from "../../../utils/jwt";

const {checkSchema} = require('express-validator')

const accountController = new AccountController()
const router: IRouter = express.Router()

router.get('/', authenticate, accountController.getAll)
router.get('/:id', authenticate, accountController.get)
router.get('/history/:id', authenticate, accountController.getHistory)
router.post('/transfer', authenticate, checkSchema(createTransferSchema), accountController.transfer)

export default router;
