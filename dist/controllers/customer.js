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
exports.CustomerController = void 0;
/**
 * Module Dependencies
 */
const transform_response_1 = require("../utils/transform-response");
const models_1 = require("../database/models");
class CustomerController {
    /**
     * @description Creates a new customer
     */
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let details = Object.assign({}, req.body);
                const query = {
                    where: {
                        username: details.username,
                    },
                    raw: true,
                };
                const existingCustomer = yield models_1.Customer.findOne(query);
                if (existingCustomer)
                    throw new Error('Customer already exists');
                const newCustomer = yield models_1.Customer.create(details);
                if (!newCustomer)
                    throw new Error('Could not create new customer');
                const customer = newCustomer.get({ plain: true });
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
                console.log(error);
                res.status(400).json(transform_response_1.transformResponse(0, error.message, error));
            }
        });
    }
    /**
     * @function Get all customers
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
                const customers = yield models_1.Customer.findAll(query);
                res.status(200).json(transform_response_1.transformResponse(1, 'ok', customers));
            }
            catch (error) {
                res.status(400).json(transform_response_1.transformResponse(0, error.message, error));
            }
        });
    }
    /**
     * @function Get customer
     * @param req
     * @param res
     */
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    where: {
                        username: req.params.username
                    },
                    raw: true
                };
                const customer = yield models_1.Customer.findOne(query);
                if (!customer)
                    res.status(404).json(transform_response_1.transformResponse(0, "Customer Not Found", {}));
                res.status(200).json(transform_response_1.transformResponse(1, 'ok', customer));
            }
            catch (error) {
                res.status(400).json(transform_response_1.transformResponse(0, error.message, error));
            }
        });
    }
}
exports.CustomerController = CustomerController;
