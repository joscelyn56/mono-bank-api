/**
 * @description User request validator schema
 */
declare const createCreateAccountSchema: {
    customer_id: {
        in: string[];
        isNumeric: boolean;
        matches: RegExp;
        errorMessage: string;
    };
    deposit: {
        in: string[];
        isNumeric: boolean;
        matches: RegExp;
        errorMessage: string;
    };
};
declare const createDepositSchema: {
    account_id: {
        in: string[];
        isNumeric: boolean;
        matches: RegExp;
        errorMessage: string;
    };
    deposit: {
        in: string[];
        isNumeric: boolean;
        matches: RegExp;
        errorMessage: string;
    };
};
declare const createTransferSchema: {
    sender_account_id: {
        in: string[];
        isNumeric: boolean;
        matches: RegExp;
        errorMessage: string;
    };
    receiver_account_id: {
        in: string[];
        isNumeric: boolean;
        matches: RegExp;
        errorMessage: string;
    };
    amount: {
        in: string[];
        isNumeric: boolean;
        matches: RegExp;
        errorMessage: string;
    };
};
export { createCreateAccountSchema, createDepositSchema, createTransferSchema };
