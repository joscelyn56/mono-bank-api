import { Model, Sequelize } from 'sequelize';
declare class Customer extends Model {
    first_name: string;
    last_name: string;
    username: string;
    active: boolean;
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    static initialize(sequelize: Sequelize): void;
}
export default Customer;
