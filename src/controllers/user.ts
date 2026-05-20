/**
 * Module Dependencies
 */
import { JsonController, Get, Controller, Param, Post, Req, Res, Body } from "routing-controllers";
import { transformResponse as response } from '../utils/transform-response'
import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import * as jwt from '../utils/jwt'
import { User } from "../database/models";
import { UserService } from "../services/user.service";

@JsonController()
@Controller("/user")
export class UserController {
  constructor(
    private userService: UserService
  ) {

  }

  /**
   * @description Registers a user account
   */
  @Post('/register')
  public async register(@Req() req: Request, @Res() res: Response, @Body() body:any) {
    try {
      let user = {
        ...body,
        password: await bcrypt.hash(body.password, 10)
      }
      const result = this.userService.create(user)
      res.status(200).json(response(1, 'ok', result))
    } catch (error: any) {
      res.status(400).json(response(0, error.message, error));
    }
  }

  @Post('/login')
  /**
   * @function Logs In user and generates an access token
   * @param req
   * @param res
   */
  public async login(@Req() req: Request, @Res() res: Response, @Body() body:any) {
    try {
      let user = {
        ...body
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

  @Get('/logout')
  /**
   * @function Just a simple function to invalidate user session token
   * @param req
   * @param res
   */
  public async logout(@Res() req: Request, @Res() res: Response) {
    req.session.is_auth = false
    req.session.user = null
    res.json(response(1, 'ok', {message: 'Logged out successfully'}));
  }
}

