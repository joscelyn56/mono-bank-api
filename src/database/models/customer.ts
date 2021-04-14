import { DataTypes, Model, Sequelize, } from 'sequelize'

class Customer extends Model {
  public first_name!: string
  public last_name!: string
  public username!: string
  public active!: boolean

  // Auto-generated
  public id!: number
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at!: Date;

  public static initialize(sequelize: Sequelize) {
    this.init({
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
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
    })
  }
}

export default Customer
