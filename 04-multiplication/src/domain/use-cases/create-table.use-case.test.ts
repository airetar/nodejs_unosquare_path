import { CreateTable } from './create-table.use-case';

describe('CreateTableUseCase', () => {
    test('Should create table with default values', () => {
        const createTable = new CreateTable();
        const base = 5;
        const table = createTable.execute({base});

        expect( createTable ).toBeInstanceOf( CreateTable );
        expect(table).toContain(`${base} x 1 = ${base}`);
        expect(table).toContain(`${base} x 10 = 50`);
    })
    
    test('Should create table with custom values', () => {
        const createTable = new CreateTable();
        const base = 5;
        const limit = 20;
        const table = createTable.execute({base, limit});

        expect( createTable ).toBeInstanceOf( CreateTable );
        expect(table).toContain(`${base} x 1 = ${base}`);
        expect(table).toContain(`${base} x ${limit} = ${base*limit}`);
    })
})