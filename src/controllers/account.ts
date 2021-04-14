/**
 * Module Dependencies
 */
import { transformResponse as response } from '../utils/transform-response'
import { Request, Response } from 'express'

import { Account, Transaction } from "../database/models";

export class AccountController {
  /**
   * @function Transfer from one account to another
   * @param req
   * @param res
   */
  public async transfer(req: Request, res: Response) {
    try {
      const sender: any = await Account.findOne({
        where: {
          customer_id: req.body.customer_id
        },
        raw: true
      })

      if (!sender) {
        throw new Error("Sender account Not Found")
      }

      const receiver: any = await Account.findOne({
        where: {
          account_number: req.body.receiver_account_number
        },
        raw: true
      })

      if (!receiver) {
        throw new Error("Receiver account Not Found")
      }

      let amount = parseFloat(req.body.amount)

      if (parseFloat(sender.balance) < amount) {
        throw new Error("Account balance insufficient")
      }

      let senderBalance = sender.balance - amount
      let receiverBalance = receiver.balance + amount

      await Account.update({
        balance: senderBalance
      }, {
        where: {
          id: sender.id
        }
      })

      await Account.update({
        balance: receiverBalance
      }, {
        where: {
          id: receiver.id
        }
      })

      await Transaction.create({
        initiator: req.session.user.id,
        type: 'DEBIT',
        sender_id: sender.id,
        receiver_id: receiver.id,
        amount: amount,
        balance: senderBalance
      });

      await Transaction.create({
        initiator: req.session.user.id,
        type: 'CREDIT',
        sender_id: sender.id,
        receiver_id: receiver.id,
        amount: amount,
        balance: receiverBalance
      });

      res.status(200).json(response(1, 'ok', {message: "Transfer Successful"}))
    } catch (error: any) {
      await res.status(400).json(response(0, error.message, error));
    }
  }

  /**
   * @function Get all accounts
   * @param req
   * @param res
   */
  public async getAll(req: Request, res: Response) {
    try {
      const query = {
        where: {},
        raw: true
      }

      if (req.query.account_number) {
        // @ts-ignore
        query.where.account_number = req.query.account_number
      }
      const customers: any = await Account.findAll(query)
      res.status(200).json(response(1, 'ok', customers))
    } catch (error: any) {
      await res.status(400).json(response(0, error.message, error));
    }
  }

  /**
   * @function Get account details
   * @param req
   * @param res
   */
  public async get(req: Request, res: Response) {
    try {
      const query = {
        where: {
          id: req.params.id
        },
        raw: true
      }

      const account: any = await Account.findOne(query)

      if (!account)
        throw new Error('Account Not Found')

      res.status(200).json(response(1, 'ok', account))
    } catch (error: any) {
      await res.status(400).json(response(0, error.message, error));
    }
  }

  /**
   * @function Get account history
   * @param req
   * @param res
   */
  public async getHistory(req: Request, res: Response) {
    try {
      const query = {
        where: {
          $or: [
            {
              $and: [{
                receiver_id: req.params.id
              }, {
                type: "CREDIT"
              }]
            },
            {
              $and: [{
                receiver_id: req.params.id
              }, {
                type: "DEPOSIT"
              }]
            },
            {
              $and: [{
                sender_id: req.params.id
              }, {
                type: "DEBIT"
              }]
            }
          ]
        },
        raw: true
      }
      const history: any = await Transaction.findAll(query)
      res.status(200).json(response(1, 'ok', history))
    } catch (error: any) {
      await res.status(400).json(response(0, error.message, error));
    }
  }
}

