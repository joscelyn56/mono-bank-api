"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            active: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: true
            },
        }, {
            sequelize: sequelize,
            timestamps: true,
            modelName: 'User',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            tableName: 'users',
            paranoid: true,
            underscored: true,
        });
    }
}
exports.default = User;
