'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('transactions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			initiator: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "users",
					key: "id"
				}
			},
			type: {
				type: Sequelize.ENUM("DEBIT", "CREDIT", "DEPOSIT")
			},
			sender_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: "accounts",
					key: "id"
				}
			},
			receiver_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "accounts",
					key: "id"
				}
			},
			amount: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			balance: {
				type: Sequelize.INTEGER,
				allowNull: false,
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
		await queryInterface.dropTable('transactions');
	}
};
