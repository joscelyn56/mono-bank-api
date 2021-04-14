"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Account extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            customer_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            account_number: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            balance: {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: 0
            },
            active: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: true
            },
        }, {
            sequelize: sequelize,
            timestamps: true,
            modelName: 'Account',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            tableName: 'accounts',
            paranoid: true,
            underscored: true,
        });
    }
}
exports.default = Account;
