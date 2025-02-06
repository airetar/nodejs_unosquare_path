import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';
describe('Server App', () => {

    const options = {
        base: 5,
        limit: 10,
        showTable: true,
        fileName: 'name serverapp test',
        destinationPath: 'outputs-serverapp-test'
    };

    test('Should create server instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');        
    });

    test('Should run server app with options', () => {
        /*
        const logSpy = jest.spyOn(console, 'log');
        const tableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveSpy = jest.spyOn(SaveFile.prototype, 'execute');

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith('Server running...');
        expect(logSpy).toHaveBeenCalledWith('Table created successfully');

        expect(tableSpy).toHaveBeenCalledTimes(1);
        expect(tableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit });

        expect(saveSpy).toHaveBeenCalledTimes(1);
        expect(saveSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            destinationPath: options.destinationPath,
            fileName: options.fileName
        });
        */
    });

    test('Should run with custom values mocked', () => {
        const logMock = jest.fn();
        const createMock = jest.fn().mockReturnValue(`${options.base} x 2 = ${options.base * 2}`);
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);
        
        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: `${options.base} x 2 = ${options.base * 2}`,
            destinationPath: options.destinationPath,
            fileName: options.fileName
        });

        expect(logMock).toHaveBeenCalledWith('Table created successfully');
    })
});