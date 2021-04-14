import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

/**
 * @description this interface allows you to declare additional properties on your session object
 */

declare module 'express-session' {
  interface SessionData {
    user: any;
    is_auth: boolean
  }
}

enum tokenStatus {
  NOT_EXISTING = 0,
  INVALID = 1,
  EXPIRED = 2,
  VALID = 3
}

/**
 * @function Signs payload object and generates a token
 * @param payload
 * @param timeout
 */

const sign = (payload: object, timeout: number): string => {
  let token = jwt.sign(payload, "mono_bank_secret_key_token", {expiresIn: timeout})
  return token
}

/**
 * @function Verifies signed token
 * @param req {Request}
 * @param res {Response}
 * @param next {NextFuntion}
 */

const verify = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers['authorization']
  let token: any = header && header.split(' ')[1]
  let token_status: tokenStatus = tokenStatus.NOT_EXISTING

  if (typeof header === 'undefined') token_status = tokenStatus.NOT_EXISTING

  jwt.verify(token, "mono_bank_secret_key_token", (err: any, decoded: any) => {
    if (err) token_status = tokenStatus.INVALID

    else {
      token_status = tokenStatus.VALID
      req.session.user = decoded
    }

    if (req.session.is_auth === false) {
      token_status = tokenStatus.EXPIRED
      req.session.user = null
    }

  })
  return token_status
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {

  let token: any = verify(req, res, next)

  if (token === tokenStatus.NOT_EXISTING) return res.status(401).json({description: 'Token does not exist'})
  if (token === tokenStatus.INVALID) return res.status(401).json({description: 'Token has expired'})
  if (token === tokenStatus.EXPIRED) return res.status(401).json({description: 'Your session has expired'})

  if (token === tokenStatus.VALID) next()
}

// @ts-ignore
export { sign, verify, authenticate }
