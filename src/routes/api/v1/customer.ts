/**
 * @description Module dependencies
 */

import express, { IRouter } from 'express'
import { createCustomerSchema } from '../../../middlewares/validators/customer-validator'
import { CustomerController } from '../../../controllers/customer'
import { authenticate } from '../../../utils/jwt'

const {checkSchema} = require('express-validator')

const customerController = new CustomerController()
const router: IRouter = express.Router()

router.post('/', authenticate, checkSchema(createCustomerSchema), customerController.create)
router.get('/', authenticate, customerController.getAll)
router.get('/:username', authenticate, customerController.get)

export default router;
