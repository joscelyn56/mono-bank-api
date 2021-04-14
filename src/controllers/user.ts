/**
 * Module Dependencies
 */
import { transformResponse as response } from '../utils/transform-response'
import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import * as jwt from '../utils/jwt'
import { User } from "../database/models";

export class UserController {
  /**
   * @description Registers a user account
   */
  public async register(req: Request, res: Response) {
    try {
      let user = {
        ...req.body,
        password: await bcrypt.hash(req.body.password, 10)
      }

      const query = {
        where: {email: user.email}
      }
      const existingUser = await User.findOne(query)

      if (existingUser)
        throw new Error('User account already exists')

      const newUser = await User.create(user)

      if (!newUser)
        throw new Error('Could not create user account')

      const {password, ...rest} = newUser.get({plain: true})
      res.status(200).json(response(1, 'ok', rest))
    } catch (error: any) {
      res.status(400).json(response(0, error.message, error));
    }
  }

  /**
   * @function Logs In user and generates an access token
   * @param req
   * @param res
   */
  public async login(req: Request, res: Response) {
    try {
      let user = {
        ...req.body
      }
      let userDetails: any = null

      const query = {
        where: {email: user.email},
        raw: true
      }
      const userData: any = await User.findOne(query)
      if (!userData)
        throw new Error('User Not Found')

      const {password: hashedPassword, ...rest} = userData
      userDetails = rest

      const validated = bcrypt.compare(user.password, hashedPassword)
      if (!validated) {
        res.status(400).json(response(0, "Password is incorrect", {}))
      }

      userDetails.access_token = jwt.sign(userDetails, 144000)
      req.session.is_auth = true

      res.json(response(1, 'ok', userDetails))
    } catch (error: any) {
      res.status(400).json(response(0, error.message, {}))
    }
  }

  /**
   * @function Just a simple function to invalidate user session token
   * @param req
   * @param res
   */
  public async logout(req: Request, res: Response) {
    req.session.is_auth = false
    req.session.user = null
    res.json(response(1, 'ok', {message: 'Logged out successfully'}));
  }
}

