import { NextFunction, Request, Response } from 'express';
/**
 * @description this interface allows you to declare additional properties on your session object
 */
declare module 'express-session' {
    interface SessionData {
        user: any;
        is_auth: boolean;
    }
}
declare enum tokenStatus {
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
declare const sign: (payload: object, timeout: number) => string;
/**
 * @function Verifies signed token
 * @param req {Request}
 * @param res {Response}
 * @param next {NextFuntion}
 */
declare const verify: (req: Request, res: Response, next: NextFunction) => tokenStatus.NOT_EXISTING;
declare const authenticate: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export { sign, verify, authenticate };
