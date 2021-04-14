"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Customer extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            first_name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            last_name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            active: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: true
            },
        }, {
            sequelize: sequelize,
            timestamps: true,
            modelName: 'Customer',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            tableName: 'customers',
            paranoid: true,
            underscored: true,
        });
    }
}
exports.default = Customer;
