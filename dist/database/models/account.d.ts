import { Model, Sequelize } from 'sequelize';
declare class Account extends Model {
    customer_id: number;
    account_number: string;
    balance: number;
    active: boolean;
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    static initialize(sequelize: Sequelize): void;
}
export default Account;
