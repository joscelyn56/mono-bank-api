import { DataTypes, Model, Sequelize, } from 'sequelize'

class Transaction extends Model {
  public initiator!: number
  public type!: string
  public sender_id!: number
  public receiver_id!: number
  public amount!: number
  public balance!: number

  // Auto-generated
  public id!: number
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at!: Date;

  public static initialize(sequelize: Sequelize) {
    this.init({
      initiator: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("DEBIT", "CREDIT", "DEPOSIT")
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      balance: {
        type: DataTypes.INTEGER,
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
    })
  }
}

export default Transaction
