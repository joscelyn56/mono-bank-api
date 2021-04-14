/**
 * @description Module dependencies
 */

import express, { IRouter } from 'express'
import { createUserSchema, loginSchema } from '../../../middlewares/validators/user-validator'
import { UserController } from '../../../controllers/user'
import { authenticate } from '../../../utils/jwt'

const {checkSchema} = require('express-validator')

const userController = new UserController()
const router: IRouter = express.Router()

router.post('/', checkSchema(createUserSchema), userController.register)
router.post('/login', checkSchema(loginSchema), userController.login)
router.get('/logout', authenticate, userController.logout)

export default router;
