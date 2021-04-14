/**
 * @description Defines connection parameters for database
 */

require("dotenv").config();

const connections = {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: 'mysql',
		options: {
			pool: {
				max: 5,
				min: 0,
				idle: 5000,
				evict: 5000,
			},
			logging: true,
			timezeone: 'Africa/Lagos',
		}
	},
	
	production: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: 'mysql',
		options: {
			pool: {
				max: 5,
				min: 0,
				idle: 5000,
				evict: 5000,
			},
			logging: false,
			timezeone: 'Africa/Lagos',
		}
	}
}

module.exports = connections
