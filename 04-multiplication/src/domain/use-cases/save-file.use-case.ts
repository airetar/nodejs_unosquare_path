import fs from 'fs';

export interface SaveFileUseCase {
    execute: ( options: Options ) => boolean;
}

export interface Options {
    fileContent     : string;
    destinationPath?: string;
    fileName?       : string;
}

export class SaveFile implements SaveFileUseCase {

    constructor() {}

    execute({ fileContent, destinationPath = 'outputs', fileName = 'table' }: Options): boolean {
        try {
            fs.mkdirSync(destinationPath, { recursive: true });
            fs.writeFileSync(`${destinationPath}/${fileName}.txt`, fileContent);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
        
    }
    
}