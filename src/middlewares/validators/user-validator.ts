/**
 * @description User request validator schema
 */

const createUserSchema = {
  name: {
    in: ['body'],
    isString: true,
    matches: /[a-zA-Z\-\s]/,
    errorMessage: 'Not a valid name'
  },

  email: {
    in: ['body'],
    isEmail: true,
    errorMessage: 'Not a valid email'
  },

  password: {
    in: ['body'],
    isString: true,
    matches: /[a-zA-Z\-\s]/,
    errorMessage: 'Not a valid password'
  },

}

const loginSchema = {
  password: {
    in: ['body'],
    isString: true,
    matches: /[a-zA-Z\-\s]/,
    errorMessage: 'Not a valid password'
  },

  email: {
    in: ['body'],
    isEmail: true,
    errorMessage: 'Not a valid email'
  },

}

export { createUserSchema, loginSchema }
