'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('accounts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			customer_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "customers",
					key: "id"
				}
			},
			account_number: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			balance: {
				type: Sequelize.INTEGER,
				defaultValue: 0
			},
			active: {
				type: Sequelize.BOOLEAN,
				defaultValue: true
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deleted_at: {
				allowNull: true,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('accounts');
	}
};
