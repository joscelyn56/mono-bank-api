/**
 * @description Defines connection parameters for database
 */

require("dotenv").config();

const connections = {
	development: {
		username: process.env.DB_USER_DEV,
		password: process.env.DB_PASSWORD_DEV,
		database: process.env.DB_NAME_DEV,
		host: process.env.DB_HOST_DEV,
		dialect: 'mysql',
		options: {
			pool: {
				max: 5,
				min: 0,
				idle: 5000,
				evict: 5000,
			},
			logging: process.env.NODE_ENV === 'test' ? false : console.log,
			timezeone: 'Africa/Lagos',
		}
	},
	
	production: {
		username: process.env.DB_USER_PROD,
		password: process.env.DB_PASSWORD_PROD,
		database: process.env.DB_NAME_PROD,
		host: process.env.DB_HOST_PROD,
		dialect: 'mysql',
		options: {
			pool: {
				max: 5,
				min: 0,
				idle: 5000,
				evict: 5000,
			},
			logging: process.env.NODE_ENV === 'test' ? false : console.log,
			timezeone: 'Africa/Lagos',
		}
	}
}

module.exports = connections
