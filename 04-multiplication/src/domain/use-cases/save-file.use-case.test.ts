import { SaveFile } from './save-file.use-case';
import fs from 'fs';

describe('SaveFileUseCase', () => {

    const customOptions = {
        fileContent: 'Custom content file test',
        destinationPath: 'output-files',
        fileName: 'custom-table-name'
    };

    const customfilePath = `${customOptions.destinationPath}/${customOptions.fileName}.txt`;

    afterEach(() => {
        const outputsExist = fs.existsSync('outputs');
        if (outputsExist) { fs.rmSync('outputs', { recursive: true }); }
        
        const customOutputsExist = fs.existsSync(customfilePath);
        if (customOutputsExist) { fs.rmSync(customOptions.destinationPath, { recursive: true }); }
    });


    test('Should save file with default values', () => {
        const saveFile = new SaveFile();
        const options = {
            fileContent: 'Content test.'
        }

        const result = saveFile.execute(options);
        expect(result).toBeTruthy();

        const checkFile = fs.existsSync('outputs/table.txt');
        const fileContent = fs.readFileSync('outputs/table.txt', { encoding: 'utf-8' });

        expect(checkFile).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });

    test('Should save file with custom values', () => {
        const saveFile = new SaveFile();

        const result = saveFile.execute(customOptions);
        expect(result).toBeTruthy();

        
        const checkFile = fs.existsSync(customfilePath);
        const fileContent = fs.readFileSync(customfilePath, { encoding: 'utf-8' });
        expect(checkFile).toBe(true);
        expect(fileContent).toContain(customOptions.fileContent);

    });

    test('Should return an err if directory could not be created', () => {
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error from testing') }
        );
        const result = saveFile.execute(customOptions);

        expect(result).toBe(false);

        mkdirSpy.mockRestore();
    });

    test('Should return an err if content cant be writed', () => {
        const saveFile = new SaveFile();
        const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom error from testing') }
        );
        const result = saveFile.execute(customOptions);

        expect(result).toBe(false);

        writeFileSyncMock.mockRestore();
    });
})