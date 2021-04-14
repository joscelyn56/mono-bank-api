import { DataTypes, Model, Sequelize, } from 'sequelize'

class Account extends Model {
  public customer_id!: number
  public account_number!: string
  public balance!: number
  public active!: boolean

  // Auto-generated
  public id!: number
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at!: Date;

  public static initialize(sequelize: Sequelize) {
    this.init({
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      account_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      active: {
        type: DataTypes.BOOLEAN,
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
    })
  }
}

export default Account
