import { Model, Sequelize } from 'sequelize';
declare class Transaction extends Model {
    initiator: number;
    type: string;
    sender_id: number;
    receiver_id: number;
    amount: number;
    balance: number;
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    static initialize(sequelize: Sequelize): void;
}
export default Transaction;
