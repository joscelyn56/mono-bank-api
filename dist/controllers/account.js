"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
/**
 * Module Dependencies
 */
const transform_response_1 = require("../utils/transform-response");
const models_1 = require("../database/models");
class AccountController {
    /**
     * @function Create an account for a customer
     * @param req
     * @param res
     */
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let details = Object.assign({}, req.body);
                const query = {
                    where: {
                        id: details.customer_id,
                    },
                    raw: true,
                };
                const customer = yield models_1.Customer.findOne(query);
                if (!customer)
                    throw new Error('Customer does not exist');
                let min = Math.ceil(2111111111);
                let max = Math.floor(2999999999);
                let accountNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                const account = yield models_1.Account.create({
                    customer_id: customer.id,
                    account_number: accountNumber,
                    balance: details.deposit
                });
                yield models_1.Transaction.create({
                    initiator: req.session.user.id,
                    type: 'DEPOSIT',
                    receiver_id: account.id,
                    amount: details.deposit,
                    balance: details.deposit
                });
                const accountDetails = account.get({ plain: true });
                customer['account'] = accountDetails;
                res.status(200).json(transform_response_1.transformResponse(1, 'ok', customer));
            }
            catch (error) {
                yield res.status(400).json(transform_response_1.transformResponse(0, error.message, error));
            }
        });
    }
    /**
     * @function Deposit money into another
     * @param req
     * @param res
     */
    deposit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield models_1.Account.findOne({
                    where: {
                        id: req.body.account_id
                    },
                    raw: true
                });
                if (!account) {
                    throw new Error("Account Not Found");
                }
                let amount = parseFloat(req.body.deposit);
                let balance = account.balance + amount;
                yield models_1.Account.update({
                    balance: balance
                }, {
                    where: {
                        id: account.id
                    }
                });
                yield models_1.Transaction.create({
                    initiator: req.session.user.id,
                    type: 'DEPOSIT',
                    receiver_id: account.id,
                    amount: amount,
                    balance: amount
                });
                res.status(200).json(transform_response_1.transformResponse(1, 'ok', { message: "Deposit Successful" }));
            }
            catch (error) {
                yield res.status(400).json(transform_response_1.transformResponse(0, error.message, error));
            }
        });
    }
    /**
     * @function Transfer from one account to another
     * @param req
     * @param res
     */
    transfer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sender = yield models_1.Account.findOne({
                    where: {
                        id: req.body.sender_account_id
                    },
                    raw: true
                });
                if (!sender) {
                    throw new Error("Sender account Not Found");
                }
                const receiver = yield models_1.Account.findOne({
                    where: {
                        id: req.body.receiver_account_id
                    },
                    raw: true
                });
                if (!receiver) {
                    throw new Error("Receiver account Not Found");
                }
                let amount = parseFloat(req.body.amount);
                if (parseFloat(sender.balance) < amount) {
                    throw new Error("Account balance insufficient");
                }
                let senderBalance = sender.balance - amount;
                let receiverBalance = receiver.balance + amount;
                yield models_1.Account.update({
                    balance: senderBalance
                }, {
                    where: {
                        id: sender.id
                    }
                });
                yield models_1.Account.update({
                    balance: receiverBalance
                }, {
                    where: {
                        id: receiver.id
                    }
                });
                yield models_1.Transaction.create({
                    initiator: req.session.user.id,
                    type: 'DEBIT',
                    sender_id: sender.id,
                    receiver_id: receiver.id,
                    amount: amount,
                    balance: senderBalance
                });
                yield models_1.Transaction.create({
                    initiator: req.session.user.id,
                    type: 'CREDIT',
                    sender_id: sender.id,
                    receiver_id: receiver.id,
                    amount: amount,
                    balance: receiverBalance
                });
                res.status(200).json(transform_response_1.transformResponse(1, 'ok', { message: "Transfer Successful" }));
            }
            catch (error) {
                yield res.status(400).json(transform_response_1.transformResponse(0, error.message, error));
            }
        });
    }
    /**
     * @function Get all accounts
     * @param req
     * @param res
     */
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    where: {},
                    raw: true
                };
                if (req.query.customer_id) {
                    // @ts-ignore
                    query.where.customer_id = req.query.customer_id;
                }
                if (req.query.account_number) {
                    // @ts-ignore
                    query.where.account_number = req.query.account_number;
                }
                const customers = yield models_1.Account.findAll(query);
                res.status(200).json(transform_response_1.transformResponse(1, 'ok', customers));
            }
            catch (error) {
                yield res.status(400).json(transform_response_1.transformResponse(0, error.message, error));
            }
        });
    }
    /**
     * @function Get account details
     * @param req
     * @param res
     */
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    where: {
                        id: req.params.id
                    },
                    raw: true
                };
                const account = yield models_1.Account.findOne(query);
                if (!account)
                    throw new Error('Account Not Found');
                res.status(200).json(transform_response_1.transformResponse(1, 'ok', account));
            }
            catch (error) {
                yield res.status(400).json(transform_response_1.transformResponse(0, error.message, error));
            }
        });
    }
    /**
     * @function Get account history
     * @param req
     * @param res
     */
    getHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                };
                const history = yield models_1.Transaction.findAll(query);
                res.status(200).json(transform_response_1.transformResponse(1, 'ok', history));
            }
            catch (error) {
                yield res.status(400).json(transform_response_1.transformResponse(0, error.message, error));
            }
        });
    }
}
exports.AccountController = AccountController;
