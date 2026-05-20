/**
 * @description Module dependencies
 */
import 'reflect-metadata';
import express, { IRouter } from 'express'
import { UserController } from '../../../controllers/user'
import { authenticate } from '../../../utils/jwt'
import { Container } from "typedi";

const router: IRouter = express.Router()
const userController = Container.get<UserController>(UserController);

router.post('/', userController.register)
router.post('/login', userController.login)
router.get('/logout', authenticate, userController.logout)

export default router;
