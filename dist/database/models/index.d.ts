import { Sequelize } from 'sequelize';
import User from './user';
import Customer from './customer';
import Account from './account';
import Transaction from './transactions';
declare const sequelize: Sequelize;
export { sequelize as Database, User, Customer, Account, Transaction };
