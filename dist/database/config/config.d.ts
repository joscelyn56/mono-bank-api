export namespace development {
    const username: string | undefined;
    const password: string | undefined;
    const database: string | undefined;
    const host: string | undefined;
    const dialect: string;
    namespace options {
        namespace pool {
            const max: number;
            const min: number;
            const idle: number;
            const evict: number;
        }
        const logging: boolean;
        const timezeone: string;
    }
}
export namespace production {
    const username_1: string | undefined;
    export { username_1 as username };
    const password_1: string | undefined;
    export { password_1 as password };
    const database_1: string | undefined;
    export { database_1 as database };
    const host_1: string | undefined;
    export { host_1 as host };
    const dialect_1: string;
    export { dialect_1 as dialect };
    export namespace options_1 {
        export namespace pool_1 {
            const max_1: number;
            export { max_1 as max };
            const min_1: number;
            export { min_1 as min };
            const idle_1: number;
            export { idle_1 as idle };
            const evict_1: number;
            export { evict_1 as evict };
        }
        export { pool_1 as pool };
        const logging_1: boolean;
        export { logging_1 as logging };
        const timezeone_1: string;
        export { timezeone_1 as timezeone };
    }
    export { options_1 as options };
}
