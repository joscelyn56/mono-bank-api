import { Request, Response } from 'express';
export declare class CustomerController {
    /**
     * @description Creates a new customer
     */
    create(req: Request, res: Response): Promise<void>;
    /**
     * @function Get all customers
     * @param req
     * @param res
     */
    getAll(req: Request, res: Response): Promise<void>;
    /**
     * @function Get customer
     * @param req
     * @param res
     */
    get(req: Request, res: Response): Promise<void>;
    generateAccountNumber(): Promise<any>;
}
