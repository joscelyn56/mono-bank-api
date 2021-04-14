import { BuildOptions, Model } from "sequelize";
export interface UsersAttribute {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    active?: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}
export interface UsersModel extends Model<UsersAttribute>, UsersAttribute {
}
export declare class Users extends Model<UsersModel, UsersAttribute> {
}
export declare type UsersStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UsersModel;
};
