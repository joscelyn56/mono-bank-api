/**
 * Module Dependencies
 */
import { transformResponse as response } from '../utils/transform-response'
import { Request, Response } from 'express'
import { Account, Customer, Transaction } from "../database/models";

export class CustomerController {
  /**
   * @description Creates a new customer
   */
  public async create(req: Request, res: Response) {
    try {
      let details = {
        ...req.body,
      }

      const query = {
        where: {
          username: details.username,
        },
        raw: true,
      }
      const existingCustomer: any = await Customer.findOne(query)

      if (existingCustomer)
        throw new Error('Customer already exists')

      const newCustomer: any = await Customer.create(details)

      if (!newCustomer)
        throw new Error('Could not create new customer')

      const customer: any = newCustomer.get({plain: true})

      let min = Math.ceil(2111111111);
      let max = Math.floor(2999999999);
      let accountNumber = Math.floor(Math.random() * (max - min + 1)) + min;

      const account: any = await Account.create({
        customer_id: customer.id,
        account_number: accountNumber,
        balance: details.deposit
      });
      await Transaction.create({
        initiator: req.session.user.id,
        type: 'DEPOSIT',
        receiver_id: account.id,
        amount: details.deposit,
        balance: details.deposit
      });

      const accountDetails = account.get({plain: true});
      customer['account'] = accountDetails

      res.status(200).json(response(1, 'ok', customer))
    } catch (error: any) {
      console.log(error)
      res.status(400).json(response(0, error.message, error));
    }
  }

  /**
   * @function Get all customers
   * @param req
   * @param res
   */
  public async getAll(req: Request, res: Response) {
    try {
      const query = {
        where: {},
        raw: true
      }
      const customers: any = await Customer.findAll(query)
      res.status(200).json(response(1, 'ok', customers))
    } catch (error: any) {
      res.status(400).json(response(0, error.message, error));
    }
  }

  /**
   * @function Get customer
   * @param req
   * @param res
   */
  public async get(req: Request, res: Response) {
    try {
      const query = {
        where: {
          username: req.params.username
        },
        raw: true
      }

      const customer: any = await Customer.findOne(query)

      if (!customer)
        res.status(404).json(response(0, "Customer Not Found", {}))

      res.status(200).json(response(1, 'ok', customer))
    } catch (error: any) {
      res.status(400).json(response(0, error.message, error));
    }
  }

  async generateAccountNumber(): Promise<any> {
    let min = Math.ceil(2111111111);
    let max = Math.floor(2999999999);
    let accountNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    const query = {
      where: {
        account_number: accountNumber,
      },
      raw: true,
    }
    const existingAccount: any = await Account.findOne(query)

    if (existingAccount) return await this.generateAccountNumber()
    return accountNumber
  }
}

