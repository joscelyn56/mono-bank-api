import { Model, Sequelize } from 'sequelize';
declare class User extends Model {
    name: string;
    email: string;
    password: string;
    active: boolean;
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    static initialize(sequelize: Sequelize): void;
}
export default User;
