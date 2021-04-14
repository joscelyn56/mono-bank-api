import { Options, Sequelize, Op } from 'sequelize'
import * as dotenv from 'dotenv'
import User from './user'
import Customer from './customer'
import Account from './account'
import Transaction from './transactions'

dotenv.config();

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};

// Open database connection
const sequelize = new Sequelize(
  // @ts-ignore
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  <Options>{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: operatorsAliases,
    options: {
      pool: {
        max: 5,
        min: 0,
        idle: 5000,
        evict: 5000,
      },
      logging: process.env.NODE_ENV === 'development' ? false : console.log,
      timezeone: 'Africa/Lagos',
    }
  })

// Initialize each model in the database
// This must be done before associations are made
let models = [User, Customer, Account, Transaction]
models.forEach(model => model.initialize(sequelize))

// Create database tables
// force: true causes database to reset with each run
sequelize.sync({force: false})

export {
  sequelize as Database,
  User,
  Customer,
  Account,
  Transaction
}
