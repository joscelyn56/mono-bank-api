/**
 * @description User request validator schema
 */

const createCreateAccountSchema = {
  customer_id: {
    in: ['body'],
    isNumeric: true,
    matches: /^\d+$/,
    errorMessage: 'Not a valid customer id'
  },

  deposit: {
    in: ['body'],
    isNumeric: true,
    matches: /^\d+$/,
    errorMessage: 'Not a valid amount'
  },
}

const createDepositSchema = {
  account_id: {
    in: ['body'],
    isNumeric: true,
    matches: /^\d+$/,
    errorMessage: 'Not a valid account id'
  },

  deposit: {
    in: ['body'],
    isNumeric: true,
    matches: /^\d+$/,
    errorMessage: 'Not a valid amount'
  },
}

const createTransferSchema = {
  sender_account_id: {
    in: ['body'],
    isNumeric: true,
    matches: /^\d+$/,
    errorMessage: 'Not a valid account id'
  },

  receiver_account_id: {
    in: ['body'],
    isNumeric: true,
    //matches: /^\d{10}$/,
    matches: /^\d+$/,
    errorMessage: 'Not a valid account id'
  },

  amount: {
    in: ['body'],
    isNumeric: true,
    matches: /^\d+$/,
    errorMessage: 'Not a valid amount'
  },

}

export { createCreateAccountSchema, createDepositSchema, createTransferSchema }
