import { Request, Response } from 'express';
export declare class UserController {
    /**
     * @description Registers a user account
     */
    register(req: Request, res: Response): Promise<void>;
    /**
     * @function Logs In user and generates an access token
     * @param req
     * @param res
     */
    login(req: Request, res: Response): Promise<void>;
    /**
     * @function Just a simple function to invalidate user session token
     * @param req
     * @param res
     */
    logout(req: Request, res: Response): Promise<void>;
}
