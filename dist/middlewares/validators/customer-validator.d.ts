/**
 * @description Customer request validator schema
 */
declare const createCustomerSchema: {
    first_name: {
        in: string[];
        isString: boolean;
        matches: RegExp;
        errorMessage: string;
    };
    last_name: {
        in: string[];
        isString: boolean;
        matches: RegExp;
        errorMessage: string;
    };
    username: {
        in: string[];
        isString: boolean;
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
export { createCustomerSchema };
