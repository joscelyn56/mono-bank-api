"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Transaction extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            initiator: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            type: {
                type: sequelize_1.DataTypes.ENUM("DEBIT", "CREDIT", "DEPOSIT")
            },
            sender_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            receiver_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            amount: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            balance: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize: sequelize,
            timestamps: true,
            modelName: 'Transaction',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            tableName: 'transactions',
            paranoid: true,
            underscored: true,
        });
    }
}
exports.default = Transaction;
