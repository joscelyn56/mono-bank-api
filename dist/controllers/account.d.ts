import { Request, Response } from 'express';
export declare class AccountController {
    /**
     * @function Create an account for a customer
     * @param req
     * @param res
     */
    create(req: Request, res: Response): Promise<void>;
    /**
     * @function Deposit money into another
     * @param req
     * @param res
     */
    deposit(req: Request, res: Response): Promise<void>;
    /**
     * @function Transfer from one account to another
     * @param req
     * @param res
     */
    transfer(req: Request, res: Response): Promise<void>;
    /**
     * @function Get all accounts
     * @param req
     * @param res
     */
    getAll(req: Request, res: Response): Promise<void>;
    /**
     * @function Get account details
     * @param req
     * @param res
     */
    get(req: Request, res: Response): Promise<void>;
    /**
     * @function Get account history
     * @param req
     * @param res
     */
    getHistory(req: Request, res: Response): Promise<void>;
}
