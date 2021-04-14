import { DataTypes, Model, Sequelize, } from 'sequelize'

class User extends Model {
  public name!: string
  public email!: string
  public password!: string
  public active!: boolean

  // Auto-generated
  public id!: number
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at!: Date;

  public static initialize(sequelize: Sequelize) {
    this.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
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
    })
  }
}

export default User
