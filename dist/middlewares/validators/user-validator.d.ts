/**
 * @description User request validator schema
 */
declare const createUserSchema: {
    name: {
        in: string[];
        isString: boolean;
        matches: RegExp;
        errorMessage: string;
    };
    email: {
        in: string[];
        isEmail: boolean;
        errorMessage: string;
    };
    password: {
        in: string[];
        isString: boolean;
        matches: RegExp;
        errorMessage: string;
    };
};
declare const loginSchema: {
    password: {
        in: string[];
        isString: boolean;
        matches: RegExp;
        errorMessage: string;
    };
    email: {
        in: string[];
        isEmail: boolean;
        errorMessage: string;
    };
};
export { createUserSchema, loginSchema };
