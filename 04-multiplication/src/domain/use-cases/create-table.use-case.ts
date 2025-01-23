export interface CreateTableUseCase {
    execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase {

    constructor(
        /**
         * DI: Dependencies injection
         */
    ) { }

    execute({ base, limit = 10}: CreateTableOptions): string {
        let outputString = `\n
        ================================
                ${base} times table       
        ================================
        \n`;
        let count = 1;
        while (count <= limit) {
            outputString += `${base} x ${count} = ${base * count}\n`;
            count++;
        }

        return outputString;
    }
}

