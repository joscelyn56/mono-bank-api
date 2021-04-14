/**
 * @description User request validator schema
 */
declare const createTransferSchema: {
    customer_id: {
        in: string[];
        isNumeric: boolean;
        matches: RegExp;
        errorMessage: string;
    };
    receiver_account_number: {
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
export { createTransferSchema };
