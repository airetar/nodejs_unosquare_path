import yargs from 'yargs';

const runCommand = async ( args: string[] ) => {
    try {
        process.argv = [...process.argv, ...args];
        const { yarg } = await import('./yargs.plugin');
    
        return yarg;
    } catch(err) {
        throw err;
    }
}

describe('Test Args plugin', () => {
    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('Should return default values', async () => {
        const argv = await runCommand(['-b', '5']);
        expect(argv).toEqual( expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs/tables'
        }))
    });

    test('Should return custom values', async () => {
        const argv = await runCommand(['-b', '8', '-l', '15', '-s', '-n', 'custom-name-table', '-d', 'custom-output-path']);
        expect(argv).toEqual( expect.objectContaining({
            b: 8,
            l: 15,
            s: true,
            n: 'custom-name-table',
            d: 'custom-output-path'
        }))
    });

    test('Should return an error when base is less than 1', async () => {
        try {
            await runCommand(['-b', 'a', '-l', '15', '-s', '-n', 'custom-name-table', '-d', 'custom-output-path']);
        } catch (error) {
            expect(error).toBe('Error: base must be a number');
        }
    });

    test('Should return an error when base is less than 1', async () => {
        try {
            await runCommand(['-b', '0', '-l', '15', '-s', '-n', 'custom-name-table', '-d', 'custom-output-path']);
        } catch (error) {
            expect(error).toBe('Error: Base must be a greater than 0');
        }
    });
    
    test('Should return an error when limit isNaN', async () => {
        try {
            await runCommand(['-b', '5', '-l', 'a', '-s', '-n', 'custom-name-table', '-d', 'custom-output-path']);
        } catch (error) {
            expect(error).toBe('Error: Limit must be a number');
        }
        
    });
})